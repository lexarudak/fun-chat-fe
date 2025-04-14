import { HTMLBuilder } from '../../utils/html-builder';
import { User } from '../../ws/types';
import { ChatField } from '../chat-field/chat-field';
import { SendBar } from '../send-bar/send-bar';
import { TargetUser } from '../target-user/target-user';
import './chat.styles.css';

export class Chat {
  builder: HTMLBuilder;
  sendBar;
  chatField;
  currentUser;
  targetUser;

  constructor(currentUser: User) {
    this.currentUser = currentUser;
    this.builder = new HTMLBuilder();
    this.sendBar = new SendBar(currentUser);
    this.chatField = new ChatField(currentUser);
    this.targetUser = new TargetUser(currentUser);
  }

  setUser = (user: User) => {
    this.currentUser = user;
    this.targetUser.setUser(user);
    this.chatField.setUser(user);
    this.sendBar.setUser(user);
  };

  render() {
    const chat = this.builder.getDiv('chat');
    chat.append(
      this.targetUser.render(),
      this.chatField.render(),
      this.sendBar.render(),
    );

    return chat;
  }
}
