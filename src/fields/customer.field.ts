export type TFieldId =
  | 'name'
  | 'email'
  | 'phone'
  | 'country'
  | 'city'
  | 'zip'
  | 'profilePicture';

export interface TCustomerSingleField {
  id: TFieldId;
  type: string;
  placeholder: string;
  label: string;
  props?: Record<string, string | boolean>;
}

export interface TCustomerFields {
  id: number;
  title: string;
  fields: TCustomerSingleField[];
}

export const customerFields: TCustomerFields[] = [
  {
    id: 1,
    title: 'Personal Information',
    fields: [
      {
        id: 'name',
        type: 'name',
        placeholder: 'Waqar Younis',
        label: 'Name',
      },
      {
        id: 'email',
        type: 'email',
        placeholder: 'hello@waqaryounis.com',
        label: 'Email',
      },
      {
        id: 'phone',
        type: 'phone',
        placeholder: '123-456-7890',
        label: 'Phone',
      },
    ],
  },
  {
    id: 2,
    title: 'Address Details',
    fields: [
      {
        id: 'country',
        type: 'country',
        placeholder: 'Pakistan',
        label: 'Country',
      },
      {
        id: 'city',
        type: 'city',
        placeholder: 'Karachi',
        label: 'City',
      },
      {
        id: 'zip',
        type: 'zip',
        placeholder: '12345',
        label: 'ZIP',
      },
    ],
  },
  {
    id: 3,
    title: 'Upload Profile Picture',
    fields: [
      {
        id: 'profilePicture',
        type: 'file',
        placeholder: 'Upload Profile Picture',
        label: 'Profile Picture',
        props: {
          accept: 'image/*',
          multiple: false,
        },
      },
    ],
  },
];
