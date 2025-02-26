'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { customerFields } from '@/fields/customer.field';
import { useState } from 'react';
import { customerSchema, TCustomerSchema } from '@/schemas/customer.schema';
import { useRouter } from 'next/navigation';
import { renewAccessToken } from '@/lib/jwt.utils';
import Image from 'next/image';
import axios from 'axios';

export default function AddNewCustomerPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [profileUrl, setProfileUrl] = useState<string>('/images/profile.jpg');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<TCustomerSchema>({
    resolver: zodResolver(customerSchema),
  });

  const checkIfThisStepIsValid = async () => {
    const fields = customerFields[currentStep].fields.map((field) => field.id);

    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    setCurrentStep(currentStep + 1);
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    try {
      setIsImageUploading(true);
      const data = new FormData();
      data.set('file', file as Blob);

      const response = await axios.post('/api/customer/profile', data);

      setProfileUrl(response.data.data.url);

      if (response.status !== 201) {
        toast.error(
          'There was a problem uploading the file. Please try again.'
        );
      }
    } catch (e) {
      console.error(e);
      toast.error('There was a problem uploading the file. Please try again.');
    } finally {
      setIsImageUploading(false);
    }
  };

  const onSubmit = async (data: TCustomerSchema) => {
    if (isSubmitting) return;

    if (profileUrl === '/images/profile.jpg') data.profilePicture = '';
    else data.profilePicture = profileUrl;

    try {
      const response = await axios.post('/api/customer/add', data);

      if (response.status === 201) {
        toast.success(
          response?.data?.message || 'Customer added successfully.'
        );
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error adding customer:', error);

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await renewAccessToken();
        onSubmit(data);
        return;
      }
      toast.error('There was a problem adding the customer. Please try again.');
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[500px] space-y-5 rounded-xl xs:border xs:p-5 md:p-10"
      >
        {customerFields.map((item, index) => (
          <div
            className={currentStep === index ? 'block' : 'hidden'}
            key={item.id}
          >
            <h2 className="text-center text-2xl font-semibold">{item.title}</h2>
            <div className=" ">
              {item.fields.map((field) => (
                <div key={field.id} className="relative mt-5 space-y-1">
                  <Label htmlFor={field.id}>{field.label}</Label>

                  {field.id !== 'profilePicture' ? (
                    <Input
                      {...register(field.id)}
                      {...field.props}
                      type={field.type}
                      id={field.id}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Input
                      {...register('profilePicture')}
                      {...field.props}
                      type="file"
                      id={field.id}
                      onChange={handleProfilePictureChange}
                    />
                  )}
                  {errors[field.id] && (
                    <p className="text-xs text-red-500">
                      {errors[field.id]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {currentStep === customerFields.length - 1 && (
          <div className="relative mx-auto mt-5 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 p-0.5">
            {!isImageUploading ? (
              <Image
                src={profileUrl}
                alt="profile picture"
                layout="fill"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex items-center justify-center bg-black">
                <Image
                  src="/gif/picture-loading.gif"
                  alt="loading"
                  width={120}
                  height={120}
                />
              </div>
            )}
          </div>
        )}

        {currentStep === customerFields.length - 1 && (
          <p
            className={`mt-5 text-center text-sm text-[#ffa500] ${isImageUploading && 'animate-bounce'}`}
          >
            {isImageUploading
              ? 'Uploading... Please wait for the preview.'
              : !profileUrl.includes('res.cloudinary.com')
                ? 'Profile picture is optional. You can submit without one.'
                : 'Uploaded! Preview and submit.'}
          </p>
        )}
        <div className="mx-auto mt-5 flex gap-x-5">
          {currentStep > 0 && (
            <Button
              type="button"
              className="grow"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep < customerFields.length - 1 && (
            <Button
              type="button"
              className="grow"
              onClick={checkIfThisStepIsValid}
            >
              Next
            </Button>
          )}
          {currentStep === customerFields.length - 1 && (
            <Button
              type="submit"
              className="grow"
              disabled={isSubmitting || isImageUploading}
            >
              {isSubmitting && (
                <Image
                  src="/gif/loading.gif"
                  alt="loading"
                  width={20}
                  height={20}
                  className="bg-transparent"
                />
              )}
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
