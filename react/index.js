import {
  createElement,
  Component
} from '/node_modules/preact/dist/preact.esm.js';
import registerCustomElement from '/node_modules/preact-custom-element/src/index.js';

export class ReactWeather extends Component {
  render() {
    return createElement(
      'ul',
      null,
      createElement('li', null, 'Preact content')
    );
  }
}

registerCustomElement(ReactWeather, 'react-weather');
