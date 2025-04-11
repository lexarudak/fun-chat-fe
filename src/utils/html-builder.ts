type ButtonOptions = {
  classname?: string;
  isDisabled?: boolean;
};

export class HTMLBuilder {
  getDiv = (classname: string) => {
    const div = document.createElement('div');
    div.classList.add(classname);
    return div;
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

    if (options?.classname) {
      button.classList.add(options.classname);
    }

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

    if (classname) {
      p.classList.add(classname);
    }

    p.innerText = text;
    return p;
  };

  getInput = (
    value: string,
    placeholder: string,
    onChange: (e: Event) => void,
  ) => {
    const input = document.createElement('input');
    input.classList.add('input');
    input.type = 'text';
    input.value = value;
    input.placeholder = placeholder;

    input.addEventListener('input', (e) => {
      onChange(e);
    });

    return input;
  };
}
