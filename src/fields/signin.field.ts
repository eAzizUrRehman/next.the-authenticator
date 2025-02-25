export type TFieldId = 'email' | 'password';

export interface TSignInField {
  id: TFieldId;
  type: string;
  placeholder: string;
  label: string;
}

export const signInFields: TSignInField[] = [
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
];
