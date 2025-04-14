import { HTMLBuilder } from '../../utils/html-builder';
import { WSTypes } from '../../ws/constants';
import { Payload } from '../../ws/payloads';
import { User } from '../../ws/types';
import { ws } from '../../ws/ws';
import './target-user.styles.css';

enum UserStatus {
  default = '',
  online = 'Online',
  offline = 'Offline',
}

export class TargetUser {
  builder;
  name;
  status;
  user;

  constructor(user: User) {
    this.user = user;
    this.builder = new HTMLBuilder();

    this.name = this.builder.getP(this.user.login, 'target-user-name');
    this.status = this.builder.getP(
      this.getStatus(user),
      `target-user-status${user.isLogined ? ' active' : ''}`,
    );

    ws.addListener(WSTypes.USER_EXTERNAL_LOGIN, this.handleLogin);
    ws.addListener(WSTypes.USER_EXTERNAL_LOGOUT, this.handleLogout);
  }

  getStatus = (user: User) => {
    return user.isLogined ? UserStatus.online : UserStatus.offline;
  };

  handleLogin = ({ user }: Payload.OneUser) => {
    if (this.user.login === user.login) {
      this.status.innerText = UserStatus.online;
      this.status.classList.add('active');
    }
  };

  handleLogout = ({ user }: Payload.OneUser) => {
    if (this.user.login === user.login) {
      this.status.innerText = UserStatus.offline;
      this.status.classList.remove('active');
    }
  };

  render = () => {
    const targetUser = this.builder.getDiv('target-user');
    targetUser.append(this.name, this.status);
    return targetUser;
  };
}
