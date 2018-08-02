<template>
	<section>
		<div v-if="!detailShow">
			
			<!--操作栏-->
			<div class="head clearfix">
				<span>已发送文件<i class="el-icon-arrow-right"></i>{{table_title}}</span>
				<el-button type="danger" size="small" plain @click="$_batchDel">批量删除</el-button>
				<el-button type="primary" size="small" @click="$_getData()" class='search' plain>搜索</el-button>
				<!--<input type="text" placeholder="搜索" v-model="filters.name" @keyup="$_getData()"/>-->
				<el-input placeholder="请输入收件人" clearable size="small" v-model="filters.name"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				<el-date-picker
			      v-model="filters.date"
			      type="daterange"
			      align="right"
			      unlink-panels
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      :picker-options="pickerOptions2">
			    </el-date-picker>
			</div>
			
			<!--表格-->
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
				    @selection-change="handleSelectionChange"
				    style="width: 100%;">
				    <el-table-column type="selection" width="50"></el-table-column>
				    <el-table-column property="mail_name" label="邮件主题" show-overflow-tooltip></el-table-column>
				    <el-table-column property="recipient" label="收件人" width="140" show-overflow-tooltip></el-table-column>
				    <el-table-column property="sender" label="接口人" width="140"></el-table-column>
				    <el-table-column property="copy_people" label="抄送人" width="140"></el-table-column>
				    <el-table-column property="operation_id" label="类别" width="140" sortable></el-table-column>
				    <el-table-column property="send_time" label="发送时间" width="150" sortable></el-table-column>
				    <el-table-column property="operation" label="操作" width="80">
				    	<template slot-scope="scope" >
				    		<i class="el-icon-hr-mail" title="查看邮件" @click="$_checkDetail(scope.row)"></i>
				    		<i class="el-icon-delete" title="删除" @click="$_del(scope.$index, scope.row)"></i>
						</template>
				    </el-table-column>
				</el-table>
			</div>
			
			<!--分页-->
			<el-pagination
				layout="sizes, prev, pager, next"
				@size-change="handleSizeChange"
				@current-change="handleCurrent"
				:current-page.sync="currentPage"
		     	:page-sizes="[20, 50, 100]"
				:total="total" style="float:right;">
			</el-pagination>
		</div>
		
		<transition name='fade' mode="out-in">
			<div class="em-detail child-view" v-if="detailShow">
	      		<email-detail :email-item.sync="selectedEmail" @on-back="$_onBack"></email-detail>
	    	</div>
	    </transition>
	</section>
</template>

<script>
	import emailDetail from "@/components/page/emailDetail";
	import { getMailPage, removeMail, batchRemoveMail } from '../../api/api';
	
  	export default {
	    data() {
	      return {
	      	table_title:null,
	      	filters:{
	      		name:'',
	      		date:''
	      	},
	        tableData: [],
	        pickerOptions2: {
	          shortcuts: [ {
	            text: '今天',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime());
	              picker.$emit('pick', [start, end]);
	            }
	          },
	          {
	            text: '最近一周',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', [start, end]);
	            }
	          }, {
	            text: '最近一个月',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
	              picker.$emit('pick', [start, end]);
	            }
	          }],
	        },
	        listLoading:false,
	        currentRow: null,
	        tableSelect: [],
	        total:100,
	        page:1,
	        pageSize:20,
	        currentPage:1,
	        detailShow:false,
	        selectedEmail:null,
	        sortId:null,
	        title:['所有分类','入职提醒','绩效表提醒','转正提醒','续签合同','工作年限贺卡'],
	      }
	    },
	    methods: {
	    	handleCurrentChange(val) {
		        this.currentRow = val;
		    },
		    handleSelectionChange(selection) {
		      this.tableSelect = selection;
		    },
		    //初始化
		    $_initialize() {
		    	let index = this.$route.params.index;
		    	this.table_title = this.title[index];
		   		if(this.$route.params.id == 0){
		   			this.sortId = "";
		   		}else{
		   			this.sortId = this.$route.params.id;
		   		}
		   		this.$_getData();
		    },
		    //进入邮件详情
		    $_checkDetail(item){
				this.detailShow = true;
				this.selectedEmail = item;
		    },
		    //返回
		    $_onBack: function(resultUserInfo) {
		      	this.detailShow = false;
		    },
		    //获取数据
		    $_getData() {
				let para = {
					page: this.page,
					pageSize: this.pageSize,
					name: this.filters.name,
					sort: this.sortId 
				};
				this.listLoading = true;
				getMailPage(para).then((res) => {
					this.total = res.data.total;
					this.tableData = res.data.users;
					this.listLoading = false;
				});
			},
	    	//删除
	    	$_del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除邮件吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeMail(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$_getData();
						//不调用接口删除的方式
//						let tmpIndex = this.tableData.findIndex(function(item) {
//					        return item.id == row.id;
//					    });
//					    if (tmpIndex > -1) {
//					        this.tableData.removeAt(tmpIndex);
//					    } 
					});
					
				}).catch(() => {
					
				});
	    	},
	    	//批量删除
	    	$_batchDel() {
	    		var self = this;
			    if (this.tableSelect.length == 0) {
			        this.$alert("请选择需要删除的邮件", "提示", {
			            confirmButtonText: "确定",
			            type: "info"
			        });
			        return;
			    }
			    var ids = this.tableSelect.map(item => item.id).toString();//用逗号隔开的字符串
			    this.$confirm("删除后将不能恢复，确认删除所选邮件吗?", "提示", {
			        type: "warning"
			    })
			    .then(() => {
			    	this.listLoading = true;
					let para = { ids: ids };
					batchRemoveMail(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.$_getData();
						
//						let temIndex = this.tableData.findIndex(function(item){
//							return item.id = this.tableSelect.id
//						})
					});
			    })
			    .catch(() => {});
	    	},
	    	//分页
	    	handleCurrent(val) {
	    		this.currentPage = val;//页数高亮
				this.page = val;
				this.$_getData();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.$_getData();
		    },
	    	
	    },
	    mounted(){
	   		this.$_initialize();
		},
		watch:{
	   		'$route' (to, from){
	   			this.$_initialize();
	   			this.detailShow = false;
	   		},
	  	},
	  components: {
	    emailDetail
	  }
	}
</script>

<style scoped="scoped" lang="scss">
	
	@import "src/assets/scss/_common.scss";
	/*@import "src/assets/scss/animation.scss";*/
	
</style>