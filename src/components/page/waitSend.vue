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
				    <el-table-column property="department" label="所属部门" show-overflow-tooltip sortable min-width="90"></el-table-column>
				    <el-table-column property="entryDay" label="入职时间" show-overflow-tooltip sortable min-width="90"></el-table-column>
				    
				    <!--转正-->
				    <el-table-column v-if="table_title=='试用期转正'" property="planFullmenberDay" label="拟转正时间" width="130" show-overflow-tooltip sortable></el-table-column>
				    
				    <!--绩效-->
				    <el-table-column v-if="table_title=='绩效表填写'" property="recruitClass" label="招聘类型" show-overflow-tooltip sortable min-width="90"></el-table-column>
				    
				    <!--续签-->
				    <el-table-column v-if="table_title=='合同续签'" property="contractDay" label="合同结束日期" width="130" show-overflow-tooltip sortable></el-table-column>
				    
				    
				    <el-table-column property="mailName" label="邮件主题" show-overflow-tooltip></el-table-column>
				    <el-table-column property="recipient" label="收件人"  show-overflow-tooltip></el-table-column>
				    <el-table-column property="copyPeople" label="抄送人"  show-overflow-tooltip></el-table-column>
				    
				    <!--转正-->
				    <!--<el-table-column v-if="table_title=='转正提醒'" property="recipient" label="审核状态" width="80" show-overflow-tooltip></el-table-column>-->
				    
				    <el-table-column property="planSendTime" label="发送时间" width="145" show-overflow-tooltip sortable></el-table-column>
				    <el-table-column fixed="right" property="opera" label="操作" width="120">
				    	<template slot-scope="scope" >
				    		<!--<i v-if="table_title=='试用期转正'" class="el-icon-upload2" title="添加附件"></i>-->
				    		<i class="el-icon-hr-mail" title="查看邮件" @click="$_checkDetail(scope.row)"></i>
				    		<i class="el-icon-circle-plus-outline" title="添加抄送人" @click="$_addCopy(scope.row.id)"></i>
				    		<i v-if="table_title=='试用期转正'||table_title=='合同续签'" class="el-icon-document" title="附件管理" @click="$_addFile(scope.row.id)"></i>
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
		<el-dialog :title="'添加抄送人'" :visible.sync="addFormVisible" :close-on-click-modal="false" width="530px" id="addCopyDialog">
			<div class="el-transfer-panel">
				<p class="el-transfer-panel__header">
					<label role="checkbox" class="el-checkbox" aria-checked="mixed">
						<span class="el-checkbox__input">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
						</span>
						<span class="el-checkbox__label">选择抄送人<span>{{checkedEmployee.length}}/{{employee.length}}</span></span>
					</label>
				</p>
				<div class="el-transfer-panel__body">
					<div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
						<input type="text" v-model="searchName" autocomplete="off" placeholder="请输入员工姓名" class="el-input__inner" @keyup="$_getEmployee">
						<span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i></span>
					</div>
					<div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list is-filterable">
						<el-checkbox-group v-model="checkedEmployee" @change="handlecheckedEmployeeChange">
							<label  v-for="e in employee" class="el-checkbox el-transfer-panel__item is-checked">
						    	<el-checkbox :label="e" :key="e.name">{{e.name}}</el-checkbox>
							</label>
						</el-checkbox-group>
					</div>
					<p class="el-transfer-panel__empty" style="display: none;">无数据</p>
				</div>
			</div>
			<i class="el-icon-d-arrow-right"></i>
			<div class="el-transfer-panel panel2">
				<p class="el-transfer-panel__header">
					<label role="checkbox" class="el-checkbox" >
						<span class="el-checkbox__label">已选抄送人<span>{{checkedEmployee.length}}</span></span>
					</label>
				</p>
				<div class="el-transfer-panel__body">
					<div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">
						<!--<input type="text" autocomplete="off" placeholder="请输入员工姓名" class="el-input__inner">-->
						<!--<span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i></span>-->
					</div>
					<div role="group" class="el-checkbox-group el-transfer-panel__list is-filterable">
						<label  v-for="c in checkedEmployee" class="el-checkbox el-transfer-panel__item is-checked">
						    <i class="el-icon-error" @click="$_delEmployee(c.id)"></i>
							<span>{{c.name}}</span>
						</label>
					</div>
					<p class="el-transfer-panel__empty" v-if="checkedEmployee.length==0">暂未选择</p>
				</div>
			</div>
			<div class="opera">
				<el-button type="primary" size="small" :loading="editLoading" @click="$_addSubmit">确定</el-button>
				<el-button size="small" @click.native="addFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
		
		<!--添加附加-->
		<el-dialog :title="'附件管理'" :visible.sync="fileFormVisible" :close-on-click-modal="false" width="400px">
			<el-upload
			  class="upload-demo"
			  ref="upload"
			  drag
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :on-preview="handlePreview"
			  :before-remove="beforeRemove"
			  :on-remove="handleRemove"
			  :on-change="handleChange"
			  :file-list="fileList"
			  multiple>
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">添加附件：将文件拖到此处，或<em>点击上传</em></div>
			  <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
			  <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
			  <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
			</el-upload>
			
			<div class="opera">
				<el-button type="primary" size="small" :loading="editLoading" @click="$_test()">确定</el-button>
				<el-button size="small" @click.native="fileFormVisible = false">取消</el-button>
			</div>
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
	import { getMailPage, cancelSendMail, batchCancelSendMail, getMenuList, getAllEmployee, addCopy,getFile} from '../../api/api';
	
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
	        principal:"",//接口人
	        title:[],
	      	startTime:'',
	      	endTime:'',
	      	addFormVisible:false,
	      	
	      	//添加抄送人
	      	checkAll:false,
	      	checkedEmployee: [],
	      	checkedName:[],
	      	checkMail:[],
	        employee: [],
	        isIndeterminate: true,
	        searchName:"",
	        copyParams:{
	        	id:'',
	        	copyPeople:'',
	        	copyPeopleAddress:''
	        },
	        
	        //添加附件
	        fileFormVisible:false,
	        fileList: []
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
		   		this.$_getData();
		    },
		    //获取数据
		    $_getData() {
				let para = {
					pageNum: this.page,
					pageSize: this.pageSize,
					status:0,
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
				
				let exportUrl = '/http://10.200.202.36:8081/mail/export?';
			    Object.keys(para).map((key)=>{
			        exportUrl += key + '=' + para[key] +'&';    
			    })
			    exportUrl = exportUrl.substring(exportUrl.length-1,1)
				window.location.href = exportUrl;
//			    console.log(exportUrl);
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
		    
			//添加抄送人弹窗
			$_addCopy(mid){
				this.addFormVisible = true;
				this.$_getEmployee();
				this.copyParams.id = mid;
				this.checkedEmployee =[];
			},
			//获取公司人员
			$_getEmployee(){
				getAllEmployee({employeeName:this.searchName}).then((res) => {
					this.employee = res.data.resultEntity;
				})
			},
			//添加抄送人
			$_addSubmit(){
				this.checkedEmployee.forEach((item) => {
					this.copyParams.copyPeople+=item.name+',';
					this.copyParams.copyPeopleAddress+=item.mail+',';
				})
				this.copyParams.copyPeople = this.copyParams.copyPeople.slice(0,this.copyParams.copyPeople.length-1)
				this.copyParams.copyPeopleAddress = this.copyParams.copyPeopleAddress.slice(0,this.copyParams.copyPeopleAddress.length-1)
				addCopy(this.copyParams).then((res) => {
					this.$message({
						message: '添加成功',
						type: 'success'
					});
					this.addFormVisible = false;
					this.$_getData();
				})
			},
	    	//全选
	    	handleCheckAllChange(val) {
		        this.checkedEmployee = val ? this.employee : [];
		        this.isIndeterminate = false;
//		        console.log(this.employee)
		    },
		    handlecheckedEmployeeChange(value) {
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.employee.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.employee.length;
		    },
		    $_delEmployee(id){
		    	let index = this.checkedEmployee.findIndex((c) => c.id == id);
	            if (index >= 0) {
					this.checkedEmployee.splice(index,1);
					if(this.checkAll==true){
						this.checkAll=false;
						this.isIndeterminate=true;
					}
//	                console.log(this.checkedEmployee)
//	                console.log(this.employee)
//	                this.handleCheckAllChange(this.checkedEmployee)
	            }
		    },
			$_test(){
				this.fileFormVisible = false;
			},
			//附件管理
			$_addFile(mid){
				this.fileFormVisible = true;
				getFile({mailId:mid,ruleId:this.sortId}).then((res) => {
					if(res.data.resultEntity){
//						let test =  [{attachmentName: 'test1'}, {attachmentName: 'test2'}]
//						this.fileList: [{name: 'food.jpeg'}, {name: 'food2.jpeg'}]
						res.data.resultEntity.forEach((item,index) =>{
							this.fileList[index] = {name:item.attachmentName,id:item.attachmentId}
						})
						console.log(this.fileList)
					}
					
				})
				
				console.log(this.fileList)
//				this.fileList =[{name:'111'}]
			},
		    submitUpload() {
		        this.$refs.upload.submit();
		    },
		    beforeRemove(file, fileList) {
		        return this.$confirm(`确定移除 ${ file.name }？`)
//		        .then(() => {
////					let para = { mailIds: ids };
////					batchCancelSendMail(para).then((res) => {
////						this.listLoading = false;
////						this.$message({
////							message: '取消发送成功',
////							type: 'success'
////						});
////						this.$_getData();
////					});
//			    })
//			    .catch(() => {}););
		    },
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
		    handleChange(file, fileList) {
		    }
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
	
	.el-icon-error{
		color: #e4e4e4;
	}
	.el-transfer-panel__item:hover .el-icon-error{
		color: #409EFF;
	}
	.opera{
		text-align: center;
		margin-top: 20px;
	}
	.panel2{
		float: right;
	}
	.el-icon-d-arrow-right{
		font-size: 30px;
		margin-left: 16px;
	}
</style>