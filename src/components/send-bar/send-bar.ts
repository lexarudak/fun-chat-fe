import { HTMLBuilder } from '../../utils/html-builder';
import './send-bar.styles.css';

const DEFAULT_MESSAGE = '';
const PLACEHOLDER = 'Type a message';

export class SendBar {
  input: HTMLInputElement;
  sendBtn: HTMLButtonElement;
  builder: HTMLBuilder;

  constructor() {
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

  onInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(!event.target.value);
      this.sendBtn.disabled = !event.target.value;
    }
  };

  onSend = () => {};

  render = () => {
    const sendBar = this.builder.getDiv('bar');
    sendBar.append(this.input, this.sendBtn);
    return sendBar;
  };
}
