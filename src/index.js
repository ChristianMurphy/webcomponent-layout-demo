export class ComponentGrid extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const layout = await this.loadLayout();
    const [style] = await Promise.all([
      this.generateStyle(),
      this.loadComponents(layout)
    ]);

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(style);
    const template = this.generateTemplate(layout);
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  async loadLayout(layoutUrl = '/api/layout-v3.json') {
    const response = await fetch(layoutUrl);
    return response.json();
  }

  async generateStyle(styleUrl = '/api/grid.css') {
    const response = await fetch(styleUrl);
    const style = await response.text();
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    return styleTag;
  }

  generateTemplate({ components }) {
    const template = document.createElement('template');

    components.forEach(({ name, attributes }) => {
      const tag = document.createElement(name);
      Object.entries(attributes).forEach(([key, value]) => {
        tag.setAttribute(key, value);
      });
      template.content.appendChild(tag);
    });

    return template;
  }

  loadComponents({ components }) {
    return Promise.all(components.map(({ sourceUrl }) => import(sourceUrl)));
  }
}

customElements.define('component-grid', ComponentGrid);
