<!--<template>
	<section>
		<div></div>
	</section>
</template>

<style lang="scss" scoped="scoped">
	
	@import "src/assets/scss/_common.scss";
	
</style>-->
	
	
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
	        
	        <!--<textarea name="" rows="" cols="">-->
	        	
	        <img src="../../assets/img/convert#name#.png" alt="" />
	        <!--</textarea>-->
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
	        mailContent: `<h2 class="ql-align-center"><span class="ql-font-serif">邮件内容加载中..convert#name#</span><img src="../../assets/img/convert#name#.png" alt="" /></h2>`,
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
	        
	        bg:require('../../assets/img/convert#name#.png'),
      	}
    },
    methods: {
	    
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
        	this.mailContent = `<div style="margin-left:40px;">
    			<h3 class="ql-align-justify"><span style="color: rgb(112, 48, 160);">&emsp;&emsp;&emsp;Hi，</span></h3>
    			<h3 class="ql-align-justify">	<span style="color: rgb(112, 48, 160);">今天是加入品高的第一天，convert#name#<img src=${this.bg} alt="convert#name#" />过得还惬意么?感受到品高的活力了么？真诚地祝您在公司一切愉快！</span></h3>
    			`
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
		bottom: 105px;
	}
	.ql-editor{
		overflow: auto;
	}
	textarea{
		position: absolute;
		top: 500px;
		left: 40px;
		right: 40px;
		bottom: 45px;
	}
</style>
