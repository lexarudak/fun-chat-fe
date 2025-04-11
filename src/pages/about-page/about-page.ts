import { PagePath } from '../../router/constants';
import { Router } from '../../router/router';
import { HTMLBuilder } from '../../utils/html-builder';
import { messages } from './messages';

export class AboutPage {
  router;
  pathname = PagePath.About;
  builder: HTMLBuilder;

  constructor(router: Router) {
    this.router = router;
    this.builder = new HTMLBuilder();
  }

  navigateBack = () => window.history.back();

  render() {
    const page = this.builder.getDiv('small-page');
    const title = this.builder.getTitle(messages.title);
    const message = this.builder.getP(messages.text);

    const button = this.builder.getBtn(messages.button, this.navigateBack, {
      classname: 'back-btn',
    });

    page.append(title, message, button);
    return page;
  }
}
