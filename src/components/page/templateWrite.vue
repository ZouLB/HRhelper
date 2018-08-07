<template>
	<section id="temp-write">
		<div class="head clearfix editHead">
			<span>邮件模板编写</span>
			<!--<el-button type="primary" size="small" plain @click="addTab(editableTabsValue)">新增模板</el-button>-->
			<el-button type="primary" size="small" plain>取消</el-button>
			<el-button type="primary" size="small" @click="$_onSave" :loading="saveLoading">保存</el-button>
		</div>
		
		<div class="content">
			<el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
			  	<el-tab-pane
			    	v-for="(item, index) in editableTabs"
			    	:closable="index>4"
			    	:key="item.name"
			    	:label="item.title"
			    	:name="item.name">
			  	</el-tab-pane>
			</el-tabs>
			
			<quill-editor ref="myTextEditor"
	            v-model="mailContent"
	            :options="editorOption">
	        </quill-editor>
		</div>
	</section>
</template>

<script>


import { quillEditor } from 'vue-quill-editor'

export default {
    data() {
      	return {
      		saveLoading:false,
      		
	        editableTabsValue: '1',
	        editableTabs: [{
	          title: '入职提醒',
	          name: '1'
	        }, {
	          title: '绩效表提醒',
	          name: '2'
	        },{
	          title: '转正提醒',
	          name: '3'
	        },{
	          title: '续签合同',
	          name: '4'
	        },{
	          title: '工作年限贺卡',
	          name: '5'
	        }],
	        tabIndex: 5,
	        
	        //邮件编辑器
	        mailContent: `<h2 class="ql-align-center"><span class="ql-font-serif">邮件内容加载中..</span></h2>`,
	        editorOption: {
	          	modules: {
	            	toolbar: [
	              		['bold', 'italic', 'underline', 'strike'],
	              		[{ 'header': 1 }, { 'header': 2 }],
	              		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
	              		[{ 'size': ['small', false, 'large', 'huge'] }],
	              		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	              		[{ 'font': [] }],
	              		[{ 'color': [] }, { 'background': [] }],
	              		[{ 'align': [] }],
	              		['image']
	            	]
	          	}
	        },
      	}
    },
    methods: {
    	//新增模板
	    addTab(targetName) {
	    	let newTabName = ++this.tabIndex + '';
	    	this.editableTabs.push({
	    		title: 'New Tab',
	    		name: newTabName
	    	});
	    	this.editableTabsValue = newTabName;
	    },
	    //删除模板
	    removeTab(targetName) {
	    	let tabs = this.editableTabs;
	    	let activeName = this.editableTabsValue;
	    	if(activeName === targetName) {
	    		tabs.forEach((tab, index) => {
	    			if(tab.name === targetName) {
	    				let nextTab = tabs[index + 1] || tabs[index - 1];
	    				if(nextTab) {
	    					activeName = nextTab.name;
	    				}
	    			}
	    		});
	    	}
	    	this.editableTabsValue = activeName;
	    	this.editableTabs = tabs.filter(tab => tab.name !== targetName);
	    },
	    
	    //保存
	    $_onSave:function() {
//	    	this.saveLoading = true;
	    	console.log(this.mailContent)
	    }
	    
    },
    computed: {
      	editor() {
        	return this.$refs.myTextEditor.quill
      	},
    },
    mounted() {
      	setTimeout(() => {
        	this.mailContent = `<div style="margin-left:40px;"><h3 class="ql-align-justify"><br></h3>
	        			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">&emsp;&emsp;&emsp;Hi，</span></h3>
	        			<h3 class="ql-align-justify">	<span style="color: rgb(112, 48, 160);">今天是加入品高的第一天，过得还惬意么?感受到品高的活力了么？真诚地祝您在公司一切愉快！</span></h3>
	        			<h3 class="ql-align-justify">	<span style="color: rgb(112, 48, 160);">有什么需要帮忙的么？试试下面的方法？</span></h3>
	        			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">1）想了解部门对自己工作绩效的期望？需要开通公司系统某个模块的权限？想了解业务的接口人？</span></h3>
	        			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">答：直属部门经理可以帮到你！“LINK-工作指南“可以帮到你！</span></h3>
	        			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">2） 想了解近段时间的工作安排？想尽快了解负责的业务、项目情况？</span></h3>
	        			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">答：快去找你的导师帮忙吧！</span></h3><h3 class="ql-align-justify">
	        			<span style="color: rgb(112, 48, 160);">3）入职提交的材料还有遗漏？社保公积金有疑惑？入职时介绍的办事流程还有疑惑？</span></h3>
	        			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">答：欢迎咨询温柔可爱的HR小姐姐：）</span></h3><h3 class="ql-align-justify">	
	        			<span style="color: rgb(112, 48, 160);">HR小姐姐祝您工作顺利！生活愉快！幸福感爆棚！开启Bingo旅程！</span></h3>
	        			<p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><p class="ql-align-right"><br></p><p class="ql-align-right">❤人力资源部❤</p><h3><br></h3></div>`
      	}, 300)
    },
    components: {
	    quillEditor
	}
  }
</script>

<style lang="scss" scoped="scoped">
	@import "src/assets/scss/_common.scss";
	
	.content{
		bottom: 22px;
		overflow: hidden;
	}
	.quill-editor{
		position: absolute;
		left: 40px;
		right: 40px;
		top: 52px;
		bottom: 45px;
	}
	.ql-editor{
		overflow: auto;
	}
</style>