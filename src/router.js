import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
//import Item from './views/Item.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      component: Home,
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Create.vue'),
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import(/* webpackChunkName: "about" */ './views/Item.vue'),
    },
  ],
});
