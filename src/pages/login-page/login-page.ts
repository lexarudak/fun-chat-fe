import { InputComponent } from '../../components/input/input';
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
  nameInput;
  passInput;

  pathname = PagePath.Login;

  constructor(router: Router) {
    this.router = router;
    this.builder = new HTMLBuilder();

    this.nameInput = new InputComponent(
      DEFAULT_IMPORT_VALUE,
      messages.name,
      messages.namePlaceholder,
      nameValidator,
      this.checkValidation,
    );

    this.passInput = new InputComponent(
      DEFAULT_IMPORT_VALUE,
      messages.password,
      messages.passwordPlaceholder,
      passValidator,
      this.checkValidation,
    );

    this.submitButton = this.builder.getBtn(messages.submit, this.submit, {
      isDisabled: true,
      classname: 'submit-btn',
    });
  }

  checkValidation = () => {
    this.submitButton.disabled = !(
      this.passInput.isValid && this.nameInput.isValid
    );
  };

  submit = () => this.router.goTo(PagePath.Home);

  navigateToAbout = () => this.router.goTo(PagePath.About);

  render() {
    const page = this.builder.getForm('small-page');

    const title = this.builder.getTitle(messages.title);
    const modalBtn = this.builder.getBtn(messages.info, this.navigateToAbout);
    const nameInput = this.nameInput.render();
    const passInput = this.passInput.render();

    page.append(title, nameInput, passInput, this.submitButton, modalBtn);

    return page;
  }
}
