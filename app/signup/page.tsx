'use client';

import styles from './styles.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from '@/app/components/form/FormInput';
import PasswordFormInput from '@/app/components/form/PasswordFormInput';

interface SignupData {
  email: string;
  password: string;
}

export default function AuthPage() {
  const methods = useForm<SignupData>();

  const onSubmit = (data: SignupData) => {
    console.log(data);
    alert('Sign up success!');
  };

  return (
    <main className={styles.main}>
      <h2 className={styles.heading}>Sign up</h2>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <div className={styles['form-fields']}>
            <FormInput name="email" placeholder="Email" type="email" validationRules={[
              {
                test: (value) => (value ?? '').trim() !== '',
                message: 'Required field',
              },
              {
                test: (value) => /^[^@]+@[^@]+\.[^@]+/.test(value),
                message: 'Invalid email',
              },
            ]} />
            <PasswordFormInput name="password" placeholder="Create your password" validationRules={[
              {
                test: (value: string = '') => value.length >= 8 && !value.includes(' '),
                message: '8 character or more (no spaces)',
                showAlways: true,
              },
              {
                test: (value: string = '') => value.length <= 64,
                message: 'Maximum length – 64 characters',
              },
              {
                test: (value: string = '') => /[A-Z]/.test(value) && /[a-z]/.test(value),
                message: 'Uppercase and lowercase letters',
                showAlways: true,
              },
              {
                test: (value: string = '') => /\d/.test(value),
                message: 'At least one digit',
                showAlways: true,
              },
            ]} />
          </div>
          <button className={styles.button} type="submit">
            Sign up
          </button>
        </form>
      </FormProvider>
    </main>
  );
};
