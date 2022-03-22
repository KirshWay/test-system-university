import {createWebHistory, createRouter} from 'vue-router';
import AuthorizedLayout from './layout/AuthorizedLayout.vue';
import AuthPage from './pages/AuthPage.vue';
import RegistrationPage from './pages/RegistrationPage.vue';
import MainPage from './pages/MainPage.vue';
import TestPage from './pages/TestPage.vue';
import TestConstructorPage from './pages/TestConstructorPage.vue';
import ConstructorUsersPage from './pages/ConstructorUsersPage.vue';
import StatisticPage from './pages/StatisticPage.vue';
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
        name: 'Main',
        component: MainPage,
      },
      {
        path: '/constructor-users',
        name: 'constructor-users',
        component: ConstructorUsersPage,
      },
      {
        path: '/test-constructor/:id',
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
