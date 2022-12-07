import { createRouter, createWebHashHistory } from 'vue-router'
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: () => import('../pages/connexion.vue'),
  },
  {
    path: '/all-transactions',
    name: 'AllTransaction',
    component: () => import('../pages/allTransaction.vue'),
    meta : {

      requiresAuth : true

    }
  },
  {
    path: '/mensualites-categories',
    name: 'mensualitesCategories',
    component: () => import('../pages/mensualitesCategories.vue'),
    meta : {

      requiresAuth : true

    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {

  if ( to.matched.some((record) => record.meta.requiresAuth ) ) {

    if ( getAuth().currentUser ) {

      next();

    } else {

      next('/');

    }

  } else {

    next();

  }

});

export default router;