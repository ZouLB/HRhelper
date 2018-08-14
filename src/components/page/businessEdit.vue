<template>
	<section id="busEdit">
		<div class="head clearfix">
			<span>规则编辑</span>
			<el-button type="primary" size="small" plain @click="$_onBack">返回</el-button>
			<el-button type="primary" size="small" @click="$_onSave" :loading="saveLoading">保存</el-button>
			<el-button v-if="editableTabsValue=='1'" type="primary" size="small" plain @click="addDomain">新增发送时间</el-button>
		</div>
		
		<div class="content">
			<el-tabs v-model="editableTabsValue" type="card">
				<el-tab-pane label="基本信息" name="1">
			  	<el-form :model="businessItem" label-width="90px" ref="businessItem" :rules="rules">
					<el-form-item label="规则名称" prop="name">
						<el-input v-model="businessItem.name" auto-complete="off" placeholder="请输入规则名称"></el-input>
					</el-form-item>
					<el-form-item label="接口人" prop="principal">
						<!--<el-select v-model="businessItem.principal" multiple filterable allow-create default-first-option placeholder="请选择或输入负责人">
							<el-option v-for="(item,i) in hrForm" :key="i" :label="item" :value="item">
							</el-option>
						</el-select>-->
						<el-select v-model="businessItem.principal" placeholder="请选择接口人">
					      <el-option v-for="(item,i) in hrForm" :key="i" :label="item" :value="item">
							</el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="业务类型" prop="principal">
						<el-select v-model="businessItem.principal" placeholder="请选择业务类型">
					      <el-option v-for="(item,i) in hrForm" :key="i" :label="item" :value="item">
							</el-option>
					    </el-select>
					</el-form-item>
					
					<el-form-item label="参照时间">
						<el-radio-group v-model="value">
					      	<el-radio label="入职后"></el-radio>
					      	<el-radio label="转正前"></el-radio>
					      	<el-radio label="合同结束前"></el-radio>
					    </el-radio-group>
					</el-form-item>
					
					<el-form-item
					    v-for="(domain, index) in dynamicValidateForm.domains"
					    :label="'发送时间' + (index+1)"
					    :key="domain.key">
					    <!--<el-radio-group v-model="value">
					      	<el-radio label="入职后"></el-radio>
					      	<el-radio label="转正前"></el-radio>
					      	<el-radio label="合同结束前"></el-radio>
					    </el-radio-group>
					    
					    </br>-->
					    <!--<span>入职后</span>-->
					    
					    <!--<el-select v-model="value" placeholder="请选择" class="selectTime">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>-->
						<el-input-number v-model="year" size="small" controls-position="right" :min="0" :max="10"></el-input-number>&nbsp;年&nbsp;
						<el-input-number v-model="month" size="small" controls-position="right" :min="0" :max="11"></el-input-number>&nbsp;月&nbsp;
						<el-input-number v-model="day" size="small" controls-position="right" :min="0" :max="31"></el-input-number>&nbsp;日&nbsp;&nbsp;
					
						<el-time-select
						  v-model="value3"
						  class="sentTime"
						  :picker-options="{
						    start: '08:30',
						    step: '00:15',
						    end: '19:00'
						  }"
						  placeholder="请选择">
						</el-time-select>
					    <!--<el-button type="text" v-if="index==0" size="small" @click="addDomain">新增</el-button>-->
					    <el-button type="text" v-if="index>0" size="small" @click.prevent="removeDomain(domain)" class="delBtn">删除</el-button>
		
					</el-form-item>
					
					<el-form-item label="备注" prop="describe">
						<el-input type="textarea" :rows="4" auto-complete="off"></el-input>
					</el-form-item>
		
				</el-form>
				</el-tab-pane>
				<el-tab-pane label="邮件模板编写" name="2">
					<quill-editor ref="myTextEditor"
			            v-model="mailContent"
			            :options="editorOption">
			        </quill-editor>
				</el-tab-pane>
			</el-tabs>
			
			
		</div>
		
	</section>
</template>

