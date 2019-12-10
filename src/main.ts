import Vue from 'vue';
// Import VueMaterial Components
import {
  MdApp,
  MdButton,
  MdCard,
  MdContent,
  MdDrawer,
  MdDivider,
  MdIcon,
  MdList,
  MdSubheader,
  MdTabs,
  MdToolbar
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import VueAnalytics from 'vue-analytics';
import App from './app.vue';
import './registerServiceWorker';
import router from './router';
import api from './api';

// Enable Google Analytics in production if the Tracking Id was provided
if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID,
    router
  });
}

Vue.config.productionTip = false;

// Inject API into the Vue Instance, so we can just use it easily
declare module 'vue/types/vue' {
  interface Vue {
    $api: typeof api;
  }
}
Vue.prototype.$api = api;

// Setup VueMaterial Components
Vue.use(MdApp);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdContent);
Vue.use(MdDrawer);
Vue.use(MdDivider);
Vue.use(MdIcon);
Vue.use(MdList);
Vue.use(MdSubheader);
Vue.use(MdTabs);
Vue.use(MdToolbar);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
