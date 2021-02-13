import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Meta from 'vue-meta';
import Home from '../views/Home.vue';

Vue.use(VueRouter);
Vue.use(Meta);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/survey/:p?',
    name: 'Survey',
    component: () => import(/* webpackChunkName: "survey" */ '../views/Survey.vue'),
  },
  {
    path: '/character',
    name: 'Character',
    component: () => import(/* webpackChunkName: "character" */ '../views/Character.vue'),
  },
  {
    // Catch-all for 404 handler
    path: '*',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
