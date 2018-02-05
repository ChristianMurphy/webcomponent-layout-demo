import {
  createElement,
  Component
} from '/webcomponent-layout-demo/node_modules/preact/dist/preact.esm.js';
import registerCustomElement from '/webcomponent-layout-demo/node_modules/preact-custom-element/src/index.js';

export class PreactWeather extends Component {
  static get is() {
    return 'preact-weather';
  }

  constructor() {
    super();
    this.state = {
      weather: [{}]
    };
  }

  async componentDidMount() {
    const response = await fetch(
      'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'
    );
    const { weather } = await response.json();
    this.setState({ weather });
  }

  render({}, { weather }) {
    return createElement(
      'section',
      null,
      createElement('style', null, 'h2 { color: var(--secondary-color); }'),
      createElement('h2', null, 'Preact London Weather'),
      createElement(
        'dl',
        null,
        createElement('dt', null, 'Conditions'),
        createElement('dd', null, weather[0].main),
        createElement('dt', null, 'Description'),
        createElement('dd', null, weather[0].description)
      )
    );
  }
}

registerCustomElement(PreactWeather, PreactWeather.is);
