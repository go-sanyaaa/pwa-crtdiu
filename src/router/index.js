import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('../views/Home'),
      children: [
        {
          path: '',
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
          path: 'events',
          name: 'events',
          meta: {
            title: 'События',
            requiresAuth: false,
          },
          components: {
            default: () => import('../views/HomeEvents'),
            toolbar: () => import('../components/Toolbars/HomeEventsToolbar')
          },
          children: [

          ]
        },
        {
          path: 'events/:id',
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
          path: 'notify',
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
          path: 'account',
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
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      meta: {
        title: 'Авторизация',
        layout: 'PublicLayout',
        requiresAuth: false,
        authClosed: true
      },
      component: () => import('../views/Auth')

    }
  ]
  // routes: [
  //   {
  //     path: '*',
  //     component: () => import('@/views/Auth')
  //   },
  //   {
  //     path: '/auth',
  //     name: 'login',
  //     component: () => import('../views/Auth'),
  //     meta: {
  //       title: 'Авторизация',
  //       layout: 'PublicLayout',
  //       requiresAuth: false,
  //       authClosed: true
  //     }
  //   },
  //   {
  //     path: '/',
  //     component: () => import('../views/HomeGlobal'),
  //     children: [
  //       {
  //         path: '',
  //         name: 'home',
  //         meta: {
  //           title: 'Лента',
  //           layout: 'DefaultLayout',
  //           requiresAuth: true,
  //         },
  //         components: {
  //           default: () => import('@/views/Home'),
  //           toolbar: () => import('@/components/Toolbars/HomeToolbar'),
  //         }
  //       },
  //       {
  //         path: '/notify',
  //         name: 'notify',
  //         meta: {
  //           title: 'Уведомления',
  //           layout: 'DefaultLayout',
  //           requiresAuth: true,
  //         },
  //         component: notify
  //       },
  //       {
  //         path: '/events',
  //         name: 'events',
  //         meta: {
  //           title: 'События',
  //           layout: 'DefaultLayout',
  //           requiresAuth: true,
  //         },
  //         components: {
  //           default: () => import('@/views/Events'),
  //           toolbar: () => import('@/components/Toolbars/EventsToolbar'),
  //         }
  //       },
  //       {
  //         path: '/main',
  //         name: 'main',
  //         meta: {
  //           title: 'Дополнительно',
  //           layout: 'DefaultLayout',
  //           requiresAuth: true,
  //         },
  //         component: () => import('@/views/Menu')
  //       }
  //     ]
  //   }
  // ]
})
