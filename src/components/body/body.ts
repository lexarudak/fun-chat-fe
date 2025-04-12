import { HTMLBuilder } from '../../utils/html-builder';
import { Chat } from '../chat/chat';
import { UserList } from '../user-list/user-list';
import './body.styles.css';

export class Body {
  builder;
  userList;
  chat;

  constructor() {
    this;
    this.builder = new HTMLBuilder();
    this.userList = new UserList();
    this.chat = new Chat();
  }

  render() {
    const body = this.builder.getDiv('chat-body');
    const userList = this.userList.render();
    const chat = this.chat.render();

    body.append(userList, chat);
    return body;
  }
}
