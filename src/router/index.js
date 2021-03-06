import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Goods from '../views/Goods'
import Login from '../views/Login'
import store from '../store'
Vue.use(VueRouter)

//编程式导航：重复点击一个路由  报错
//解决方法：1.降低路由版本 3.0.7  2.重写路由的js文件
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//按需加载组件
const Advert =   () =>import('../views/Advert')
const User =   () =>import('../views/User')
const Params =   () =>import('../views/Params')
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta:{
      isLogin:true,
    },
    children:[
      {
        path:'/',
        name:'Goods',
        component:Goods
      },
      {
        path:'/params',
        name:'Params',
        component:Params
      },
      {
        path:'/advert',
        name:'Advert',
        component:Advert
      },
      {
        path:'/user',
        name:'User',
        component:User
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//全局守卫导航
router.beforeEach((to,from,next)=>{
  //判断是否需要登录
  if(to.matched.some(ele=>ele.meta.isLogin)){//需要登录
    //判断当前是否登录
    let token=store.state.LoginModule.userinfo.token; 
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    //不需要登录
    next()
  }
})
export default router
