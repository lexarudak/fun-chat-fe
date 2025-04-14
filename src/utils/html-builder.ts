type ButtonOptions = {
  classname?: string;
  isDisabled?: boolean;
};

export class HTMLBuilder {
  getHeader = (classname: string) => {
    const header = document.createElement('header');
    header.classList.add(classname);
    return header;
  };

  getFooter = (classname: string) => {
    const footer = document.createElement('footer');
    footer.classList.add(classname);
    return footer;
  };

  getDiv = (classname: string) => {
    const div = document.createElement('div');
    div.classList.add(classname);
    return div;
  };

  getForm = (classname: string) => {
    const form = document.createElement('form');
    form.classList.add(classname);
    return form;
  };

  getTitle = (text: string, classname?: string) => {
    const title = document.createElement('h1');
    title.classList.add('title');

    if (classname) {
      title.classList.add(classname);
    }
    title.innerText = text;
    return title;
  };

  getBtn = (
    text: string,
    onClick: (e: Event) => void,
    options?: ButtonOptions,
  ) => {
    const button = document.createElement('button');
    button.classList.add('btn');

    this.addClasses(button, options?.classname);

    button.disabled = options?.isDisabled || false;
    button.innerText = text;

    button.addEventListener('click', (e) => {
      e.preventDefault();
      onClick(e);
    });

    return button;
  };

  getP = (text: string, classname?: string) => {
    const p = document.createElement('p');

    this.addClasses(p, classname);

    p.innerText = text;
    return p;
  };

  getA = (text: string, href: string, classname?: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';

    if (classname) {
      a.classList.add(classname);
    }

    a.innerText = text;
    return a;
  };

  getInput = (
    value: string,
    placeholder: string,
    onChange?: (e: Event) => void,
  ) => {
    const input = document.createElement('input');
    input.classList.add('input');
    input.type = 'text';
    input.value = value;
    input.placeholder = placeholder;

    input.addEventListener('input', (e) => {
      onChange?.(e);
    });

    return input;
  };

  addClasses = (target: HTMLElement, classes?: string) => {
    if (classes) {
      classes.split(' ').forEach((cls) => {
        target.classList.add(cls);
      });
    }
  };
}
