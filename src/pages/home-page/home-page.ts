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

  constructor(router: Router) {
    this.router = router;
    this.builder = new HTMLBuilder();

    this.header = new Header(this.router);
  }

  render() {
    const page = this.builder.getDiv('large-page');
    const header = this.header.render();

    page.append(header);
    return page;
  }
}
