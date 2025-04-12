import { messages } from './messages';
import { HTMLBuilder } from '../../utils/html-builder';

import './footer.styles.css';

const GIT_HUB_LINK = 'https://github.com/lexarudak?tab=repositories';

export class Footer {
  builder: HTMLBuilder;

  constructor() {
    this.builder = new HTMLBuilder();
    this;
  }

  render() {
    const footer = this.builder.getFooter('footer');
    const title = this.builder.getP(messages.title);
    const year = this.builder.getP(messages.year);
    const link = this.builder.getA(messages.name, GIT_HUB_LINK);

    footer.append(title, link, year);
    return footer;
  }
}
