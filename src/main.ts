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
import App from './app.vue';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;

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
