import firebaseConfig  from './firebase.config.js';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import mitt from 'mitt'

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter

app
.use(router)
.use(store)
.use(firebaseConfig)
.mount('#root');

if (import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose(() => {
      app.unmount();
    });
  }
