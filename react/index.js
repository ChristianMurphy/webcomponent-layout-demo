import {
  createElement,
  Component
} from '/node_modules/preact/dist/preact.esm.js';
import registerCustomElement from '/node_modules/preact-custom-element/src/index.js';

export class ReactWeather extends Component {
  static get is() {
    return 'react-weather';
  }

  render() {
    return createElement('p', null, 'Preact content');
  }
}

registerCustomElement(ReactWeather, ReactWeather.is);
