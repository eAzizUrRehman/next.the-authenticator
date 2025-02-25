import { z } from 'zod';

export const customerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .max(50, 'Email must be less than 50 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be less than 15 characters'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(50, 'Country must be less than 50 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City must be less than 50 characters'),
  zip: z
    .string()
    .min(1, 'ZIP is required')
    .max(10, 'ZIP must be less than 10 characters'),
  profilePicture: z.any(),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;

// .refine(
//   (files) => {
//     return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type)
//   },
//   "Only .jpg, .jpeg, .png and .webp formats are supported."
// )
// .refine((files) => {
//   return files?.[0]?.size <= MAX_FILE_SIZE;
// }, `Max image size is 5MB.`)
