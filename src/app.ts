import { Router } from './router/router';

export class App {
  router;
  constructor() {
    this.router = new Router();
  }

  init = () => {
    this.router.init();
    console.log('Hello, Fun Chat!');
  };
}
