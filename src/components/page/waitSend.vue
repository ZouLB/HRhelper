<template>
	<section>
		<div v-if="!detailShow">
			<!--操作栏-->
			<div class="head clearfix">
				<span>待发送文件<i class="el-icon-arrow-right"></i>{{table_title}}</span>
				<el-button type="danger" size="small" plain @click="$_batchCancel">取消发送</el-button>
				<el-button type="primary" size="small" @click="$_getData()" class='search' plain>搜索</el-button>
				<!--<el-select v-model="filters.sortSearch" clearable placeholder="请选择类别">
				    <el-option
				      v-for="item in sort"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				 </el-select>-->
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
				    <el-table-column property="mailName" label="邮件主题" show-overflow-tooltip></el-table-column>
				    <el-table-column property="recipient" label="收件人" width="140" show-overflow-tooltip></el-table-column>
				    <el-table-column property="sender" label="接口人" width="140"></el-table-column>
				    <el-table-column property="copyPeople" label="抄送人" width="140"></el-table-column>
				    <el-table-column property="operation" label="类别" width="140" sortable></el-table-column>
				    <el-table-column property="sendTime" label="发送时间" width="150" sortable></el-table-column>
				    <el-table-column property="opera" label="操作" width="80">
				    	<template slot-scope="scope" >
				    		<i class="el-icon-hr-mail" title="查看邮件" @click="$_checkDetail(scope.row)"></i>
				    		<i class="el-icon-hr-cancel" title="取消发送" @click="$_cancel(scope.$index, scope.row)"></i>
						</template>
				    </el-table-column>
				</el-table>
			</div>
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
	import util from '../../assets/js/util.js';
	import emailDetail from "@/components/page/emailDetail";
//	, removeMail, batchRemoveMail 
	import { getMailPage} from '../../api/api';
	
  	export default {
	    data() {
	      return {
	      	table_title:null,
	      	listLoading:false,
	      	filters:{
	      		name:'',
	      		date:''
	      	},
	        tableData: [
//	        	{
//		          theme: '新员工入职提醒',
//		          recipient: '张三',
//		          interface: '李四',
//		          category: '入职提醒',
//		          copy_people: '王五',
//		          send_time: '2018-7-20  14:00'
//		        },
//		        {
//		          theme: '试用期绩效表提醒',
//		          recipient: '张三',
//		          interface: '李四',
//		          category: '绩效表提醒',
//		          copy_people: '王五',
//		          send_time: '2018-7-21  14:00'
//		        }
	        ],
	        pickerOptions2: {
	          shortcuts: [ {
	            text: '明天',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
	              end.setTime(start.getTime());
	              picker.$emit('pick', [start, end]);
	            }
	          },
	          {
	            text: '后两天',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
	              end.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
	              picker.$emit('pick', [start, end]);
	            }
	          }],
	        },
	        listLoading:false,
	        currentRow: null,
	        tableSelect: [],//表格所选
	        total:100,//分页
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
		    $_checkDetail(item){
				this.detailShow = true;
				this.selectedEmail = item;
		    },
		    $_onBack: function(resultUserInfo) {
		      	this.detailShow = false;
		    },
		    //初始化
		    $_initialize() {
		    	let index = this.$route.params.id;
		    	this.table_title = this.title[index];
		   		if(this.$route.params.id == 0){
		   			this.sortId = "";
		   		}else{
		   			this.sortId = this.$route.params.id;
		   		}
		   		this.$_getData();
		    },
		    //获取数据
		    $_getData() {
				let para = {
					pageNum: this.page,
					pageSize: this.pageSize,
					status:0,
					recipient: this.filters.name,
					operationId: this.sortId,
					satrtTime:"",
					endTime:""
				};
				if(this.filters.date!=''){
					para.satrtTime = util.formatDate.format(this.filters.date[0], 'yyyy-MM-dd');
					para.endTime = util.formatDate.format(this.filters.date[1], 'yyyy-MM-dd');
				}
				this.listLoading = true;
				getMailPage(para).then((res) => {
					this.total = res.data.total;
					this.tableData = res.data.users;
					this.listLoading = false;
				});
			},
	    	//取消发送
//	    	$_cancel:function(index,row){
//	    		this.$confirm('取消后将不能恢复，确认取消发送吗?', '提示', {
//					type: 'warning'
//				}).then(() => {
//					this.listLoading = true;
//					let para = { id: row.id };
//					removeMail(para).then((res) => {
//						this.listLoading = false;
//						this.$message({
//							message: '取消成功',
//							type: 'success'
//						});
//						this.$_getData();
//						//不调用接口删除的方式
////						let tmpIndex = this.tableData.findIndex(function(item) {
////					        return item.id == row.id;
////					    });
////					    if (tmpIndex > -1) {
////					        this.tableData.removeAt(tmpIndex);
////					    } 
//					});
//					
//				}).catch(() => {
//					
//				});
//	    	},
//	    	//批量取消
//	    	$_batchCancel() {
//	    		var self = this;
//			    if (this.tableSelect.length == 0) {
//			        this.$alert("请选择需要取消发送的邮件", "提示", {
//			            confirmButtonText: "确定",
//			            type: "info"
//			        });
//			        return;
//			    }
//			    var ids = this.tableSelect.map(item => item.id).toString();
//			    this.$confirm("取消后将不能恢复，确认取消发送所选邮件吗?", "提示", {
//			        type: "warning"
//			    })
//			    .then(() => {
//			    	this.listLoading = true;
//					let para = { ids: ids };
//					batchRemoveMail(para).then((res) => {
//						this.listLoading = false;
//						this.$message({
//							message: '取消发送成功',
//							type: 'success'
//						});
//						this.$_getData();
//					});
//			    })
//			    .catch(() => {});
//	    	},
	    	//分页
	    	handleCurrent(val) {
	    		this.currentPage = val;//页数高亮
				this.page = val;
				this.$_getData();
			},
			handleSizeChange(val) {
				this.pageSize = val
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