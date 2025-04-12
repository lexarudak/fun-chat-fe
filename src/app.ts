import { messages } from './messages';
import { Router } from './router/router';
import { HTMLBuilder } from './utils/html-builder';

export class App {
  router;
  builder;
  loader;
  constructor() {
    this.builder = new HTMLBuilder();
    this.loader = this.builder.getP(messages.loading, 'loader');
    this.router = new Router();
  }

  showLoader = () => {
    document.body.replaceChildren(this.loader);
  };

  hideLoader = () => {
    document.body.replaceChildren();
  };

  init = () => {
    this.router.init();
  };
}
