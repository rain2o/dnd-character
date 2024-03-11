import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Meta from 'vue-meta';
import Home from '../views/Home.vue';
import Survey from '../views/Survey.vue';
import Character from '../views/Character.vue';
import NotFound from '../views/NotFound.vue';

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
    component: Survey,
  },
  {
    path: '/character',
    name: 'Character',
    component: Character,
  },
  {
    // Catch-all for 404 handler
    path: '*',
    component: NotFound,
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
