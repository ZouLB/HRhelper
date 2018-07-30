<template>
  <div class="head">
      <div class="title">
      	<img src="../../assets/img/bingoLogo.png" class="logo"/>
      	<span><b>HR</b> Assistant</span>
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
  .head{
	  width:100%;
	  height:60px;
	  font:17px/60px "微软雅黑";
	  color: white;
	  background-color: rgb(98,168,230);
	 	text-indent: 22px;
	 	
	 	.title{
		 	position:absolute;
		 	left:0;
		 	top:0;
		 	.logo{
		 		display: inline-block;
		 		width: 55px;
		 		position: relative;
		 		top: 12px;
		 	}
		 	span{
		 		position: relative;
		 		top: -1px;
		 		left: 5px;
		 		font: 21px md;
		 		b{
		 			font-weight: bold;
		 		}
		 	}
	 	}
	 	.exit{
	 		float: right;
	 		margin-right: 22px;
	 		cursor: pointer;
	 		.el-dropdown{
		 		font-size:16px; 
	 			color: white;
	 		}
	 		.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 36px;
						height: 36px;
						border-radius: 20px;
						margin: 12px -12px 12px 0;
						float: left;
					}
			}
			.el-icon-caret-bottom{
				text-indent: 7px;
			}
	 	}
  }
  .el-dropdown-menu__item{
  	&:not(.is-disabled):hover{
  		color: #409EFF;
  		background-color: #eef1f6;
  	}
  	i{
  		margin-right: 5px;
  	}
  }
</style>
