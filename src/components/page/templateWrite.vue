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
        	this.mailContent = `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
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
		bottom: 45px;
	}
	.ql-editor{
		overflow: auto;
	}
</style>