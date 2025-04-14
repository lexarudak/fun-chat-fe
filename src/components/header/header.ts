import { messages } from './messages';
import { HTMLBuilder } from '../../utils/html-builder';
import { Router } from '../../router/router';
import { PagePath } from '../../router/constants';
import './header.style.css';
import { ws } from '../../ws/ws';
import { SS_KEY } from '../../constants';
import { Payload } from '../../ws/payloads';
import { WSTypes } from '../../ws/constants';

const DEFAULT_USERNAME = 'User';

export class Header {
  builder: HTMLBuilder;
  username = DEFAULT_USERNAME;
  router;

  constructor(router: Router) {
    this.builder = new HTMLBuilder();
    this.router = router;

    ws.addListener(WSTypes.USER_LOGIN, this.handleLogin);
  }
  handleLogin = (data: Payload.OneUser) => {
    this.username = data.user.login;
  };

  navigateToAbout = () => this.router.goTo(PagePath.About);

  logout = () => {
    const user = sessionStorage.getItem(SS_KEY.user);

    if (user) {
      const parsedUser = JSON.parse(user);
      ws.logout(parsedUser);
    }
  };

  render() {
    const header = this.builder.getHeader('header');
    const title = this.builder.getTitle(messages.title);
    const username = this.builder.getP(`Hello, ${this.username}`, 'username');

    const aboutButton = this.builder.getBtn(
      messages.about,
      this.navigateToAbout,
      { classname: 'about-btn' },
    );

    const logoutButton = this.builder.getBtn(messages.logout, this.logout);

    header.append(title, username, aboutButton, logoutButton);
    return header;
  }
}
