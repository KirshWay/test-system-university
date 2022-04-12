import {createPinia} from 'pinia';
import {createApp} from 'vue';

import App from './App.vue';
import router from './routes';

const app = createApp(App);

app.use(router).use(createPinia()).mount('#app');
