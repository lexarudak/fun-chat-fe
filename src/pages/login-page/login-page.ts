import { InputComponent } from '../../components/input/input';
import { Modal } from '../../components/modal/modal';
import { PagePath } from '../../router/constants';
import { Router } from '../../router/router';
import { HTMLBuilder } from '../../utils/html-builder';
import { nameValidator } from '../../validators/name-validator/name-validator';
import { passValidator } from '../../validators/pass-validator/pass-validator';
import './login-page.styles.css';
import { messages } from './messages';

const DEFAULT_IMPORT_VALUE = '';
export class LoginPage {
  router;
  builder;
  submitButton;
  modal;
  nameInput;
  passInput;

  pathname = PagePath.Login;

  constructor(router: Router) {
    this.router = router;
    this.builder = new HTMLBuilder();
    this.modal = new Modal();

    this.nameInput = new InputComponent(
      DEFAULT_IMPORT_VALUE,
      messages.name,
      messages.namePlaceholder,
      this.nameValidator,
    );

    this.passInput = new InputComponent(
      DEFAULT_IMPORT_VALUE,
      messages.password,
      messages.passwordPlaceholder,
      this.passValidator,
    );

    this.submitButton = this.builder.getBtn(messages.submit, this.submit, {
      isDisabled: true,
      classname: 'submit-btn',
    });
  }

  nameValidator = (value: string) => {
    const validateResult = nameValidator(value);

    this.submitButton.disabled = !(
      validateResult.isValid && this.passInput.isValid
    );
    return validateResult;
  };

  passValidator = (value: string) => {
    const validateResult = passValidator(value);

    this.submitButton.disabled = !(
      validateResult.isValid && this.nameInput.isValid
    );
    return validateResult;
  };

  submit = () => {
    this.router.goTo(PagePath.Home);
  };

  render() {
    const page = this.builder.getDiv('login-page');

    const title = this.builder.getTitle(messages.title);
    const modalBtn = this.builder.getBtn(messages.info, this.modal.openModal);
    const nameInput = this.nameInput.render();
    const passInput = this.passInput.render();

    page.append(title, nameInput, passInput, this.submitButton, modalBtn);

    return page;
  }
}
