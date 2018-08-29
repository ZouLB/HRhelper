<template>
	<section>
		<div v-if="!editVisible">
		<div class="head clearfix editHead">
			<span><router-link to="/index/management/business">业务管理</router-link><i class="el-icon-arrow-right"></i>规则管理</span>
			<router-link to="/index/management/business"><el-button type="primary" size="small" plain >返回</el-button></router-link>
			<el-button type="primary" size="small" plain @click="$_addBus()">新增规则</el-button>
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
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="规则描述：">
			            <span>{{props.row.ruleSummary}}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column property="ruleName" label="规则名称"  show-overflow-tooltip></el-table-column>
			    <el-table-column property="operationName" label="业务类型" width="150" show-overflow-tooltip></el-table-column>
			    <!--<el-table-column property="ruleSummary" label="业务规则" ></el-table-column>-->			    
			   	<el-table-column property="principal" label="接口人" width="100" sortable></el-table-column>
			    <el-table-column property="createTime" label="创建时间" width="160" sortable></el-table-column>
			    <el-table-column property="updateTime" label="更新时间" width="160" sortable></el-table-column>
			    <el-table-column property="isUse" label="启用" width="100">
			    	<template slot-scope="scope" >
				    	<el-switch
							v-model="scope.row.isUse"
							:active-value="1"
	    					:inactive-value="0"
	    					@change="$_change(scope.row.id)">
						</el-switch>
					</template>
			    </el-table-column>
			    <!--<el-table-column
                label="权限" width="260px">
                  <template slot-scope="scope">
                    <el-radio-group class="radio" v-model="scope.row.authContent" @change="$_onAuthContentChange(scope.row)">
                      <el-radio :label="'ReadWrite'">完全</el-radio>
                      <el-radio :label="'CanUse'">编辑</el-radio>
                      <el-radio :label="'ReadOnly'">只读</el-radio>
                    </el-radio-group>
                  </template>
              </el-table-column>-->
			    <el-table-column property="operation" label="操作" width="100">
			    	<template slot-scope="scope" >
			    		<i class="el-icon-edit-outline" title="编辑" @click="$_checkBus(scope.row)"></i>
			    		<i class="el-icon-delete" title="删除" @click="$_del(scope.$index, scope.row)"></i>
					</template>
			    </el-table-column>
			</el-table>
		</div>
		</div>
		
		<transition name='fade' mode="out-in">
			<div class="child-view" v-if="editVisible">
	      		<business-edit :business-item.sync="selectedBus" :rule-id.sync="selectedRid" @on-back="$_onBack"></business-edit>
	    	</div>
	    </transition>
		
	</section>
</template>

<script>
	import businessEdit from "@/components/page/businessEdit";
	import { getRuleList, removeRule, changeStatus } from '../../api/api';
	
	export default{
		data() {
			return {
				filters:{
		      		name:''
		      	},
				listLoading:false,
				editVisible:false,
				selectedBus:null,
				selectedRid:null,
				currentRow:null,
		        tableData: [],
			}
		},
		 methods: {
	    	handleCurrentChange(val) {
		        this.currentRow = val;
		    },
		    //获取数据
		    $_getRule() {
		    	this.listLoading = true;
				getRuleList({operationId:this.$route.params.oid}).then((res) => {
					this.tableData = res.data.resultEntity;
					console.log(this.tableData)
					this.listLoading = false;
				});
			},
		    //删除
	    	$_del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除规则吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ruleId: row.id };
					removeRule(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$_getRule();
					});
					
				}).catch(() => {
					
				});
	    	},
	    	$_change:function(id){
				this.listLoading = true;
				let para = { ruleId: id };
				changeStatus(para).then((res) => {
					this.listLoading = false;
					this.$message({
						message: '修改成功',
						type: 'success'
					});
					this.$_getRule();
				});
	    	},
	    	$_onBack: function(resultUserInfo) {
		      	this.editVisible = false;
		      	this.$_getRule();
		    },
	    	$_checkBus(item){
				this.editVisible = true;
				this.selectedRid = item.id;
				this.selectedBus = null;
		    },
		    $_addBus(){
		    	this.editVisible = true;
				this.selectedBus = {
					attachmentHref:null,
					distanceD:0,
					distanceM:0,
					distanceY:0,
					isUse:0,
					modelContent:"",
					operationId:this.$route.params.oid,
					ruleMethod:"",
					ruleName:"",
					sendingHourofday:null,
					sendingMinofhour:null
				};
		    }
		},
		watch:{
//	   		'$route' (to, from){
//	   			this.editVisible = false;
//	   		}
	  	},
	  	mounted(){
	   		this.$_getRule();
		},
		components: {
		    businessEdit
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


