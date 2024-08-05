import { useState } from 'react';
import FormInput, { FormInputProps } from './FormInput';
import HidePasswordIcon from '@/public/hide-password.svg';
import styles from './styles.module.css';

const PasswordFormInput: React.FC<Omit<FormInputProps, 'type' | 'suffix'>> = ({ ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormInput {...props}
      type={isVisible ? 'text' : 'password'}
      suffix={(
        <HidePasswordIcon
          width={24}
          height={24}
          className={styles['password-input']}
          alt={isVisible ? 'Hide password' : 'Show password'}
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
    />
  );
}

export default PasswordFormInput;
