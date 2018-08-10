<template>
	<section>
		<div v-if="!editVisible">
		<div class="head clearfix editHead">
			<span>规则管理</span>
			<el-button type="primary" size="small" plain @click="$_addBus">新增规则</el-button>
			<!--<el-button type="primary" size="small" class='search' plain>搜索</el-button>-->
			<!--<el-input placeholder="请输入业务名称" clearable size="small" v-model="filters.name"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>-->
		</div>
		
		<div class="content">
			<el-table
			    ref="singleTable"
			    :data="tableData"
			    highlight-current-row
			    :v-loading="listLoading"
			    stripe
			    border
			    size="mini"
			    tooltip-effect="dark"
			    @current-change="handleCurrentChange"
			    style="width: 100%;">
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="备注">
			            <span>1</span>
			          </el-form-item>
			          <!--<el-form-item label="业务描述">
			            <span></span>
			          </el-form-item>-->
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column property="name" label="规则名称" width="180" show-overflow-tooltip></el-table-column>
			    <el-table-column property="name" label="业务类型" width="150" show-overflow-tooltip></el-table-column>
			    <el-table-column property="rule" label="业务规则" ></el-table-column>			    
			   	<el-table-column property="principal" label="接口人" width="100" sortable></el-table-column>
			    <el-table-column property="time" label="更新时间" width="140" sortable></el-table-column>
			    <!--<el-table-column property="c" label="启用" width="140">
			    	<template slot-scope="scope" >
				    	<el-switch
							v-model="tableData.d"
							active-value="100"
	    					inactive-value="0">
						</el-switch>
					</template>
			    </el-table-column>
			    <el-table-column
                label="权限" width="260px">
                  <template slot-scope="scope">
                    <el-radio-group class="radio" v-model="scope.row.authContent" @change="$_onAuthContentChange(scope.row)">
                      <el-radio :label="'ReadWrite'">完全</el-radio>
                      <el-radio :label="'CanUse'">编辑</el-radio>
                      <el-radio :label="'ReadOnly'">只读</el-radio>
                    </el-radio-group>
                  </template>
              </el-table-column>-->
			    <el-table-column property="operation" label="操作" width="80">
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
	      		<business-edit :business-item.sync="selectedBus" @on-back="$_onBack"></business-edit>
	    	</div>
	    </transition>
		
	</section>
</template>

<script>
	import businessEdit from "@/components/page/businessEdit";
	
	export default{
		data() {
			return {
				filters:{
		      		name:''
		      	},
				listLoading:false,
				editVisible:false,
				selectedBus:null,
				currentRow:null,
		        tableData: [
		        	{
			          name: '新员工入职提醒',
			          principal: ['张三'],
			          rule: '发送邮件的时间为员工入职后：一日',
			          time:'2018-7-30 16:00',
			          d: '入职提醒',
			        },
			        {
			          name: '工作满一年贺卡',
			          principal: ['张三 ','李四'],
			          rule: '发送邮件的时间为员工入职后：一年',
			          time:'2018-7-30 16:00',
			          d: '工作年限贺卡',
			        },
		        ],
			}
		},
		 methods: {
	    	handleCurrentChange(val) {
		        this.currentRow = val;
		    },
		    //删除
	    	$_del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除规则吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					
					
				}).catch(() => {
					
				});
	    	},
	    	$_onBack: function(resultUserInfo) {
		      	this.editVisible = false;
		    },
	    	$_checkBus(item){
				this.editVisible = true;
				this.selectedBus = item;
		    },
		    $_addBus(){
		    	this.editVisible = true;
				this.selectedBus = {};
		    }
		},
		watch:{
//	   		'$route' (to, from){
//	   			this.editVisible = false;
//	   		}
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
	
</style>


