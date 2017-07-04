import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import home from '@/components/page/home'
import user from '@/components/page/home/user'
import useradd from '@/components/page/home/user/useradd'
import useredit from '@/components/page/home/user/useredit'
import group from '@/components/page/home/group'
import groupadd from '@/components/page/home/group/groupadd'
import groupedit from '@/components/page/home/group/groupedit'
import role from '@/components/page/home/role'
import roleadd from '@/components/page/home/role/roleadd'
import roleedit from '@/components/page/home/role/roleedit'
import auth from '@/components/page/home/auth'
import authadd from '@/components/page/home/auth/authadd'
import authedit from '@/components/page/home/auth/authedit'
import error from '@/components/page/error'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'*',component:error},
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/home',
      name:'home',
      component:home,
      children:[
        {path:'user',component:user},
        {path:'useradd',component:useradd},
        {path:'useredit/:uid',component:useredit},
        {path:'group',component:group},
        {path:'groupadd',component:groupadd},
        {path:'groupedit/:gid',component:groupedit},
        {path:'role',component:role},
        {path:'roleadd',component:roleadd},
        {path:'roleedit/:rid',component:roleedit},
        {path:'auth',component:auth},
        {path:'authadd',component:authadd},
        {path:'authedit/:aid',component:authedit}
      ]
    }
  ]
})
