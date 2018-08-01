<template>
	<section class="loginBox" :style="{backgroundImage: 'url(' +bg + ')'}">
		<div class="header">
			<h3><span>HR</span>小助手</h3>
		</div>
		
		<el-form 
			:model="ruleForm" 
			:rules="rules" 
			ref="ruleForm" 
			label-position="left" 
			label-width="0px" 
			class="demo-ruleForm login-container"  
			@keyup.native.13="handleSubmit">
		    <el-form-item prop="account">
		    	<i class="el-icon-message"></i>
		      	<el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="请输入邮箱"></el-input>
		    </el-form-item>
		    <el-form-item prop="checkPass">
		    	<i class="el-icon-hr-password"></i>
		      	<el-input type="password" v-model="ruleForm.checkPass" id="password" auto-complete="off" placeholder="请输入密码"></el-input>
		    </el-form-item>
		    <el-checkbox v-model="checked" text-color="#ccc" fill="#fff">记住密码</el-checkbox>
		    <el-button type="primary" style="width:100%;" @click.prevent="handleSubmit" :loading="logining">登录<i class="el-icon-arrow-right"></i></el-button>
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

	@import "src/assets/scss/_login.scss";
	
</style>