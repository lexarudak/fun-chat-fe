import { AboutPage } from '../pages/about-page/about-page';
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
      new AboutPage(this),
      new NotFoundPage(this),
    ];
  }

  init = () => {
    const { pathname } = window.location;

    this.goTo(pathname);

    window.addEventListener('popstate', () => {
      const { pathname } = window.location;
      this.goTo(pathname);
    });
  };

  goTo = (path: PagePath | string) => {
    const page =
      this.pages.find((page) => path === page.pathname) ||
      this.pages[this.pages.length - 1];
    window.history.pushState({}, '', page.pathname);

    const pageElement = page.render();
    document.body.replaceChildren(pageElement);
  };
}
