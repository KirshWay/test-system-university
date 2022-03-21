import {createWebHistory, createRouter} from 'vue-router';
import AuthPage from './pages/AuthPage.vue';
import RegistrationPage from './pages/RegistrationPage.vue';
import AuthorizedLayout from './layout/AuthorizedLayout.vue';
import MainPage from './pages/MainPage.vue';
import TestConstructor from './pages/TestConstructorPage.vue';
import StatisticPage from './pages/StatisticPage.vue';
import CodePage from './pages/CodePage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const routes = [
  {
    path: '/code-access',
    name: 'Code-Access',
    component: CodePage,
  },
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
        name: 'Main',
        component: MainPage,
      },
      {
        path: '/test-constructor/:id',
        name: 'test-constructor',
        component: TestConstructor,
      },
      {
        path: '/tests/:id',
        name: 'Tests',
        component: TestConstructor,
      },
      {
        path: '/statistic/:id',
        name: 'Statistic',
        component: StatisticPage,
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
