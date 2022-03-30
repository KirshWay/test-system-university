import {createWebHistory, createRouter} from 'vue-router';
import AuthorizedLayout from './layout/Authorized.vue';
import AuthPage from './pages/Auth/AuthPage.vue';
import RegistrationPage from './pages/Registration/RegistrationPage.vue';
import MainPage from './pages/Main/MainPage.vue';
import TestPage from './pages/TestConstructor/TestPage.vue';
import TestConstructorPage from './pages/Test/TestConstructorPage.vue';
import UsersPage from './pages/Users/UsersPage.vue';
import SettingsPage from './pages/Settings/SettingsPage.vue';
import StatisticPage from './pages/Statistic/StatisticPage.vue';
import NotFoundPage from './pages/NotFound/NotFoundPage.vue';

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
        name: 'Main',
        component: MainPage,
      },
      {
        path: '/users',
        name: 'users',
        component: UsersPage,
      },
      {
        path: '/settings',
        name: 'settings',
        component: SettingsPage,
      },
      {
        path: '/test-constructor',
        name: 'test-constructor',
        component: TestConstructorPage,
      },
      {
        path: '/tests/:id',
        name: 'Tests',
        component: TestPage,
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
