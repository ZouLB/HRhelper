<template>
	<section>
		<v-header></v-header>
		<div :class="['left',{'off':isCollapse}]">
			<el-menu 
				:default-active="defaultActive" 
				class="el-menu-vertical-demo" 
				:collapse="isCollapse" 
				background-color="#E4E7ED" 
				active-text-color="#409EFF" 
				:router="isRouter">
				<el-menu-item index="" @click="isCollapse=!isCollapse">
					<i class="el-icon-arrow-left"></i>
					<span slot="title">菜单栏</span>
				</el-menu-item>
				<el-menu-item index="/index/home">
					<i class="el-icon-hr-home"></i>
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-hr-sent-"></i>
						<span slot="title">待发送邮件</span>
					</template>
					<el-menu-item v-for="(v,i) in title" :key="i" :index="'/index/waitSend/'+v.id" @click="defaultActive = '/index/waitSend/'+v.id+'/'+v.isSpecial">
					<!--<i class="el-submenu__icon-arrow el-icon-arrow-right"></i>-->
					{{v.operationName}}
					</el-menu-item>
				</el-submenu>
				
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-hr-sent"></i>
						<span slot="title">已发送邮件</span>
					</template>
					<el-menu-item v-for="(v,i) in title" :key="i" :index="'/index/sent/'+v.id">
						{{v.operationName}}
					</el-menu-item>
				</el-submenu>
				
				<el-menu-item index="/index/management">
					<i class="el-icon-hr-business2"></i>
					<span slot="title">业务管理</span>
				</el-menu-item>
				<el-menu-item index="/index/help">
					<i class="el-icon-hr-custom-help"></i>
					<span slot="title">帮助</span>
				</el-menu-item>
			</el-menu>
	   </div>
	    <div :class="['right',{'on':!isCollapse,'off':isCollapse}]">
	    	<transition name='fade' mode="out-in">
		    	<router-view class="child-view right-main" ></router-view>
		    </transition>
		</div>
	</section>
	
</template>

<script>
	import vheader from '../common/header.vue'
	import { getMenuList} from '../../api/api';
	
	export default {
		data() {
			return {
				isCollapse: false,
				isRouter:true,
//				['所有分类','入职提醒','绩效表提醒','转正提醒','续签合同','工作年限贺卡']
				title:[],
				defaultActive:"/index/waitSend/1",
				screenWidth: document.body.clientWidth
			}
		},
    	methods: {
    		
	    },
		components: {
			'v-header':vheader
		},
		mounted() {
			const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
            getMenuList().then((res) => {
				this.title = res.data.resultEntity;
			});
			
			if(this.$route.path.indexOf("/index/management")!=-1){
   				this.defaultActive = "/index/management";
   			}else{
   				this.defaultActive = this.$route.path;
   			}
		},
		watch:{
	   		'$route' (to, from){
	   			if(to.path.indexOf("/index/management")!=-1){
	   				this.defaultActive = "/index/management";
	   			}else{
	   				this.defaultActive = to.path;
	   			}
	   		},
	   		 screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        if(that.screenWidth<1300){
                        	that.isCollapse = true;
                        }else{
                        	that.isCollapse = false;
                        }
                        that.timer = false
                    }, 400)
                }
            }

	  	},
	}
</script>

<style scoped="scoped" lang="scss">

	@import "src/assets/scss/_index.scss";
	
</style>