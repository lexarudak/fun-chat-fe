import { HomePage } from '../pages/home-page/home-page';
import { LoginPage } from '../pages/login-page/login-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { PagePath } from './constants';

export class Router {
  pages;
  constructor() {
    this.pages = [
      new HomePage(this),
      new LoginPage(this),
      new NotFoundPage(this),
    ];
  }

  init = () => {
    const { pathname } = window.location;

    this.goTo(pathname);
  };

  goTo = (path: PagePath | string) => {
    const page =
      this.pages.find((page) => path === page.pathname) || this.pages[2];
    window.history.pushState({}, '', page.pathname);

    const pageElement = page.render();
    document.body.replaceChildren(pageElement);
  };
}
