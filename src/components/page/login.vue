<template>
	<section class="loginBox" :style="{backgroundImage: 'url(' +bg + ')'}">
		<div class="header">
			<h3><span>HR</span>&nbsp;Assistant</h3>
		</div>
		
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container"  @keyup.native.13="handleSubmit">
		    <el-form-item prop="account">
		    	<i class="el-icon-message"></i>
		    	<!--<input type="text" name="" id="account" v-model="ruleForm.account" placeholder="请输入邮箱"/>-->
		      	<el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="请输入邮箱"></el-input>
		    </el-form-item>
		    <el-form-item prop="checkPass">
		    	<i class="el-icon-hr-password"></i>
		    	<!--<input type="password" name="" id="password" v-model="ruleForm.checkPass" placeholder="请输入密码"/>-->
		      	<el-input type="password" v-model="ruleForm.checkPass" id="password" auto-complete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
		    <el-checkbox v-model="checked" text-color="#ccc" fill="#fff">Remember me</el-checkbox>
		    <el-button type="primary" style="width:100%;" @click.prevent="handleSubmit" :loading="logining">Enter<i class="el-icon-arrow-right"></i></el-button>
		</el-form>
	</section>
</template>

<script>
//import { requestLogin } from '../../api/api';
  
  export default {
    data() {
      return {
        logining: false,
        bg:require('../../assets/img/bg1.jpg'),
        ruleForm: {
          account: 'Zoulb@bingosoft.net',
          checkPass: 'admin'
        },
        rules: {
          account: [{ required: true, message: '请输入邮箱', trigger: 'change' }],
          checkPass: [{ required: true, message: '请输入密码', trigger: 'change' }]
        },
        checked: true
      };
    },
    methods: {
      	handleSubmit(ev) {
      		this.$refs.ruleForm.validate((valid) => {
          	if (valid) {
          		this.logining = true;
	      		sessionStorage.setItem('user', 'zlb');
	      		this.$router.push({ path: '/index' });
	      	} else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
//      var _this = this;
//      this.$refs.ruleForm.validate((valid) => {
//        if (valid) {
//          this.logining = true;
//          var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass };
//          requestLogin(loginParams).then(data => {
//            this.logining = false;
//            let { msg, code, user } = data;
//            if (code !== 200) {
//              this.$message({
//                message: msg,
//                type: 'error'
//              });
//            } else {
//              sessionStorage.setItem('user', JSON.stringify(user));
//              this.$router.push({ path: '/index' });
//            }
//          });
//        } else {
//          console.log('error submit!!');
//          return false;
//        }
//      });
      }
    },
    mounted(){
    	
    }
  }

</script>

<style lang="scss" scoped="scoped">
	.loginBox {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: gainsboro;
		background-position: center;
		background-size: cover;
		background-attachment: fixed;
		.header{
			position: absolute;
			height: 60px;
			left: 35px;
			right: 35px;
			top: 60px;
			line-height: 60px;
			font-size: 28px;
			text-align: center;
			color:white;
			font: 46px md; 
			h3 span{
				font-weight: bold;
			}
		}
	}
	.login-container {
	    width: 400px;
	    height: 215px;
	    position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		padding: 40px;
		border-radius: 8px;
		background-color: rgba(0,0,0,.4);
	    .el-form-item{
	    	border-bottom: 2px solid ghostwhite;
	    	i{
	    		font-size: 22px;
	    		text-indent: 15px;
	    		color: ghostwhite;
	    	}
	    	.el-input{
	    		width: 300px;
	    		height: 35px;
	    		position: absolute;
	    		top: -4px;
	    		margin-left: 18px;
	    		font:bold 20px md;
	    		border: none;
	    	}
	    }
	    .el-checkbox__label{
	    		color: gainsboro;
	    	}
	    .el-button {
		    height: 41px;
		    margin-top: 25px;
		    background-color: rgba(0,0,0,.5);
		    border: none;
		    border-radius: 20px;
		    font:17px/16px md;
		    vertical-align: center;
		    .el-icon-arrow-right{
		    	position: relative;
		    	top: 1px;
		    }
		    &:hover{
		      	background-color: rgba(0,0,0,.6);
		    }
	    }
	}
	
	
</style>