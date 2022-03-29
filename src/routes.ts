import {createWebHistory, createRouter} from 'vue-router';
import AuthorizedLayout from './layout/Authorized.vue';
import AuthPage from './pages/Auth/Auth.vue';
import RegistrationPage from './pages/Registration/Registration.vue';
import MainPage from './pages/Main/Main.vue';
import TestPage from './pages/TestConstructor/Test.vue';
import TestConstructorPage from './pages/Test/TestConstructor.vue';
import UsersPage from './pages/Users/Users.vue';
import StatisticPage from './pages/Statistic/Statistic.vue';
import NotFoundPage from './pages/NotFound/NotFound.vue';

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
