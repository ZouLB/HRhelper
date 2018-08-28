<template>
	<section>
		<div v-if="!detailShow">
			
			<!--操作栏-->
			<div class="head clearfix">
				<span>已发送文件<i class="el-icon-arrow-right"></i>{{table_title}}</span>
				<el-button type="primary" size="small">导出</el-button>
				<el-button type="danger" size="small" plain @click="$_batchDel">删除</el-button>
				<el-button type="primary" size="small" @click="$_getData()" class='search' plain>搜索</el-button>
				<!--<input type="text" placeholder="搜索" v-model="filters.name" @keyup="$_getData()"/>-->
				<el-input placeholder="员工姓名" clearable size="small" v-model="filters.name"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
				<el-input v-if="table_title!='合同续签'" placeholder="所属部门" clearable size="small" v-model="filters.depart"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
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
			    <el-select v-if="table_title=='绩效表填写'" v-model="filters.recruit" clearable placeholder="招聘类型">
				    <!--<el-option
				      v-for="item in sort"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>-->
				    <el-option label="社招" value="社招"></el-option>
				    <el-option label="校招" value="校招"></el-option>
				 </el-select>
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
				    <el-table-column property="employeeName" label="员工姓名" width="80" show-overflow-tooltip></el-table-column>
				    <el-table-column property="department" label="所属部门" show-overflow-tooltip sortable></el-table-column>
				    <el-table-column property="entryDay" label="入职时间" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--转正-->
				    <el-table-column v-if="table_title=='试用期转正'" property="planFullmenberDay" label="拟转正时间" width="115" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--绩效-->
				    <el-table-column v-if="table_title=='绩效表填写'" property="recruitClass" label="招聘类型" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--续签-->
				    <el-table-column v-if="table_title=='合同续签'" property="contractDay" label="合同结束日期" width="130" show-overflow-tooltip sortable></el-table-column>
				    
				    
				    <el-table-column property="mailName" label="邮件主题" show-overflow-tooltip></el-table-column>
				    <el-table-column property="recipient" label="收件人" width="80"  show-overflow-tooltip></el-table-column>
				    <el-table-column property="copyPeople" label="抄送人" width="80" show-overflow-tooltip></el-table-column>
				    
				    <!--转正-->
				    <el-table-column v-if="table_title=='试用期转正'" property="approveStatus" label="审核状态" width="80" show-overflow-tooltip></el-table-column>
				    
				    <el-table-column property="sendTime" label="发送时间" show-overflow-tooltip sortable></el-table-column>
				    <el-table-column fixed="right" property="opera" label="操作" width="80">
				    	<template slot-scope="scope" >
				    		<i class="el-icon-hr-mail" title="查看邮件" @click="$_checkDetail(scope.row)"></i>
				    		<i class="el-icon-delete" title="删除" @click="$_del(scope.$index, scope.row)"></i>
						</template>
				    </el-table-column>
				</el-table>
			</div>
			
			<div class="footer">
				<span>接口人：{{principal}}</span>
				<!--分页-->
				<el-pagination
					layout="total,sizes, prev, pager, next"
					@size-change="handleSizeChange"
					@current-change="handleCurrent"
					:current-page.sync="currentPage"
			     	:page-sizes="[20, 50, 100]"
					:total="total" style="float:right;">
				</el-pagination>
			</div>
			
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
	import { getMailPage, removeMail, batchRemoveMail,getMenuList} from '../../api/api';
	
  	export default {
	    data() {
	      return {
	      	table_title:null,
	      	filters:{
	      		name:'',
	      		depart:'',
	      		date:'',
	      		recruit:''
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
	        special:null,
	        principal:"",//接口人
	        title:['试用期转正','合同续签','绩效表填写','新员工入职提醒','年限贺卡提醒','工作年限贺卡'],
	      	startTime:'',
	      	endTime:'',
	      	approve:''
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
		    	let index = this.$route.params.id;
		    	getMenuList().then((res) => {
					this.title = res.data.resultEntity;
				});
				var tmpIndex = this.title.findIndex(function(item) {
			        return item.id == index;
			     });
		    	this.table_title = this.title[tmpIndex].operationName;
		   		this.sortId = this.$route.params.id;
		   		this.special = this.$route.params.isSpecial;
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
		      	this.$_getData();
		    },
		    //获取数据
		    $_getData() {
				let para = {
					pageNum: this.page,
					pageSize: this.pageSize,
					status:1,
					isSpecial:this.special,
					operationId: this.sortId,
					employeeName:this.filters.name,
					department:this.filters.depart, 
					recruitClass:this.filters.recruit
				};		
				
				if(this.filters.date!=null&&this.filters.date!=''){
					this.startTime = util.formatDate.format(this.filters.date[0], 'yyyy-MM-dd');
					this.endTime = util.formatDate.format(this.filters.date[1], 'yyyy-MM-dd');
					if(this.table_title=="合同续签"){
						para.contractDayStart =this.startTime
						para.contractDayEnd =this.endTime;
					}else if(this.table_title=="试用期转正"){
						para.planFullmenberDayStart = this.startTime;
						para.planFullmenberDayEnd = this.endTime;
					}else{
						para.entryDayStart = this.startTime;
						para.entryDayEnd = this.endTime;
					}	
				}else{
					if(this.table_title=="合同续签"){
						para.contractDayStart ='';
						para.contractDayEnd ='';
					}else if(this.table_title=="试用期转正"){
						para.planFullmenberDayStart = '';
						para.planFullmenberDayEnd = '';
					}else{
						para.entryDayStart = '';
						para.entryDayEnd = '';
					}	
				}
				
				this.listLoading = true;
				getMailPage(para).then((res) => {
					this.total = res.resultEntity.total;
					this.tableData = res.resultEntity.list;
					if(res.resultEntity && res.resultEntity.list.length>0){
						this.principal = res.resultEntity.list[0].principal;
					}
//					this.tableData.forEach(function(i){
//						if(i.approveStatus == 0){
//							this.approve = '审核中'
//						}else if(this.tableData.approveStatus == 1){
//							this.approve = '通过';
//						}else if(this.tableData.approveStatus == 2){
//							this.approve = '未通过';
//						}
//					})
//					
//					console.log(res.resultEntity.list)
					this.listLoading = false;
				});
			},
	    	//删除
	    	$_del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除邮件吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { mailId: row.id };
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
					let para = { mailIds: ids };
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
	   		table_title(){
	   			this.filters.name=''
		      	this.filters.depart=''
		      	this.filters.date=''
		      	this.filters.recruit=''
	   			this.$_initialize();
	   		}
	  	},
	  	components: {
	    	emailDetail
	  	}
	}
</script>

<style scoped="scoped" lang="scss">
	
	@import "src/assets/scss/_common.scss";
	
</style>