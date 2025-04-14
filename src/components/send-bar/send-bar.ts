import { HTMLBuilder } from '../../utils/html-builder';
import { User } from '../../ws/types';
import { ws } from '../../ws/ws';
import './send-bar.styles.css';

const DEFAULT_MESSAGE = '';
const PLACEHOLDER = 'Type a message';

export class SendBar {
  input: HTMLInputElement;
  sendBtn: HTMLButtonElement;
  builder: HTMLBuilder;
  currentUser: User;

  constructor(currentUser: User) {
    this.currentUser = currentUser;
    this.builder = new HTMLBuilder();
    this.input = this.builder.getInput(
      DEFAULT_MESSAGE,
      PLACEHOLDER,
      this.onInput,
    );
    this.sendBtn = this.builder.getBtn('Send', this.onSend, {
      isDisabled: true,
    });
  }

  setUser = (user: User) => {
    this.currentUser = user;
  };

  onInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(!event.target.value);
      this.sendBtn.disabled = !event.target.value;
    }
  };

  onSend = () => {
    ws.sendMessage({
      to: this.currentUser.login,
      text: this.input.value,
    });
    this.input.value = DEFAULT_MESSAGE;
    this.sendBtn.disabled = true;
  };

  render = () => {
    const sendBar = this.builder.getDiv('bar');
    sendBar.append(this.input, this.sendBtn);
    return sendBar;
  };
}
