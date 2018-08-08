import Vue from 'vue'
import Router from 'vue-router'
//import login from '@/components/page/login'
//import index from '@/components/page/index'
//import sent from '@/components/page/sent'
//import waitSend from '@/components/page/waitSend'
//import business from '@/components/page/business'

const login = resolve => require(['@/components/page/login'],resolve);
const index = resolve => require(['@/components/page/index'],resolve);
const sent = resolve => require(['@/components/page/sent'],resolve);
const waitSend = resolve => require(['@/components/page/waitSend'],resolve);
const business = resolve => require(['@/components/page/business'],resolve);
const templateWrite = resolve => require(['@/components/page/templateWrite'],resolve);

Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/',redirect:'/login'},
		{path:'/login',component:login},
		{	
			path:'/index',
			component:index,
				children:[
					{path: '/index', redirect: '/index/sent/0' },
					{path:'sent/:id',name:sent,component:sent},
					{path:'waitSend/:id',name:waitSend,component:waitSend},
					{path:'business',component:business},
					{path:'templateWrite',component:templateWrite},
				]
		}
  ]
})
