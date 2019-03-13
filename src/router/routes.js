const routes = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/A'),
        title: 'Auth',
        layout: 'PublicLayout',
        isPublic: true
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Auth'),
        title: 'Auth',
        layout: 'PublicLayout',
        isPublic: true
    },
]