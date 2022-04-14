import {createRouter, createWebHistory} from 'vue-router';

import AuthorizedLayout from './layout/Authorized.vue';
import AuthPage from './pages/Auth/AuthPage.vue';
import ConstructorTestPage from './pages/ConstructorTest/ConstructorTestPage.vue';
import FeaturesPage from './pages/Features/FeaturesPage.vue';
import MainPage from './pages/Main/MainPage.vue';
import NotFoundPage from './pages/NotFound/NotFoundPage.vue';
import RegistrationPage from './pages/Registration/RegistrationPage.vue';
import SettingsPage from './pages/Settings/SettingsPage.vue';
import StatisticPage from './pages/Statistic/StatisticPage.vue';
import TestPage from './pages/Test/TestPage.vue';
import UsersPage from './pages/Users/UsersPage.vue';

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
        path: '/features',
        name: 'features',
        component: FeaturesPage,
      },
      {
        path: '/tests/:id',
        name: 'Tests',
        component: TestPage,
      },
      {
        path: '/constructor-test',
        name: 'ConstructorTest',
        component: ConstructorTestPage,
      },
      {
        path: '/constructor-test/:id',
        name: 'ConstructorTestOnce',
        component: ConstructorTestPage,
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
