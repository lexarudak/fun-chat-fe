import { HTMLBuilder } from '../../utils/html-builder';
import { Payload } from '../../ws/payloads';
import { MessageData, User } from '../../ws/types';
import { messages } from './messages';
import './message.styles.css';
import { ws } from '../../ws/ws';

export class MessageComponent {
  text: string;
  statusMessage: string;
  builder: HTMLBuilder;
  time: Date;
  targetUser: User;
  to;
  id;
  status;
  messageStatusHtml;

  constructor(
    { text, datetime, status, to, id }: MessageData,
    targetUser: User,
  ) {
    this.status = status;
    this.id = id;
    this.to = to;
    this.targetUser = targetUser;
    this.text = text;
    this.statusMessage = this.getStatusMessage(status);
    this.time = new Date(datetime);
    this.builder = new HTMLBuilder();

    this.messageStatusHtml = this.builder.getSpan(
      this.statusMessage,
      'message-status',
    );
  }

  read = () => {
    ws.readMessage(this.id);
  };

  setRead = () => {
    this.statusMessage = messages.read;
    this.messageStatusHtml.innerText = this.statusMessage;
    this.status.isReaded = true;
  };

  getStatusMessage = ({
    isDelivered,
    isEdited,
    isReaded,
  }: Payload.Message['message']['status']) => {
    switch (true) {
      case isEdited:
        return messages.editing;
      case isReaded:
        return messages.read;
      case isDelivered:
        return messages.delivered;

      default:
        return messages.notDelivered;
    }
  };

  render = () => {
    const container = this.builder.getDiv('message-container');
    const info = this.builder.getDiv('info');
    const message = this.builder.getP(this.text);

    const messageTime = this.builder.getSpan(
      this.time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );

    info.append(messageTime);

    const isOutgoing = this.to === this.targetUser.login;
    container.classList.add(isOutgoing ? 'outgoing' : 'incoming');
    if (isOutgoing) {
      info.append(this.messageStatusHtml);
    }

    container.append(message, info);
    return container;
  };
}
