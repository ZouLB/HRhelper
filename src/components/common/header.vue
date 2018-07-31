<template>
  <div class="head">
      <div class="title">
      	<img src="../../assets/img/bingoLogo.png" class="logo"/>
      	<span><b>HR</b>小助手</span>
      </div>
      
      <div class="exit" v-show="exitShow">
      	<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img src="../../assets/img/img-head.png" />{{userName}}<i class="el-icon-caret-bottom"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="exitLogin"><i class="el-icon-hr-exit"></i>退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
      </div>
  </div>
</template>

<script>

	export default{
		data(){
			return{
				exitShow:true,
				userName:'admin'
			}
		},
		methods:{
			exitLogin(){
					this.$router.push({ path: '/login' });
			}
		},
    watch: {
      
    },
    mounted(){
	   	
	  },
   
	}
	
</script>


<style scoped lang="scss">
  
  @import "src/assets/scss/_header.scss";
  
</style>
