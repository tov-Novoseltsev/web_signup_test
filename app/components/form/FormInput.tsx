import { ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface ValidationRule {
  test: (value: string) => boolean;
  message?: string;
  showAlways?: boolean;
}

interface ValidatedRule extends ValidationRule {
  isValid: boolean;
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  validationRules: ValidationRule[];
  suffix?: ReactNode,
}

const FormInput: React.FC<FormInputProps> = ({ name, validationRules, className, suffix, ...props }) => {
  const { control, formState: { isSubmitted }, watch } = useFormContext();

  const value = watch(name);

  const validatedRules = validationRules.map((rule) => ({ ...rule, isValid: rule.test(value) }));
  const fieldIsValid = validatedRules.every((rule) => rule.isValid);

  const { field } = useController({
    name,
    control,
    rules: {
      validate: () => fieldIsValid,
    },
  });
  
  const errorRule = isSubmitted ? validatedRules.find((rule) => !rule.showAlways && !rule.isValid) : null;
  const rules = validatedRules.filter((rule) => rule.showAlways === true && Boolean(rule.message));
  if (errorRule) {
    rules.unshift(errorRule);
  }

  return (
    <div>
      <div className={clsx(styles['form-input'], className, {
          [styles.success]: fieldIsValid,
          [styles.error]: isSubmitted && !fieldIsValid,
        })}>
        <input {...field} value={field.value ?? '' } {...props} />
        {suffix}
      </div>
      {!!rules.length && (
        <div className={styles['validation-message-container']}>
          {
            rules.map((rule) => <ValidationRuleText key={rule.message} isSubmitted={isSubmitted} rule={rule} />)
          }
        </div>
      )}
    </div>
  );
};

const ValidationRuleText: React.FC<{rule: ValidatedRule, isSubmitted: boolean}> = ({ isSubmitted, rule }) => (
  <p className={clsx(
    styles['validation-message'],
    {
      [styles.success]: Boolean(rule.isValid),
      [styles.error]: isSubmitted && !rule.isValid,
    })}>
    {rule.message}
  </p>
);

export default FormInput;
