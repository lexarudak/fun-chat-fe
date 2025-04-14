import { AboutPage } from '../pages/about-page/about-page';
import { HomePage } from '../pages/home-page/home-page';
import { LoginPage } from '../pages/login-page/login-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { SSController } from '../utils/ss-controller';
import { WSTypes } from '../ws/constants';
import { Payload } from '../ws/payloads';
import { User, UserData } from '../ws/types';
import { ws } from '../ws/ws';
import { PagePath } from './constants';

export class Router {
  pages;
  ssController;
  isLogined = false;

  constructor() {
    this.ssController = new SSController();

    this.pages = [
      new HomePage(this),
      new LoginPage(this),
      new AboutPage(this),
      new NotFoundPage(this),
    ];

    ws.addListener(WSTypes.USER_LOGIN, this.handleLogin);
    ws.addListener(WSTypes.USER_LOGOUT, this.handleLogout);
  }

  handleLogin = (data: Payload.OneUser) => {
    if (data.user?.isLogined) {
      this.isLogined = true;

      if (window.location.pathname === PagePath.Login) {
        this.goTo(PagePath.Home);
      }
    }
  };

  handleLogout = (data: Payload.OneUser) => {
    if (!data.user?.isLogined) {
      this.ssController.removerUser();
      this.isLogined = false;
      this.goTo(PagePath.Login);
    }
  };

  init = () => {
    const savedUser = this.ssController.getUser();

    if (savedUser) {
      ws.login(savedUser);
    }

    const { pathname } = window.location;
    this.goTo(pathname);

    window.addEventListener('popstate', () => {
      const { pathname } = window.location;
      this.goTo(pathname);
    });
  };

  handleRedirects = (path: PagePath | string) => {
    if (path === PagePath.Login && this.isLogined) {
      this.goTo(PagePath.Home);
      return true;
    }

    if (path === PagePath.Home && !this.isLogined) {
      this.goTo(PagePath.Login);
      return true;
    }
  };

  goTo = (path: PagePath | string) => {
    const isRedirect = this.handleRedirects(path);
    if (isRedirect) {
      return;
    }

    const page =
      this.pages.find((page) => path === page.pathname) ||
      this.pages[this.pages.length - 1];
    window.history.pushState({}, '', page.pathname);

    const pageElement = page.render();
    document.body.replaceChildren(pageElement);
  };
}