<script>
	import util from '../../assets/js/util.js';
	import { quillEditor } from 'vue-quill-editor'
	
  	export default {
	    data() {
	     	return {
	      		rules: {
		        	name: [{ required: true, message: '请输入业务名称', trigger: 'change' }],
		        	principal: [{ required: true, message: '请选择或输入负责人', trigger: 'change' }],
		        	rule: [{ required: true, message: '请输入业务规则', trigger: 'change' }],
		        },
		        saveLoading:false,
		        hrForm:['张三','李四','王五'],//获取所有人事部的HR
		        year:0,
		        month:0,
		        day:1,
		        hours:18,
		        minutes:15,
		        value3: null,
		        dynamicValidateForm: {
			        domains: [{
			            value: ''
			        }],
			        email: ''
			    },
			    value:"入职后",
			    editableTabsValue: '1',
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
	    props: {
		    businessItem: {
		      type: Object,
		      default: null
		    }
		},
	    methods: {
	    	//返回
	    	$_onBack: function() {
	    		//判断是否编辑了数据
//	    		this.$confirm('编辑的数据还没保存，确认返回吗?', '提示', {
//					type: 'warning'
//				}).then(() => {
//					this.listLoading = true;
//					
//					
//				}).catch(() => {
//					
//				});
		      this.$emit("on-back", null);
		    },
		    //保存
		    $_onSave: function() {
//		      	this.$refs.businessItem.validate((valid) => {
//		          	if (valid) {
//		          		this.saveLoading = true;
//						let para = Object.assign({}, this.businessItem);
//						para.createTime =util.formatDate.format(new Date(), 'yyyy-MM-dd');//更新时间
//						addKnowledge(para).then((res) => {
//							this.saveLoading = false;
//							this.$message({
//								message: '保存成功',
//								type: 'success'
//							});
//							this.$_onBack();
//						});
//			      	} 
//		        });
		    },
		    
	    	//删除业务
//	    	del:function(index,row){
//	    		this.$confirm('删除后将不能恢复，确认删除该业务吗?', '提示', {
//					type: 'warning'
//				}).then(() => {
//					this.listLoading = true;
//					
//					
//				}).catch(() => {
//					
//				});
//	    	},
	    	//分页
	    	handleCurrent(val) {
	    		this.currentPage = val;//页数高亮
				this.page = val;
			},
			handleSizeChange(val) {
				this.pageSize = val
		    },
	    	
	    	//删除规则
	    	removeDomain(item) {
		        var index = this.dynamicValidateForm.domains.indexOf(item)
		        if (index !== -1) {
		          this.dynamicValidateForm.domains.splice(index, 1)
		        }
		    },
		    //新增规则
		    addDomain() {
		        this.dynamicValidateForm.domains.push({
		          value: '',
		          key: Date.now()
		        });
		    }
	  	},
	  	watch:{
	  		value3(){
	  			let arr = this.value3.split(':');
	  			this.hours = arr[0];
	  			this.minutes = arr[1];
	  		}
	  	},
	  	computed: {
	      	editor() {
	        	return this.$refs.myTextEditor.quill
	      	},
	    },
	    mounted() {
	    	this.value3 = this.hours +':'+ this.minutes;
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
//	  	updated(){
//	  		console.log(this.value3);
//	  		console.log(this.hours);
//	  		console.log(this.minutes);
//	  	}
	}
</script>

<style lang="scss" scoped="scoped">
	
	@import "src/assets/scss/_common.scss";
	
	.el-form{
        position: absolute;
        left: 200px;
        top: 40px;
        max-width: 555px;
        .el-select,.el-input,.el-textarea{
            width: 420px;
        }
        .selectTime{
        	width: 100px;
        }
        .el-input-number--small{
        	width: 67px;
        }
        .el-form-item span{
        	color: #666;
        }
        /*.sentTime.el-input--small{
		    display: inline;
		}*/
		.sentTime.el-date-editor{
			width: 105px;
		}
		
		.delBtn{
			color: #F56C6C;
		}
		        
    }
    
    .el-form-item__content .el-button--primary:hover{
    	background-color: #0193C9;
	}
	
	.content{
		bottom: 22px;
		overflow: hidden;
	}
	.quill-editor{
		position: absolute;
		left: 40px;
		right: 40px;
		top: 18px;
		bottom: 45px;
	}
	.ql-editor{
		overflow: auto;
	}
</style>