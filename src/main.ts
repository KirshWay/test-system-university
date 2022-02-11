import {createApp} from 'vue';
import App from './App.vue';
import 'vfonts/Lato.css';
import router from './routes';
import {createPinia} from 'pinia';

const app = createApp(App);

app.use(router).use(createPinia()).mount('#app');
