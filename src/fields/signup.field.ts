export type TFieldId = 'name' | 'email' | 'password' | 'confirmPassword';

export interface TSignUpField {
  id: TFieldId;
  type: string;
  placeholder: string;
  label: string;
}

export const signUpFields: TSignUpField[] = [
  {
    id: 'name',
    type: 'text',
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
    id: 'password',
    type: 'password',
    placeholder: '**********',
    label: 'Password',
  },
  {
    id: 'confirmPassword',
    type: 'password',
    placeholder: '**********',
    label: 'Confirm Password',
  },
];
