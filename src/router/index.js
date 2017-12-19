import Vue from 'vue'
import Router from 'vue-router'
import RegistrationMain from '@/components/RegistrationMain'
import vueShop from '@/components/vueShop'
import Music from '@/components/Music'
import Popular from '@/components/Popular'
import Play from '@/components/Play'
import Search from '@/components/Search'
import SongList from '@/components/SongList'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationMain
    },
    {
      path:'/vueShop',
      name:'vueShop',
      component:vueShop
    },
    {
      path:'/Music',
      name:'music',
      component:Music,
      children:[
      {
        path:'popular',
        name:'popular',
        component:Popular
      },
      {
        path:'play/:id',
        name:'play',
        component:Play
      },
      {
        path:'search',
        name:'search',
        component:Search
      },
      {
        path:'songlist/:id',
        name:'songlist',
        component:SongList
      }
      ]
    }
  ],
  scrollBehavior(to,from,savedPosition){
    // if(savedPosition){
    //   return savePosition
    // }else{
      return {x:0,y:0}
    // }
  }
})
