import { HTMLBuilder } from '../../utils/html-builder';
import { User } from '../../ws/types';
import './user-card.styles.css';

const DEFAULT_NAME = 'User';

export class UserCard {
  user;
  builder;
  setCurrentUser;

  constructor(user: User, setCurrentUser: (user: User) => void) {
    this.setCurrentUser = setCurrentUser;
    this.user = user;
    this.builder = new HTMLBuilder();
  }

  setIsLogined = (isLogined: boolean) => {
    this.user.isLogined = isLogined;
  };

  onClick = () => {
    this.setCurrentUser(this.user);
  };

  render = () => {
    const name = this.user.login || DEFAULT_NAME;
    const card = this.builder.getBtn(name, this.onClick, {
      classname: `user-card${this.user.isLogined ? ' active' : ''}`,
    });

    return card;
  };
}
