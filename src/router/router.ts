import { SS_KEY } from '../constants';
import { AboutPage } from '../pages/about-page/about-page';
import { HomePage } from '../pages/home-page/home-page';
import { LoginPage } from '../pages/login-page/login-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { WebSocketTypes } from '../ws/constants';
import { Payload } from '../ws/payloads';
import { User } from '../ws/types';
import { ws } from '../ws/ws';
import { PagePath } from './constants';

export class Router {
  pages;
  user;

  constructor() {
    const savedUser = sessionStorage.getItem(SS_KEY.user);
    this.user = savedUser ? JSON.parse(savedUser) : null;

    this.pages = [
      new HomePage(this),
      new LoginPage(this),
      new AboutPage(this),
      new NotFoundPage(this),
    ];

    ws.addListener(WebSocketTypes.USER_LOGIN, this.handleLogin);
  }

  handleLogin = (data: Payload.SuccessLogin) => {
    this.user = data.user;

    if (this.user?.isLogined && window.location.pathname === PagePath.Login) {
      this.goTo(PagePath.Home);
    }
  };

  init = () => {
    if (this.user) {
      ws.login(this.user);
    }

    const { pathname } = window.location;
    this.goTo(pathname);

    window.addEventListener('popstate', () => {
      const { pathname } = window.location;
      this.goTo(pathname);
    });
  };

  handleRedirects = (path: PagePath | string) => {
    if (path === PagePath.Login && this.user?.isLogined) {
      this.goTo(PagePath.Home);
    }
  };

  goTo = (path: PagePath | string) => {
    this.handleRedirects(path);
    const page =
      this.pages.find((page) => path === page.pathname) ||
      this.pages[this.pages.length - 1];
    window.history.pushState({}, '', page.pathname);

    const pageElement = page.render();
    document.body.replaceChildren(pageElement);
  };
}
