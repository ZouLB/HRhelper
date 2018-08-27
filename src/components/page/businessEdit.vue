<template>
	<section id="busEdit">
		<div class="head clearfix">
			<span>
				<router-link to="/index/business">业务管理</router-link>
				<i class="el-icon-arrow-right"></i>
				<a @click="$_onBack">规则管理</a>
				<i class="el-icon-arrow-right"></i>
				{{businessItem?'新增规则':'编辑规则'}}
			</span>
			<el-button type="primary" size="small" plain @click="$_onBack">返回</el-button>
			<el-button v-if="businessItem" type="primary" size="small" @click="$_onAdd" :loading="saveLoading">新增</el-button>
			<el-button v-else type="primary" size="small" @click="$_onSave" :loading="saveLoading">保存</el-button>
			<!--<el-button v-if="editableTabsValue=='1'" type="primary" size="small" plain @click="addDomain">新增发送时间</el-button>-->
		</div>
		
		<div class="content">
			<el-tabs v-model="editableTabsValue" type="card">
				<el-tab-pane label="基本信息" name="1">
			  	<el-form :model="tableDetail" label-width="90px" ref="tableDetail" :rules="rules">
					<el-form-item label="规则名称" prop="ruleName">
						<el-input v-model="tableDetail.ruleName" auto-complete="off" placeholder="请输入规则名称"></el-input>
					</el-form-item>
					<!--<el-form-item label="接口人" prop="principal">
						<el-select v-model="businessItem.principal" placeholder="请选择接口人">
					      <el-option v-for="(item,i) in hrForm" :key="i" :label="item" :value="item">
							</el-option>
					    </el-select>
					</el-form-item>
					<el-form-item label="业务类型" prop="operationId">
						<el-select v-model="tableDetail.operationId" placeholder="请选择业务类型">
					      <el-option v-for="(item,i) in sortForm" :key="i" :label="item.operationName" :value="item.id">
					      	<!--{{item.operationName}}
							</el-option>
					    </el-select>
					</el-form-item>-->
					
					<el-form-item label="启用">
					    <el-switch 
					    	v-model="tableDetail.isUse"
					    	:active-value="1"
	    					:inactive-value="0"
					    ></el-switch>
					</el-form-item>
					
					<el-form-item label="参照时间" prop="ruleMethod">
						<el-radio-group v-model="tableDetail.ruleMethod">
					      	<el-radio :label="'1'" >入职后</el-radio>
					      	<el-radio :label="'2'">合同结束前</el-radio>
					      	<el-radio :label="'3'" >转正前</el-radio>
					    </el-radio-group>
					</el-form-item>
					
					<!--<el-form-item
					    v-for="(domain, index) in dynamicValidateForm.domains"
					    :label="'发送时间' + (index+1)"
					    :key="domain.key">-->
					    
					    <!--<el-select v-model="value" placeholder="请选择" class="selectTime">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>-->
					<el-form-item label="发送时间" required>
						<el-input-number v-model="tableDetail.distanceY" size="small" controls-position="right" :min="0" :max="10"></el-input-number>&nbsp;年&nbsp;
						<el-input-number v-model="tableDetail.distanceM" size="small" controls-position="right" :min="0" :max="11"></el-input-number>&nbsp;月&nbsp;
						<el-input-number v-model="tableDetail.distanceD" size="small" controls-position="right" :min="0" :max="31"></el-input-number>&nbsp;日&nbsp;&nbsp;
					
						<el-time-select
						  v-model="value3"
						  class="sentTime"
						  :picker-options="{
						    start: '08:00',
						    step: '00:15',
						    end: '20:00'
						  }"
						  placeholder="请选择时间">
						</el-time-select>
					    <!--<el-button type="text" v-if="index==0" size="small" @click="addDomain">新增</el-button>-->
					    <!--<el-button type="text" v-if="index>0" size="small" @click.prevent="removeDomain(domain)" class="delBtn">删除</el-button>-->
		
					</el-form-item>
					
					<!--<el-form-item label="备注" prop="describe">
						<el-input type="textarea" :rows="4" auto-complete="off"></el-input>
					</el-form-item>-->
		
				</el-form>
				</el-tab-pane>
				<el-tab-pane label="邮件模板编写" name="2">
					<quill-editor ref="myTextEditor"
			            v-model="tableDetail.modelContent"
			            :options="editorOption">
			        </quill-editor>
				</el-tab-pane>
			</el-tabs>
			
			
		</div>
		
	</section>
