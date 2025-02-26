'use client';

import EyeIconButton from '@/components/EyeIconComponent';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { signInSchema, TSignInSchema } from '@/schemas/signin.schema';
import { signInFields } from '@/fields/signin.field';
import Link from 'next/link';
import Image from 'next/image';

export interface CustomErrorResponse {
  message: string;
}

export default function SignInPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const getFieldType = (id: string, type: string) => {
    if (type !== 'password') return type;

    if (id === 'password') return isPasswordVisible ? 'text' : 'password';
  };

  const onSubmit = async (data: TSignInSchema) => {
    if (isSubmitting) return;

    try {
      const response = await axios.post('/api/user/signin', data);

      toast.success(
        (response?.data?.message as string) || 'User signed in successfully.'
      );

      router.push('/dashboard');
    } catch (error) {
      console.error('Error during sign in:', error);

      const axiosError = error as AxiosError<CustomErrorResponse>;

      console.error('Error response:', axiosError);

      toast.error(
        (axiosError?.response?.data?.message as string) ||
          'There was a problem with your sign in. Please try again.'
      );
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] space-y-5 rounded-xl xs:border xs:p-5 md:p-10"
      >
        {signInFields.map((field) => (
          <div key={field.id} className="relative space-y-1">
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              {...register(field.id)}
              type={getFieldType(field.id, field.type)}
              id={field.id}
              placeholder={field.placeholder}
            />
            {field.id === 'password' && (
              <EyeIconButton
                isVisible={isPasswordVisible}
                toggleVisibility={() =>
                  setIsPasswordVisible(!isPasswordVisible)
                }
              />
            )}
            {errors[field.id] && (
              <p className="text-xs text-red-500">
                {errors[field.id]?.message}
              </p>
            )}
          </div>
        ))}
        <div className="mx-auto w-fit">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Image
                src="/gif/loading.gif"
                alt="loading"
                width={20}
                height={20}
                className="bg-transparent"
              />
            )}
            Sign In
          </Button>
        </div>
        <p className="mx-auto w-fit text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="block text-center underline underline-offset-4 xs:inline"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
