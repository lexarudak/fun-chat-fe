import { Validator } from '../../types';

const MIN_PASSWORD_LENGTH = 8;

export const passValidator: Validator = (password: string) => {
  if (!password.trim()) {
    return { isValid: false, errorMessage: '' };
  }

  if (password.trim().length >= MIN_PASSWORD_LENGTH) {
    return { isValid: true, errorMessage: '' };
  }

  return {
    isValid: false,
    errorMessage: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  };
};
