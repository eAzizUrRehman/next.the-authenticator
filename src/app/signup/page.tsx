'use client';

import EyeIconButton from '@/components/EyeIconComponent';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpSchema, TSignUpSchema } from '@/schemas/signup.schema';
import { signUpFields } from '@/fields/signup.field';
import Link from 'next/link';
import { CustomErrorResponse } from '../signin/page';
import Image from 'next/image';

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const getFieldType = (id: string, type: string) => {
    if (type !== 'password') return type;

    if (id === 'password') return isPasswordVisible ? 'text' : 'password';

    if (id === 'confirmPassword')
      return isConfirmPasswordVisible ? 'text' : 'password';
  };

  const onSubmit = async (data: TSignUpSchema) => {
    if (isSubmitting) return;

    try {
      const response = await axios.post('/api/user/signup', data);

      toast.error(response?.data?.message || 'User registered successfully.');

      reset();

      router.push('/signin');
    } catch (error) {
      console.error('Error during sign up:', error);

      const axiosError = error as AxiosError<CustomErrorResponse>;

      console.error('Error response:', axiosError);

      toast.error(
        axiosError?.response?.data?.message ||
          'There was a problem with your sign up. Please try again.'
      );
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] space-y-5 rounded-xl xs:border xs:p-5 md:p-10"
      >
        {signUpFields.map((field) => (
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
            {field.id === 'confirmPassword' && (
              <EyeIconButton
                isVisible={isConfirmPasswordVisible}
                toggleVisibility={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
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
            Sign Up
          </Button>
        </div>
        <p className="mx-auto w-fit text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="block text-center underline underline-offset-4 xs:inline"
          >
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
