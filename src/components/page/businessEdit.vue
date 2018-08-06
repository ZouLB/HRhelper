<template>
	<section id="busEdit">
		<div class="head clearfix">
			<span>业务编辑</span>
			<el-button type="primary" size="small" plain @click="$_onBack">返回</el-button>
			<el-button type="primary" size="small" @click="$_onSave" :loading="saveLoading">保存</el-button>
		</div>
		
		<el-form :model="businessItem" label-width="90px" ref="businessItem" :rules="rules">
			<el-form-item label="业务名称" prop="name">
				<el-input v-model="businessItem.name" auto-complete="off" placeholder="请输入业务名称"></el-input>
			</el-form-item>
			<el-form-item label="接口人" prop="principal">
				<el-select v-model="businessItem.principal" multiple filterable allow-create default-first-option placeholder="请选择或输入负责人">
					<el-option v-for="(item,i) in hrForm" :key="i" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<!--<el-form-item label="业务规则" prop="rule">
				<span>发送邮件的时间为员工入职后：</span></br>
				<el-input-number v-model="year" size="small" controls-position="right" :min="0" :max="10"></el-input-number>&nbsp;年&nbsp;
				<el-input-number v-model="month" size="small" controls-position="right" :min="0" :max="11"></el-input-number>&nbsp;月&nbsp;
				<el-input-number v-model="day" size="small" controls-position="right" :min="1" :max="31"></el-input-number>&nbsp;日&nbsp;
			</el-form-item>-->
			
			<el-form-item
			    v-for="(domain, index) in dynamicValidateForm.domains"
			    :label="'发送时间' + (index+1)"
			    :key="domain.key">
			    <el-radio-group v-model="value">
			      	<el-radio label="入职后"></el-radio>
			      	<el-radio label="转正前"></el-radio>
			      	<el-radio label="离职前"></el-radio>
			    </el-radio-group>
			    
			    </br>
			    
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
				<el-input-number v-model="day" size="small" controls-position="right" :min="1" :max="31"></el-input-number>&nbsp;日&nbsp;&nbsp;
				<!--<el-input v-model="day" size="small" class="sentTime"></el-input>时&nbsp;
				<el-input v-model="day" size="small" class="sentTime"></el-input>分&nbsp;-->
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
			    <el-button type="text" v-if="index==0" size="small" @click="addDomain">新增</el-button>
			    <el-button type="text" v-if="index>0" size="small" @click.prevent="removeDomain(domain)" class="delBtn">删除</el-button>

			</el-form-item>
			
			<el-form-item label="业务描述" prop="describe">
				<el-input type="textarea" :rows="5" auto-complete="off"></el-input>
			</el-form-item>

		</el-form>
	</section>
</template>

<script>
	import util from '../../assets/js/util.js'
	
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
			    value:"入职后"
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
	  	mounted(){
	  		this.value3 = this.hours +':'+ this.minutes;
	  	},
	  	watch:{
	  		value3(){
	  			let arr = this.value3.split(':');
	  			this.hours = arr[0];
	  			this.minutes = arr[1];
	  		}
	  	},
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
        top: 120px;
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
	
</style>