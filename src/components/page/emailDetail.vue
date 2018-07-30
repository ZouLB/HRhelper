<template>
	<section>
		<div class="head clearfix">
			<span>邮件详情</span>
			<el-button type="primary" size="small" plain @click="$_onBack">返回</el-button>
			<el-button type="danger" size="small" plain @click="del">删除</el-button>
		</div>
		
		<div class="message">
			<h3>{{emailItem.theme}}</h3>
			<ul>
				<li>收件人：{{emailItem.recipient}}&lt;zhangsan@bingosoft.net&gt;</li>
				<li>时间：{{emailItem.send_time}}</li>
				<li>发件人：{{emailItem.interface}}&lt;zhangsan@bingosoft.net&gt;</li>
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
	
	section{
		margin-bottom: 10px;
		box-shadow: 0 0 5px #ccc;
	}
	.head{
		padding: 9px 11px;
    	border-bottom: 1px solid gainsboro;
    	span {
	        font: 16px/32px "微软雅黑";
	        color: #666;
	    }
    	.el-button {
	        float: right;
	        margin-left: 10px;
	    }
	}
	
	.message{
		background-color: #f2f2f2;
		padding:10px 0 10px 25px;
    	border-bottom: 1px solid gainsboro;
		font: 14px/26px "微软雅黑";
		color: #909399;
		h3{
			color: #303133;
			font: 15px/29px "微软雅黑";
		}
	}
	
	.email-content{
		width: 65%;
		margin: 50px auto;
		border: 1px solid gainsboro;
	}
	.letter-box{
        width: 65%;
		margin: 50px auto;
        padding: 6px;
        box-sizing: border-box;
        background: linear-gradient(45deg,#f25953 12.5%,#fbfaf5 12.5%,#fbfaf5 25%,#5590d6 25%,#5590d6 37.5%,#fbfaf5 37.5%,#fbfaf5 50%,#f25953 50%,#f25953 62.5%,#fbfaf5 62.5%,#fbfaf5 75%,#5590d6 75%,#5590d6 87.5%,#fbfaf5 87.5%,#fbfaf5 100%);
        background-size: 70px 70px;
    }
    .letter-border{
        width: 100%;
        height: 100%;
   		padding: 20px 0;
        background: #fbfaf5;
        box-sizing: border-box;
        text-align: center;
        p{
        	display: inline-block;
        	text-align: left;
        }
    }
    
</style>