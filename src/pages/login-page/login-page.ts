import { PagePath } from '../../router/constants';
import { Router } from '../../router/router';

export class LoginPage {
  router;
  pathname = PagePath.Login;

  constructor(router: Router) {
    this.router = router;
  }

  render() {
    const page = document.createElement('div');
    page.innerHTML = this.pathname;
    return page;
  }
}
