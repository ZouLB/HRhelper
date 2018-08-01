<template>
	<section id="busEdit">
		<div class="head clearfix">
			<span>业务编辑</span>
			<el-button type="primary" size="small" plain @click="$_onBack">返回</el-button>
			<el-button type="primary" size="small" @click="$_onSave" :loading="saveLoading">保存</el-button>
		</div>
		
		<el-form :model="businessItem" label-width="80px" ref="businessItem" :rules="rules">
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
			    :label="'规则' + index"
			    :key="domain.key"
			    :prop="'domains.' + index + '.value'"
			    prop="rule">
				<!--<span>入职后：</span>-->
				<el-input-number v-model="year" size="small" controls-position="right" :min="0" :max="10"></el-input-number>&nbsp;年&nbsp;
				<el-input-number v-model="month" size="small" controls-position="right" :min="0" :max="11"></el-input-number>&nbsp;月&nbsp;
				<el-input-number v-model="day" size="small" controls-position="right" :min="1" :max="31"></el-input-number>&nbsp;日&nbsp;
			    <el-button v-if="index==0" size="small" @click="addDomain">新增</el-button>
			    <el-button v-if="index>0" size="small" @click.prevent="removeDomain(domain)">删除</el-button>
			</el-form-item>
			
			<el-form-item label="发送时间">
				<el-time-picker
			    arrow-control
			    v-model="value3"
			    :picker-options="{
			      selectableRange: '09:00:00 - 19:00:00',
			      format: 'HH:mm'
			    }"
			    placeholder="请选择时间">
			 </el-time-picker>
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
		        hrForm:['张三','李四','王五'],
		        year:0,
		        month:0,
		        day:1,
		        value3: new Date(2016, 9, 10, 18, 40),
		        dynamicValidateForm: {
			        domains: [{
			            value: ''
			        }],
			        email: ''
			    }
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
	}
</script>

<style lang="scss" scoped="scoped">
	
	@import "src/assets/scss/_common.scss";
	
	.el-form{
        position: absolute;
        left: 200px;
        top: 120px;
        max-width: 510px;
        .el-select{
            width: 430px;
        }
        .el-input-number--small{
        	width: 70px;
        }
        .el-form-item span{
        	color: #666;
        }
		        
    }
    
    .el-form-item__content .el-button--primary:hover{
    	background-color: #0193C9;
	}
	
</style>