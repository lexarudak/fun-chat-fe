import { HTMLBuilder } from '../../utils/html-builder';
import { WebSocketTypes } from '../../ws/constants';
import { Payload } from '../../ws/payloads';
import { User } from '../../ws/types';
import { ws } from '../../ws/ws';
import { UserCard } from '../user-card/user-card';
import { messages } from './messages';
import './user-list.styles.css';

const DEFAULT_VALUE = '';

export class UserList {
  builder;
  value = DEFAULT_VALUE;
  input;
  users: UserCard[] = [];
  usersContainer;
  currentUser: string | null = null;

  constructor() {
    this.builder = new HTMLBuilder();
    this.input = this.builder.getInput(
      this.value,
      messages.placeholder,
      this.onInput,
    );

    this.usersContainer = this.builder.getDiv('container');

    ws.addListener(WebSocketTypes.USER_ACTIVE, this.handleUserActive);
    ws.addListener(WebSocketTypes.USER_INACTIVE, this.handleUserInactive);
    ws.addListener(WebSocketTypes.USER_LOGIN, this.handleLogin);
  }

  handleLogin = (data: Payload.SuccessLogin) => {
    this.currentUser = data.user.login;
  };

  handleUserActive = (data: Payload.UserList) => {
    const filteredUsers = data.users
      .filter((user) => user.login !== this.currentUser)
      .map((user) => new UserCard(user));

    const inactiveUser = this.users.filter(
      ({ user: { isLogined } }) => !isLogined,
    );
    this.users = [...filteredUsers, ...inactiveUser];

    this.fillContainer();
  };

  handleUserInactive = (data: Payload.UserList) => {
    const users = data.users.map((user) => new UserCard(user));
    const activeUser = this.users.filter(
      ({ user: { isLogined } }) => isLogined,
    );

    this.users = [...activeUser, ...users];
    this.fillContainer();
  };

  onInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target.value;
    }
  };

  fillContainer = () => {
    const cards = this.users.map((user) => user.render());

    this.usersContainer.replaceChildren(...cards);
  };

  render() {
    ws.getAllActiveUsers();
    ws.getAllInactiveUsers();

    const userList = this.builder.getDiv('user-list');
    userList.append(this.input, this.usersContainer);
    return userList;
  }
}
