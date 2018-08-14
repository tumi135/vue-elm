import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/goods'
import Ratings from '@/components/ratings'
import Seller from '@/components/seller'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods,
      name: 'Goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path:'/seller',
      component: Seller
    }
  ]
})
