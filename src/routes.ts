import {createWebHistory, createRouter} from 'vue-router';
import AuthPage from './pages/AuthPage.vue';
import RegistrationPage from './pages/RegistrationPage.vue';
import AuthorizedLayout from './layout/AuthorizedLayout.vue';
import MainPage from './pages/MainPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
  },
  {
    path: '/sign-up',
    name: 'Sign-up',
    component: RegistrationPage,
  },
  {
    path: '/',
    name: 'Authorized',
    component: AuthorizedLayout,
    children: [
      {
        path: '/',
        name: 'main',
        component: MainPage,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
