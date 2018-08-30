<template>
	<section>
		<div class="head clearfix editHead">
			<span>业务管理</span>
			<el-button type="primary" size="small" plain @click="$_addBus">新增业务</el-button>
			<!--<el-button type="primary" size="small" class='search' plain>搜索</el-button>-->
			<!--<el-input placeholder="请输入业务名称" clearable size="small" v-model="filters.name"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>-->
		</div>
		
		<div class="content">
			<el-table
			    ref="singleTable"
			    :data="tableData"
			    highlight-current-row
			    v-loading="listLoading"
			    stripe
			    border
			    size="mini"
			    tooltip-effect="dark"
			    @current-change="handleCurrentChange"
			    style="width: 100%;">
			    <!--<el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="备注">
			            <span>1</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>-->
			    <el-table-column property="operationName" label="业务名称"  show-overflow-tooltip></el-table-column>	    
			   	<el-table-column property="principal" label="接口人" width="100" sortable></el-table-column>
			    <el-table-column property="createTime" label="创建时间" width="160" sortable></el-table-column>
			    <el-table-column property="updateTime" label="更新时间" width="160" sortable></el-table-column>
			  
			    <el-table-column property="operation" label="操作" width="120">
			    	<template slot-scope="scope" >
			    		<i class="el-icon-edit-outline" title="编辑" @click="$_editBus(scope.row)"></i>
			    		<router-link :to="'rules/'+scope.row.id"><i class="el-icon-setting" title="规则管理"></i></router-link>
			    		<i class="el-icon-delete" title="删除" @click="$_del(scope.$index, scope.row)"></i>
					</template>
			    </el-table-column>
			</el-table>
		</div>
		
		<!--新建业务弹窗-->
		<el-dialog :title="'新增业务'" :visible.sync="addFormVisible" :close-on-click-modal="false" width="400px">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="业务名称" prop="operationName">
					<el-input v-model="addForm.operationName" auto-complete="off" placeholder="请输入业务名称"></el-input>
				</el-form-item>
				<el-form-item label="接口人" prop="userId">
					<el-select v-model="addForm.userId" placeholder="请选择接口人">
					    <el-option v-for="(item,i) in hrForm" :key="i" :label="item.username" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 0;"> 
					<el-button type="primary" :loading="addLoading" @click="$_addSubmit">确定</el-button>
					<el-button @click.native="addFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		<!--编辑业务弹窗-->
		<el-dialog :title="'编辑业务'" :visible.sync="editFormVisible" :close-on-click-modal="false" width="400px">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="业务名称" prop="operationName">
					<el-input v-model="editForm.operationName" auto-complete="off" placeholder="请输入业务名称"></el-input>
				</el-form-item>
				<el-form-item label="接口人" prop="userId">
					<el-select v-model="editForm.userId" placeholder="请选择接口人">
					    <el-option v-for="(item,i) in hrForm" :key="i" :label="item.username" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 0;"> 
					<el-button type="primary" :loading="editLoading" @click="$_editSubmit">确定</el-button>
					<el-button @click.native="editFormVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
		
		
	</section>
</template>

<script>
	import { getBusList, getHR, addBus, removeBus, editBus } from '../../api/api';
	
	export default{
		data() {
			return {
//				filters:{
//		      		name:''
//		      	},
				listLoading:false,
				addLoading:false,
				editLoading:false,
//				selectedBus:null,
				currentRow:null,
		        tableData: [],
		        hrForm: [],
		        addFormVisible:false,
		        editFormVisible:false,
//		        type:'add',
		        addForm: {
					operationName:'',
					userId:''
				},
				editForm:{},
				addFormRules: {
		        	operationName: [{ required: true, message: '请输入业务名称', trigger: 'blur' }],
		        	userId: [{ required: true, message: '请选择接口人', trigger: 'blur' }]
		       },
		       editFormRules: {
		        	operationName: [{ required: true, message: '请输入业务名称', trigger: 'blur' }],
		        	userId: [{ required: true, message: '请选择接口人', trigger: 'blur' }]
		       	}
			}
		},
		 methods: {
	    	handleCurrentChange(val) {
		        this.currentRow = val;
		    },
		    //获取数据
		    $_getBus() {
		    	this.listLoading = true;
				getBusList().then((res) => {
					this.tableData = res.data.resultEntity;
					this.listLoading = false;
				});
			},
		    //删除
	    	$_del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除业务吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { operationId: row.id };
					removeBus(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$_getBus();
					});
					
				}).catch(() => {
					
				});
	    	},
//	    	$_onBack: function(resultUserInfo) {
//		      	this.editVisible = false;
//		    },
//	    	$_checkBus(item){
//				this.editVisible = true;
//				this.selectedBus = item;
//		    },
			$_addSubmit() {
				this.$refs.addForm.validate((valid) => {
		          	if (valid) {
						addBus(this.addForm).then((res) => {
							this.addLoading = true;
							this.$message({
								message: '新增成功',
								type: 'success'
							});
							this.addLoading = false;
							this.addFormVisible = false;
							this.$_getBus();
						})
					} 
		        });
			},
			$_editSubmit() {
				this.$refs.editForm.validate((valid) => {
		          	if (valid) {
						let para = {
							id:this.editForm.id,
							operationName:this.editForm.operationName,
							userId:this.editForm.userId
						}
				    	editBus(para).then((res) => {
					    	this.addLoading=true;
							this.$message({
								message: '编辑成功',
								type: 'success'
							});
							this.editLoading=false;
							this.editFormVisible = false;
							this.$_getBus();
						})
				    } 
		        });
		    },
		    $_addBus(){
		    	this.addFormVisible = true;
		    	if(this.$refs["addForm"]){
		    		this.$refs["addForm"].resetFields()
		    	}
//		    	this.type="add";
		    	this.addForm = {};
		    },
		    $_editBus(item){
		    	this.editFormVisible = true;
//		    	this.type="edit";
		    	this.editForm = item;
		    }
		},
		watch:{
//	   		'$route' (to, from){
//	   			this.editVisible = false;
//	   		}
	  	},
	  	mounted(){
	  		getHR().then((res) => {
				this.hrForm = res.data.resultEntity;
			});
	   		this.$_getBus();
		}
	}
	
</script>

<style lang="scss" scoped="scoped">
	
	@import "src/assets/scss/_common.scss";
	
	.editHead.head .el-input--small{
		right: 100px;
	}
	.content{
		bottom: 22px;
	}
	
</style>


