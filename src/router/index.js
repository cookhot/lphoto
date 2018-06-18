import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'

const Comment = (resolve) => {
  import('@/page/comment').then((module) => {
    resolve(module)
  })
}

const User = (resolve) => {
  import('@/page/user').then((module) => {
    resolve(module)
  })
}

const UserName = (resolve) => {
  import('@/page/username').then((module) => {
    resolve(module)
  })
}

const Address = (resolve) => {
  import('@/page/address').then((module) => {
    resolve(module)
  })
}

const Location = (resolve) => {
  import('@/page/location').then((module) => {
    resolve(module)
  })
}

const Comments = (resolve) => {
  import('@/page/comments').then((module) => {
    resolve(module)
  })
}

const Favorite = (resolve) => {
  import('@/page/favorite').then((module) => {
    resolve(module)
  })
}

const Setting = (resolve) => {
  import('@/page/setting').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      components: {index: Index}
    },
    {
      // 根据不同的路由切换不同的主题
      path: '/comments/:theme?',
      component: Comments,
      children: [
        {
          path: 'comment',
          component: Comment,
          children: [
            {
              path: 'location',
              component: Location
            }
          ]
        }
      ]
    },
    {
      path: '/favorite',
      component: Favorite
    },
    {
      path: '/setting',
      component: Setting,
      children: [
        {
          path: 'user',
          component: User,
          children: [
            {
              path: 'username',
              component: UserName
            },
            {
              path: 'address',
              component: Address
            }
          ]
        }
      ]
    }
  ]
})
