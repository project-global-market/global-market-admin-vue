import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { getAccessToken } from '@/api/tokens';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Home',
        auth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login',
        auth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register',
        auth: false,
      },
    },
  ],
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Market Admin`;
  next();
});

router.beforeEach((to, from, next) => {
  const authToken = getAccessToken();

  if (to.matched.some((res) => res.meta.auth)) {
    if (authToken) {
      next();
      return;
    }
    next({ name: 'login' });
    return;
  }

  if (authToken) {
    next({ name: 'home' });
  }

  next();
});

export default router;
