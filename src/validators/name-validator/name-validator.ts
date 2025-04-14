import { Validator } from '../../types';

const MIN_NAME_LENGTH = 2;

export const nameValidator: Validator = (name: string) => {
  if (!name.trim()) {
    return { isValid: false, errorMessage: '' };
  }

  if (name.trim().length >= MIN_NAME_LENGTH) {
    return { isValid: true, errorMessage: '' };
  }
  return {
    isValid: false,
    errorMessage: `Name must be at least ${MIN_NAME_LENGTH} characters long`,
  };
};