</template>

<script>
//	import util from '../../assets/js/util.js';
	import { quillEditor } from 'vue-quill-editor';
	import { getMenuList, getRuleDetail, editRule, addRule } from '../../api/api';
	
  	export default {
	    data() {
	     	return {
	      		rules: {
		        	ruleName: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
		        	ruleMethod: [{ required: true, message: '请选择参照时间', trigger: 'blur' }],
//		        	value3: [{ required: true, message: '请选择发送时间', trigger: 'blur' }],
		        },
		        saveLoading:false,
//		        sortForm:[],
		        tableDetail:[],
//		        year:0,
//		        month:0,
//		        day:"1",
//		        hours:18,
//		        minutes:15,
		        value3: null,
//		        dynamicValidateForm: {
//			        domains: [{
//			            value: ''
//			        }],
//			        email: ''
//			    },
			    value:"入职后",
			    editableTabsValue: '1',
//			    mailContent: `<h2 class="ql-align-center"><span class="ql-font-serif">邮件内容加载中..</span></h2>`,
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
		    },
		    ruleId: {
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
		      	this.$refs.tableDetail.validate((valid) => {
		          	if (valid) {
		          		this.saveLoading = true;
						let para = Object.assign({}, this.tableDetail);
						let arr = this.value3.split(':');
			  			para.sendingHourofday = arr[0];
			  			para.sendingMinofhour = arr[1];
						editRule(para).then((res) => {
							this.saveLoading = false;
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							this.$_onBack();
						});
			      	} 
		        });
		    },
		    $_onAdd:function(){
		    	this.$refs.tableDetail.validate((valid) => {
		          	if (valid) {
		          		if(this.value3){
		          			this.saveLoading = true;
							let para = Object.assign({}, this.tableDetail);
							let arr = this.value3.split(':');
				  			para.sendingHourofday = arr[0];
				  			para.sendingMinofhour = arr[1];
							addRule(para).then((res) => {
								this.saveLoading = false;
								this.$message({
									message: '新增成功',
									type: 'success'
								});
								this.$_onBack();
							});
						} else{
							this.$message('请选择发送时间');
						}
		          	}
				    	
		        });
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
	    	
//	    	//删除规则
//	    	removeDomain(item) {
//		        var index = this.dynamicValidateForm.domains.indexOf(item)
//		        if (index !== -1) {
//		          this.dynamicValidateForm.domains.splice(index, 1)
//		        }
//		    },
//		    //新增规则
//		    addDomain() {
//		        this.dynamicValidateForm.domains.push({
//		          value: '',
//		          key: Date.now()
//		        });
//		    }
	  	},
	  	watch:{
//	  		value3(){
//	  			let arr = this.value3.split(':');
//	  			this.hours = arr[0];
//	  			this.minutes = arr[1];
//	  		}
	  	},
	  	computed: {
	      	editor() {
	        	return this.$refs.myTextEditor.quill
	      	},
	    },
	    mounted() {
//	    	console.log(this.businessItem)
			if(this.businessItem){
				this.tableDetail = this.businessItem;
			}else{
				getRuleDetail({ruleId:this.ruleId}).then((res) => {
					this.tableDetail = res.data.resultEntity;
//					console.log(this.tableDetail);
					if(this.tableDetail.sendingMinofhour == 0){
						this.tableDetail.sendingMinofhour="00"
					}
		    		this.value3 = this.tableDetail.sendingHourofday +':'+ this.tableDetail.sendingMinofhour;
	//				setTimeout(() => {
	//		        	this.mailContent = this.tableDetail.modelContent;
	//		      	}, 300);
	//	      		console.log(this.tableDetail);
				});
			}
			
			
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
        top: 100px;
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
			width: 136px; /*105*/
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