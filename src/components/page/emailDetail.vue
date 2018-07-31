<template>
	<section>
		<div class="head clearfix">
			<span>邮件详情</span>
			<el-button type="primary" size="small" plain @click="$_onBack">返回</el-button>
			<el-button type="danger" size="small" plain @click="del">删除</el-button>
		</div>
		
		<div class="message">
			<h3>{{emailItem.mail_name}}</h3>
			<ul>
				<li>收件人：{{emailItem.recipient}}&lt;{{emailItem.recipient_address}}&gt;</li>
				<li>时间：{{emailItem.send_time}}</li>
				<li>发件人：{{emailItem.sender}}&lt;{{emailItem.sender_address}}&gt;</li>
				<li>附件：</li>
			</ul>
		</div>
		<div class="letter-box">
			<div class="letter-border">
            	<p style="font: 15px/26px '微软雅黑'; color: #333; white-space: 2px;">Hi，<br>
			  		&nbsp;&nbsp;&nbsp;&nbsp;今天是加入品高的第一天，过得还惬意么?感受到品高的活力了么？真诚地祝您在公司一切愉快！<br> 
			        	有什么需要帮忙的么？试试下面的方法？<br>
			        1）想了解部门对自己工作绩效的期望？需要开通公司系统某个模块的权限？想了解业务的接口人？<br> 
			        答：直属部门经理可以帮到你！“LINK-工作指南“可以帮到你！<br>
			        2）\t想了解近段时间的工作安排？想尽快了解负责的业务、项目情况？<br>
			        答：快去找你的导师帮忙吧！<br>
			        3）入职提交的材料还有遗漏？社保公积金有疑惑？入职时介绍的办事流程还有疑惑？<br>
			         答：欢迎咨询温柔可爱的HR小姐姐：）<br>
			        &nbsp;&nbsp;&nbsp;&nbsp;HR小姐姐祝您工作顺利！生活愉快！幸福感爆棚！开启Bingo旅程!
            	</p >
        	</div>
		</div>
	</section>
</template>

<script>

  	export default {
	    data() {
	      return {
	      	
	      }
	    },
	    props: {
		    emailItem: {
		      type: Object,
		      default: null
		    }
		},
	    methods: {
	    	goBack(){
	    		this.$router.go(-1);
	    	},
	    	$_onBack: function() {
		      this.$emit("on-back", null);
		    },
	    	//取消发送
	    	del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除该邮件吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//api
					
				}).catch(() => {
					
				});
	    	},
	    	//分页
	    	handleCurrent(val) {
	    		this.currentPage = val;//页数高亮
				this.page = val;
			},
			handleSizeChange(val) {
				this.pageSize = val
		    },
	    	
	   },
	}
</script>

<style lang="scss" scoped="scoped">
	
	@import "src/assets/scss/_emailDetail.scss";
    
</style>