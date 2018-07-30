import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/page/login'
import index from '@/components/page/index'
import sent from '@/components/page/sent'
import waitSend from '@/components/page/waitSend'
import business from '@/components/page/business'
Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/',redirect:'/login'},
		{path:'/login',component:login},
		{	
			path:'/index',
			component:index,
				children:[
					{path: '/index', redirect: '/index/sent/所有分类' },
					{path:'sent/:title',name:sent,component:sent},
					{path:'waitSend/:title',name:waitSend,component:waitSend},
					{path:'business',component:business},
				]
		}
  ]
})
