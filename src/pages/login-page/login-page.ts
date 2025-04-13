import { InputComponent } from '../../components/input/input';
import { SS_KEY } from '../../constants';
import { PagePath } from '../../router/constants';
import { Router } from '../../router/router';
import { HTMLBuilder } from '../../utils/html-builder';
import { SSController } from '../../utils/ss-controller';
import { nameValidator } from '../../validators/name-validator/name-validator';
import { passValidator } from '../../validators/pass-validator/pass-validator';
import { WebSocketTypes } from '../../ws/constants';
import { Payload } from '../../ws/payloads';
import { UserData } from '../../ws/types';
import { ws } from '../../ws/ws';

import './login-page.styles.css';
import { messages } from './messages';

const DEFAULT_IMPORT_VALUE = '';
const DEFAULT_ERROR_MESSAGE = '';
export class LoginPage {
  router;
  builder;
  submitButton;
  nameInput;
  passInput;
  errorContainer;
  ssController;

  pathname = PagePath.Login;

  constructor(router: Router) {
    this.ssController = new SSController();
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

    this.errorContainer = this.builder.getP(
      DEFAULT_ERROR_MESSAGE,
      'error-message',
    );

    this.submitButton = this.builder.getBtn(messages.submit, this.submit, {
      isDisabled: true,
      classname: 'submit-btn',
    });

    ws.addListener(WebSocketTypes.ERROR, this.handleError);
  }

  handleError = (data: Payload.Error) => {
    this.errorContainer.innerText = data.error;
  };

  checkValidation = () => {
    this.errorContainer.innerText = '';

    this.submitButton.disabled = !(
      this.passInput.isValid && this.nameInput.isValid
    );
  };

  saveUser = (userData: UserData) => (data: Payload.SuccessLogin) => {
    if (data.user.isLogined) {
      this.ssController.setUser(userData);
    }
  };

  submit = () => {
    const user = {
      login: this.nameInput.value,
      password: this.passInput.value,
    };

    ws.login(user);
    ws.addListener(WebSocketTypes.USER_LOGIN, this.saveUser(user));
    this.clearInputs();
  };

  clearInputs = () => {
    this.nameInput.inputField.value = DEFAULT_IMPORT_VALUE;
    this.passInput.inputField.value = DEFAULT_IMPORT_VALUE;
    this.nameInput.value = DEFAULT_IMPORT_VALUE;
    this.passInput.value = DEFAULT_IMPORT_VALUE;
    this.errorContainer.innerText = '';
  };

  navigateToAbout = () => this.router.goTo(PagePath.About);

  render() {
    const page = this.builder.getForm('small-page');

    const title = this.builder.getTitle(messages.title);
    const modalBtn = this.builder.getBtn(messages.info, this.navigateToAbout);
    const nameInput = this.nameInput.render();
    const passInput = this.passInput.render();

    page.append(
      title,
      nameInput,
      passInput,
      this.errorContainer,
      this.submitButton,
      modalBtn,
    );

    return page;
  }
}
