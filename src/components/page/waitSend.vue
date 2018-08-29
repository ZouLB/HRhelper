<template>
	<section>
		<div v-if="!detailShow">
			<!--操作栏-->
			<div class="head clearfix">
				<span>待发送文件<i class="el-icon-arrow-right"></i>{{table_title}}</span>
				<el-button type="primary" size="small" @click="$_exportMail">导出</el-button>
				<el-button type="danger" size="small" plain @click="$_batchCancel">取消发送</el-button>
				<el-button type="primary" size="small" @click="$_getData()" class='search' plain>搜索</el-button>
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
				    <el-table-column property="department" label="所属部门"  show-overflow-tooltip sortable></el-table-column>
				    <el-table-column property="entryDay" label="入职时间" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--转正-->
				    <el-table-column v-if="table_title=='试用期转正'" property="planFullmenberDay" label="拟转正时间" width="130" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--绩效-->
				    <el-table-column v-if="table_title=='绩效表填写'" property="recruitClass" label="招聘类型" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--续签-->
				    <el-table-column v-if="table_title=='合同续签'" property="contractDay" label="合同结束日期" width="130" show-overflow-tooltip sortable></el-table-column>
				    
				    
				    <el-table-column property="mailName" label="邮件主题" show-overflow-tooltip></el-table-column>
				    <el-table-column property="recipient" label="收件人"  show-overflow-tooltip></el-table-column>
				    <el-table-column property="copyPeople" label="抄送人"  show-overflow-tooltip></el-table-column>
				    
				    <!--转正-->
				    <!--<el-table-column v-if="table_title=='转正提醒'" property="recipient" label="审核状态" width="80" show-overflow-tooltip></el-table-column>-->
				    
				    <el-table-column property="planSendTime" label="发送时间" width="145" show-overflow-tooltip sortable></el-table-column>
				    <el-table-column fixed="right" property="opera" label="操作" width="110">
				    	<template slot-scope="scope" >
				    		<!--<i v-if="table_title=='试用期转正'" class="el-icon-upload2" title="添加附件"></i>-->
				    		<i class="el-icon-hr-mail" title="查看邮件" @click="$_checkDetail(scope.row)"></i>
				    		<i class="el-icon-circle-plus-outline" title="添加抄送人" @click="$_addCopy(scope.row)"></i>
				    		<i class="el-icon-hr-cancel" title="取消发送" @click="$_cancel(scope.$index, scope.row)"></i>
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
		
		<!--添加抄送人-->
		<el-dialog :title="'添加抄送人'" :visible.sync="addFormVisible" :close-on-click-modal="false" width="400px">
			<!--<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
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
			</el-form>-->
		</el-dialog>
		
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
	import { getMailPage, cancelSendMail, batchCancelSendMail, getMenuList,mailExport } from '../../api/api';
	
  	export default {
	    data() {
	      return {
	      	table_title:null,
	      	listLoading:false,
	      	filters:{
	      		name:'',
	      		depart:'',
	      		date:'',
	      		recruit:''
	      	},
	        tableData: [],
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
	        special:null,
	        principal:"",//接口人
	        title:[],
	      	startTime:'',
	      	endTime:'',
	      	addFormVisible:false
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
		      	this.$_getData();
		    },
		    //初始化
		    $_initialize() {
		    	let index = this.$route.params.id;
		    	let tmpIndex = 0;
		    	getMenuList().then((res) => {
					this.title = res.data.resultEntity;
					tmpIndex = this.title.findIndex(function(item) {
				        return item.id == index;
				    });
			    	this.table_title = this.title[tmpIndex].operationName;
				});
				
		   		this.sortId = this.$route.params.id;
		   		this.special = this.$route.params.isSpecial;
		   		this.$_getData();
		    },
		    //获取数据
		    $_getData() {
				let para = {
					pageNum: this.page,
					pageSize: this.pageSize,
					status:0,
					isSpecial:this.special,
					operationId: this.sortId,
					employeeName:this.filters.name,
					department:this.filters.depart, 
					recruitClass:this.filters.recruit,
					
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
				
//				if(this.filters.date!=''&&this.table_title=="合同续签"){
//					para.contractDayStart = util.formatDate.format(this.filters.date[0], 'yyyy-MM-dd');
//					para.contractDayEnd = util.formatDate.format(this.filters.date[1], 'yyyy-MM-dd');
//				}else if(this.filters.date!=''&&this.table_title=="试用期转正"){
//					para.planFullmenberDayStart = util.formatDate.format(this.filters.date[0], 'yyyy-MM-dd');;
//					para.planFullmenberDayEnd = util.formatDate.format(this.filters.date[1], 'yyyy-MM-dd');
//				}else if(this.filters.date!=''){
//					para.entryDayStart = util.formatDate.format(this.filters.date[0], 'yyyy-MM-dd');
//					para.entryDayEnd = util.formatDate.format(this.filters.date[1], 'yyyy-MM-dd');
//				}
				
//				console.log(para)
				this.listLoading = true;
				getMailPage(para).then((res) => {
					this.total = res.resultEntity.total;
					this.tableData = res.resultEntity.list;
					if(res.resultEntity && res.resultEntity.list.length>0){
						this.principal = res.resultEntity.list[0].principal;
					}
					this.listLoading = false;
				});
			},
			//导出数据
			$_exportMail(){
				let para = {
					status:0,
					isSpecial:this.special,
					operationId: this.sortId,
					employeeName:this.filters.name,
					department:this.filters.depart, 
					recruitClass:this.filters.recruit,
					
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
				
				console.log(para)
				mailExport(para).then((response, status, request) => {
					var disp = request.getResponseHeader('Content-Disposition');
					console.log(disp)
			        if (disp && disp.search('attachment') != -1) {  //判断是否为文件
			            var form = $('<form method="POST" action="' + url + '">');
			            $.each(params, function(k, v) {
			                form.append($('<input type="hidden" name="' + k +
			                        '" value="' + v + '">'));
			            });
			            $('body').append(form);
			            form.submit(); //自动提交
			        }
				});
			},
			//添加抄送人
			$_addCopy(){
				this.addFormVisible = true;
			},
	    	//取消发送
	    	$_cancel:function(index,row){
	    		this.$confirm('取消后将不能恢复，确认取消发送吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { mailId: row.id };
					cancelSendMail(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '取消成功',
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
	    	//批量取消
	    	$_batchCancel() {
	    		var self = this;
			    if (this.tableSelect.length == 0) {
			        this.$alert("请选择需要取消发送的邮件", "提示", {
			            confirmButtonText: "确定",
			            type: "info"
			        });
			        return;
			    }
			    var ids = this.tableSelect.map(item => item.id).toString();
			    this.$confirm("取消后将不能恢复，确认取消发送所选邮件吗?", "提示", {
			        type: "warning"
			    })
			    .then(() => {
			    	this.listLoading = true;
					let para = { mailIds: ids };
					batchCancelSendMail(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '取消发送成功',
							type: 'success'
						});
						this.$_getData();
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