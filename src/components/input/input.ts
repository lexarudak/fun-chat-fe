import { ValidationResult, Validator } from '../../types';
import { HTMLBuilder } from '../../utils/html-builder';
import './input.styles.css';

const DEFAULT_ERROR_MESSAGE = '';

export class InputComponent {
  value: string;
  builder: HTMLBuilder;
  title: string;
  placeholder: string;
  inputField: HTMLInputElement;
  errorContainer: HTMLParagraphElement;
  validator: Validator;
  isValid = false;

  constructor(
    defaultValue: string,
    title: string,
    placeholder: string,
    validator: Validator,
  ) {
    this.value = defaultValue;
    this.title = title;
    this.placeholder = placeholder;
    this.validator = validator;

    this.builder = new HTMLBuilder();
    this.errorContainer = this.builder.getP(
      DEFAULT_ERROR_MESSAGE,
      'error-message',
    );
    this.inputField = this.builder.getInput(
      this.value,
      this.placeholder,
      this.onChange,
    );
  }

  onChange = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    this.value = e.target.value;
    const validationResult = this.validator(this.value);
    this.handleError(validationResult);
  };

  handleError = ({ errorMessage, isValid }: ValidationResult) => {
    this.errorContainer.innerText = errorMessage;
    this.isValid = isValid;
  };

  render = () => {
    const container = this.builder.getDiv('input-container');
    const message = this.builder.getP(this.title);

    container.append(message, this.inputField, this.errorContainer);
    return container;
  };
}
