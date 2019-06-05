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
      },
      components: {
        default: () => import('../views/HomeNews'),
        toolbar: () => import('../components/Toolbars/NewsToolbar')
      }
    },
    {
      path: '/news/:id',
      name: 'single-news',
      meta: {
        title: 'Новость',
        hideBottomNav: true
      },
      props: {default: true, toolbar: true},
      components: {
        default: () => import('../views/SingleNews'),
        toolbar: () => import('../components/Toolbars/SingleNewsToolbar')
      }
    },
    {
      path: '/events',
      name: 'events',
      meta: {
        title: 'События',
      },
      components: {
        default: () => import('../views/HomeEvents'),
        toolbar: () => import('../components/Toolbars/EventsToolbar')
      }
    },
    {
      path: '/events/:id',
      name: 'single-event',
      meta: {
        title: 'Событие',
        hideBottomNav: true
      },
      props: {default: true, toolbar: true},
      components: {
        default: () => import('../views/SingleEvent'),
        toolbar: () => import('../components/Toolbars/SingleEventsToolbar')
      }
    },
    {
      path: '/account',
      name: 'account',
      meta: {
        title: 'Аккаунт',
      },
      components: {
        default: () => import('../views/HomeAccount'),
        toolbar: () => import('../components/Toolbars/DefaultToolbar')
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