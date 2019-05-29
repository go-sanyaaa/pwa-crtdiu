import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
        name: 'news',
        meta: {
          title: 'Новости',
          requiresAuth: false,
        },
        components: {
          default: () => import('../views/HomeNews'),
          toolbar: () => import('../components/Toolbars/HomeNewsToolbar')
        }
      },
      {
        path: '/events',
        name: 'events',
        meta: {
          title: 'События',
          requiresAuth: false,
        },
        components: {
          default: () => import('../views/HomeEvents'),
          toolbar: () => import('../components/Toolbars/HomeEventsToolbar')
        }
      },
      {
        path: '/events/:id',
        name: 'events-single',
        meta: {
          title: 'События',
          requiresAuth: false,
        },
        props: {default: (route) => {
          console.log(route);
          return {
            id: 'Sanya2'
          }
        }},
        components: {
          default: () => import('../views/HomeEvent'),
          toolbar: () => import('../components/Toolbars/HomeEventToolbar')
        }
      },
      {
        path: '/notify',
        name: 'notify',
        meta: {
          title: 'Уведомления',
          requiresAuth: true
        },
        components: {
          default: () => import('../views/HomeNotify'),
          toolbar: () => import('../components/Toolbars/HomeDefaultToolbar')
        }
      },
      {
        path: '/account',
        name: 'account',
        meta: {
          title: 'Аккаунт',
          requiresAuth: true
        },
        components: {
          default: () => import('../views/HomeAccount'),
          toolbar: () => import('../components/Toolbars/HomeDefaultToolbar')
        }
      }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
