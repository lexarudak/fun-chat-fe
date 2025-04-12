import { HTMLBuilder } from '../../utils/html-builder';

export class Chat {
  builder: HTMLBuilder;

  constructor() {
    this.builder = new HTMLBuilder();
  }

  render() {
    const chat = this.builder.getDiv('chat');

    return chat;
  }
}
