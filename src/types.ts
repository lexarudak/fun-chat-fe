export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
};

export type Validator = (value: string) => ValidationResult;
