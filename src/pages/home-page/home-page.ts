import { Body } from '../../components/body/body';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { PagePath } from '../../router/constants';
import { Router } from '../../router/router';
import { HTMLBuilder } from '../../utils/html-builder';
import './home-page.styles.css';

export class HomePage {
  router;
  pathname = PagePath.Home;
  builder: HTMLBuilder;
  header;
  footer;
  body;

  constructor(router: Router) {
    this.router = router;
    this.builder = new HTMLBuilder();

    this.header = new Header(this.router);
    this.body = new Body();
    this.footer = new Footer();
  }

  render() {
    const page = this.builder.getDiv('large-page');

    const header = this.header.render();
    const body = this.body.render();
    const footer = this.footer.render();

    page.append(header, body, footer);
    return page;
  }
}
