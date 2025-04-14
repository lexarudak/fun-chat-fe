import { HTMLBuilder } from '../../utils/html-builder';
import { WSTypes } from '../../ws/constants';
import { Payload } from '../../ws/payloads';
import { User } from '../../ws/types';
import { ws } from '../../ws/ws';
import { MessageComponent } from '../message/message';
import './chat-field.styles.css';

export class ChatField {
  builder: HTMLBuilder;
  container: HTMLDivElement;
  currentUser: User;
  messages: MessageComponent[] = [];

  constructor(currentUser: User) {
    this.currentUser = currentUser;
    this.builder = new HTMLBuilder();
    this.container = this.builder.getDiv('field');

    ws.addListener(WSTypes.MSG_SEND, this.handleSendMessage);
    ws.addListener(WSTypes.MSG_FROM_USER, this.handleHistory);
    ws.addListener(WSTypes.MSG_READ, this.handleReadMessage);
  }

  setUser = (user: User) => {
    this.currentUser = user;
  };

  handleReadMessage = ({ message }: Payload.ReadedMessage) => {
    this.messages.find((msg) => msg.id === message.id)?.setRead();
  };

  handleHistory = ({ messages }: Payload.History) => {
    this.messages = messages.map(
      (message) => new MessageComponent(message, this.currentUser),
    );

    this.container.replaceChildren(
      ...this.messages.map((message) => message.render()),
    );

    this.messages.forEach((message) => {
      const { to, status } = message;
      if (to !== this.currentUser.login && !status.isReaded) {
        message.read();
      }
    });

    this.container.scrollTop = this.container.scrollHeight;
  };

  handleSendMessage = ({ message }: Payload.Message) => {
    if (
      message.to !== this.currentUser.login &&
      message.from !== this.currentUser.login
    ) {
      return;
    }

    const messageComponent = new MessageComponent(message, this.currentUser);
    this.messages.push(messageComponent);
    this.container.append(messageComponent.render());

    if (message.to !== this.currentUser.login) {
      messageComponent.read();
    }

    this.container.scrollTop = this.container.scrollHeight;
  };

  render = () => {
    ws.getHistory(this.currentUser.login);

    return this.container;
  };
}
