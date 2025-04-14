import { HTMLBuilder } from '../../utils/html-builder';
import { WSTypes } from '../../ws/constants';
import { Payload } from '../../ws/payloads';
import { User } from '../../ws/types';
import { ws } from '../../ws/ws';
import { UserCard } from '../user-card/user-card';
import { messages } from './messages';
import './user-list.styles.css';

const DEFAULT_QUERY = '';

export class UserList {
  builder;
  input;
  usersContainer;
  query = DEFAULT_QUERY;
  setCurrentUser;

  activeUserCards: UserCard[] = [];
  inactiveUserCards: UserCard[] = [];

  currentUser: string | null = null;

  constructor(setCurrentUser: (user: User) => void) {
    this.setCurrentUser = setCurrentUser;
    this.builder = new HTMLBuilder();
    this.input = this.builder.getInput(
      this.query,
      messages.placeholder,
      this.onInput,
    );

    this.usersContainer = this.builder.getDiv('container');

    ws.addListener(WSTypes.USER_ACTIVE, this.handleAllActiveUsers);
    ws.addListener(WSTypes.USER_INACTIVE, this.handleAllInActiveUsers);

    ws.addListener(WSTypes.USER_LOGIN, this.handleLogin);
    ws.addListener(WSTypes.USER_EXTERNAL_LOGIN, this.handleExternalLogin);
    ws.addListener(WSTypes.USER_EXTERNAL_LOGOUT, this.handleExternalLogout);
  }

  handleLogin = (data: Payload.OneUser) => {
    this.currentUser = data.user.login;
  };

  handleAllActiveUsers = ({ users }: Payload.UserList) => {
    this.activeUserCards = users
      .filter(({ login }) => login !== this.currentUser)
      .map((user) => new UserCard(user, this.setCurrentUser));
    this.fillContainer();
  };

  handleAllInActiveUsers = ({ users }: Payload.UserList) => {
    this.inactiveUserCards = users.map(
      (user) => new UserCard(user, this.setCurrentUser),
    );
    this.fillContainer();
  };

  handleExternalLogin = ({ user }: Payload.OneUser) => {
    this.activeUserCards.push(new UserCard(user, this.setCurrentUser));
    this.inactiveUserCards = this.inactiveUserCards.filter(
      ({ user: { login } }) => login !== user.login,
    );
    this.fillContainer();
  };

  handleExternalLogout = ({ user }: Payload.OneUser) => {
    this.inactiveUserCards = [
      new UserCard(user, this.setCurrentUser),
      ...this.inactiveUserCards,
    ];
    this.activeUserCards = this.activeUserCards.filter(
      ({ user: { login } }) => login !== user.login,
    );
    this.fillContainer();
  };

  onInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.query = event.target.value.trim().toLowerCase();

      this.fillContainer();
    }
  };

  cardFilter = ({ user: { login } }: UserCard) => {
    return login.toLowerCase().includes(this.query);
  };

  fillContainer = () => {
    const activeCards = this.activeUserCards
      .filter(this.cardFilter)
      .map((user) => user.render());

    const inactiveCards = this.inactiveUserCards
      .filter(this.cardFilter)
      .map((user) => user.render());

    this.usersContainer.replaceChildren(...activeCards, ...inactiveCards);
  };

  render() {
    ws.getAllActiveUsers();
    ws.getAllInactiveUsers();

    const userList = this.builder.getDiv('user-list');
    userList.append(this.input, this.usersContainer);
    return userList;
  }
}
