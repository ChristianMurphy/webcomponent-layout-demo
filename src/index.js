export class ComponentGrid extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const layout = await this.loadLayout();
    const template = this.generateTemplate(layout);
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.loadComponents(layout);
  }

  async loadLayout(layoutUrl = 'src/layout-v3.json') {
    const response = await fetch(layoutUrl);
    return response.json();
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
    components.forEach(async ({ sourceUrl }) => {
      try {
        await import(sourceUrl);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

customElements.define('component-grid', ComponentGrid);
