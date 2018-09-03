import Vue from 'vue'
import Router from 'vue-router'

const login = resolve => require(['@/components/page/login'],resolve);
const index = resolve => require(['@/components/page/index'],resolve);
const home = resolve => require(['@/components/page/home'],resolve);
const sent = resolve => require(['@/components/page/sent'],resolve);
const waitSend = resolve => require(['@/components/page/waitSend'],resolve);
const management = resolve => require(['@/components/page/management'],resolve);
const business = resolve => require(['@/components/page/business'],resolve);
const rules = resolve => require(['@/components/page/rules'],resolve);
const help = resolve => require(['@/components/page/help'],resolve);
const approval = resolve => require(['@/components/page/approval'],resolve);

Vue.use(Router)

export default new Router({
  routes: [
  	{path:'/',redirect:'/login'},
		{path:'/login',component:login},
		{path:'/approval',component:approval},
		{	
			path:'/index',
			component:index,
				children:[
					{path: '/index', redirect: '/index/home' },
					{path:'home',component:home},
					{path:'sent/:id',name:sent,component:sent},
					{path:'waitSend/:id',name:waitSend,component:waitSend},
					{path:'help',component:help},
					{
						path:'management',
						component:management,
						children:[
							{path:'/index/management', redirect: '/index/management/business' },
							{path:'business',component:business},
							{path:'rules/:oid',component:rules},
						]
					},
				]
		}
  ]
})
