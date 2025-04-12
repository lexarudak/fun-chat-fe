import { HTMLBuilder } from '../../utils/html-builder';
import { messages } from './messages';
import './user-list.styles.css';

const DEFAULT_VALUE = '';

export class UserList {
  builder;
  value = DEFAULT_VALUE;
  input;
  users: string[] = [];
  usersContainer;

  constructor() {
    this.builder = new HTMLBuilder();
    this.input = this.builder.getInput(
      this.value,
      messages.placeholder,
      this.onInput,
    );
    this.usersContainer = this.builder.getDiv('container');
  }

  onInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target.value;
    }
  };

  render() {
    const userList = this.builder.getDiv('user-list');
    userList.append(this.input, this.usersContainer);
    return userList;
  }
}
