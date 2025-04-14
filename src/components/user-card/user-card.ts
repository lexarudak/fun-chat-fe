import { HTMLBuilder } from '../../utils/html-builder';
import { User } from '../../ws/types';
import './user-card.styles.css';

const DEFAULT_NAME = 'User';

export class UserCard {
  user;
  builder;

  constructor(user: User) {
    this.user = user;
    this.builder = new HTMLBuilder();
  }

  setIsLogined = (isLogined: boolean) => {
    this.user.isLogined = isLogined;
  };

  onClick = () => {
    console.log('User card clicked:', this.user);
  };

  render = () => {
    const name = this.user.login || DEFAULT_NAME;
    const card = this.builder.getBtn(name, this.onClick, {
      classname: `user-card${this.user.isLogined ? '__active' : ''}`,
    });

    return card;
  };
}
