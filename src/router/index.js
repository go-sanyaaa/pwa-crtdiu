import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import notify from '../views/Notify.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth',
      name: 'login',
      component: () => import('../views/Auth'),
      meta: {
        title: 'Авторизация',
        layout: 'PublicLayout',
        requiresAuth: false,
        authClosed: true
      }
    },
    {
      path: '/',
      component: () => import('../views/HomeGlobal'),
      children: [
        {
          path: '',
          name: 'home',
          meta: {
            title: 'Лента',
            layout: 'DefaultLayout',
            requiresAuth: true,
          },
          components: {
            default: () => import('@/views/Home'),
            toolbar: () => import('@/components/Toolbars/HomeToolbar'),
          }
        },
        {
          path: '/notify',
          name: 'notify',
          meta: {
            title: 'Уведомления',
            layout: 'DefaultLayout',
            requiresAuth: true,
          },
          component: notify
          // component: function () {
          //   return import('../views/Notify')
          // }
        },
        {
          path: '/events',
          name: 'events',
          meta: {
            title: 'События',
            layout: 'DefaultLayout',
            requiresAuth: true,
          },
          components: {
            default: () => import('@/views/Events'),
            toolbar: () => import('@/components/Toolbars/EventsToolbar'),
          }
        },
        {
          path: '/main',
          name: 'main',
          meta: {
            title: 'Дополнительно',
            layout: 'DefaultLayout',
            requiresAuth: true,
          },
          component: function () {
            return import('../views/Menu.vue')
          }
        }
      ]
    }
  ]
})
