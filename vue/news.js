import Vue from '/webcomponent-layout-demo/node_modules/vue/dist/vue.runtime.esm.js';
import vueCustomElement from '/webcomponent-layout-demo/node_modules/vue-custom-element/dist/vue-custom-element.esm.js';

Vue.use(vueCustomElement);

Vue.customElement(
  'vue-news',
  {
    data() {
      return {
        items: []
      };
    },

    async created() {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );
      const topStoryIds = await response.json();
      const topTenStoryIds = topStoryIds.slice(0, 10);

      this.items = await Promise.all(
        topTenStoryIds.map(async id => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return await response.json();
        })
      );
    },

    render(createElement) {
      return createElement('section', {}, [
        createElement('h2', {}, 'Vue HackerNews'),
        createElement(
          'ol',
          {},
          this.items.map(item =>
            createElement('li', {}, [
              createElement('a', { attrs: { href: item.url } }, item.title)
            ])
          )
        )
      ]);
    }
  },
  { shadow: true, shadowCss: 'h2 {color: var(--secondary-color);}' }
);
