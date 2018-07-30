<template>
	<section>
		<v-header></v-header>
		<div :class="['left',{'off':isCollapse}]">
			<el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#D4D4D4" active-text-color="#409EFF" :router="isRouter">
				<el-menu-item index="" @click="isCollapse=!isCollapse">
					<i class="el-icon-arrow-left"></i>
					<span slot="title">菜单栏</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-hr-sent"></i>
						<span slot="title">已发送邮件</span>
					</template>
					<el-menu-item v-for="(v,i) in title" :index="'/index/sent/'+v">
						{{v}}
					</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-hr-sent-"></i>
						<span slot="title">待发送邮件</span>
					</template>
					<el-menu-item v-for="(v,i) in title" :index="'/index/waitSend/'+v">
					<!--<i class="el-submenu__icon-arrow el-icon-arrow-right"></i>-->
					{{v}}
					</el-menu-item>
				</el-submenu>
				<el-menu-item index="/index/business">
						<i class="el-icon-hr-business2"></i>
						<span slot="title">业务管理</span>
				</el-menu-item>
				<!--<el-menu-item index="">
					<i class="el-icon-hr-mail1"></i>
					<span slot="title">邮件模板编写</span>
				</el-menu-item>
				<el-menu-item index="">
					<i class="el-icon-news"></i>
					<span slot="title">审核管理</span>
				</el-menu-item>-->
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
	
	export default {
		data() {
			return {
				isCollapse: false,
				isRouter:true,
				title:['所有分类','入职提醒','绩效表提醒','转正提醒','续签合同','工作年限贺卡'],
			}
		},
    	methods: {
    		
	    },
		components: {
			'v-header':vheader
		},
		mounted() {
			
		}
	}
</script>

<style scoped="scoped" lang="scss">

	@import "src/assets/scss/animation.scss";
	
	$comcolor:rgb(238, 241, 246);
	.left{
		position: absolute;
		top: 60px;
		bottom: 0;
		width: 250px;
		background-color: #D4D4D4;
		overflow: auto;
		&::-webkit-scrollbar{
			width: 7px;
			height: 16px;
			background-color:$comcolor;
			cursor: pointer;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 7px;
			background-color: #aaa;
			cursor: pointer;
		}
		&.off .el-icon-arrow-left{
			transform: rotate(180deg);
		}
		.el-menu{
			border-right: none;
			[class^='el-icon']{
				font: 19px "微软雅黑";
			}
			.el-icon-hr-sent{
				font-size: 24px;
			}
			.el-icon-hr-business2{
				font-size: 20px;
			}
			.el-menu-item{
				font-size: 15px;
				line-height: 55px;
				&:hover{
					background-color: #E4E7ED;
				}
				.el-icon-arrow-left{
					transition: transform 0.3s;
				}
				a{
					display: block;
					width: 100%;
					height: 100%;
					color: #303133;
					[class^='el-icon']{
						color: #909399;
					}
					/*&.router-link-active{
						color: #0085B5;
						i{
							color: #0085B5;
						}
					}*/
				}
			}
			.el-submenu__icon-arrow{
				font-size: 15px;
			}
		}
	}
	.right{
		position: absolute;
		top: 60px;
		bottom: 0;
		right: 0;
		transition: all .3s;
		padding: 11px;
		overflow: auto;
		background-color:#f8f8f8; 
		&::-webkit-scrollbar{
			width: 7px;
			height: 16px;
			background-color:$comcolor;
			cursor: pointer;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 7px;
			background-color: #aaa;
			cursor: pointer;
		}
		&.on{
			left: 250px;
		}
		&.off{
			left: 64px;
		}
	}
</style>