import { HTMLBuilder } from '../../utils/html-builder';
import './chat-field.styles.css';

export class ChatField {
  builder: HTMLBuilder;
  container: HTMLDivElement;

  constructor() {
    this.builder = new HTMLBuilder();
    this.container = this.builder.getDiv('field');
  }

  render = () => {
    return this.container;
  };
}
