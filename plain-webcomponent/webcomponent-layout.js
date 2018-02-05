export class ComponentLayout extends HTMLElement {
  static get is() {
    return 'component-layout';
  }

  async connectedCallback() {
    const layout = await this.loadLayout();
    const style = await this.generateStyle();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(style);
    this.createComponentTags(layout).map(tag => shadowRoot.appendChild(tag));
    await this.loadComponents(layout);
  }

  async loadLayout(layoutUrl = '/api/layout-v3.json') {
    const response = await fetch(layoutUrl);
    return response.json();
  }

  async generateStyle(styleUrl = '/api/layout.css') {
    const response = await fetch(styleUrl);
    const style = await response.text();
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    return styleTag;
  }

  createComponentTags({ components }) {
    return components.map(({ name, attributes }) => {
      const component = document.createElement(name);
      Object.entries(attributes).forEach(([key, value]) => {
        component.setAttribute(key, value);
      });
      return component;
    });
  }

  loadComponents({ components }) {
    return Promise.all(components.map(({ sourceUrl }) => import(sourceUrl)));
  }
}

customElements.define(ComponentLayout.is, ComponentLayout);
