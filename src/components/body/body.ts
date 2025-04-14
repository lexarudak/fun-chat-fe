import { HTMLBuilder } from '../../utils/html-builder';
import { User } from '../../ws/types';
import { Chat } from '../chat/chat';
import { UserList } from '../user-list/user-list';
import './body.styles.css';
import { messages } from './messages';

export class Body {
  builder;
  userList;
  chat: Chat | null = null;
  chatComponent;

  constructor() {
    this.builder = new HTMLBuilder();
    this.userList = new UserList(this.setCurrentUser);
    this.chatComponent = this.builder.getP(messages.noUsers, 'no-users');
  }

  setCurrentUser = (user: User) => {
    if (!this.chat) {
      this.chat = new Chat(user);
    } else {
      this.chat.setUser(user);
    }

    const chatComponent = this.chat.render();
    this.chatComponent.replaceWith(chatComponent);
    this.chatComponent = chatComponent;
  };

  render() {
    const body = this.builder.getDiv('chat-body');
    const userList = this.userList.render();

    body.append(userList, this.chatComponent);
    return body;
  }
}
