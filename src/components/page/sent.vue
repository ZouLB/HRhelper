<template>
	<section>
		<div v-show="!detailShow">
		<!--操作栏-->
		<div class="head clearfix">
			<span>已发送文件<i class="el-icon-arrow-right"></i>{{table_title}}</span>
			<el-button type="danger" size="small" plain @click="batchDel">批量删除</el-button>
			<el-button type="primary" size="small" @click="getData()" class='search' plain>搜索</el-button>
			<!--<input type="text" placeholder="搜索" v-model="filters.name" @keyup="getData()"/>-->
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
			    :v-loading="listLoading"
			    stripe
			    border
			    size="mini"
			    tooltip-effect="dark"
			    @current-change="handleCurrentChange"
			    @selection-change="$_handleSelectionChange"
			    style="width: 100%;">
			    <el-table-column type="selection" width="50"></el-table-column>
			    <el-table-column property="theme" label="邮件主题" show-overflow-tooltip></el-table-column>
			    <el-table-column property="recipient" label="收件人" width="140" show-overflow-tooltip></el-table-column>
			    <el-table-column property="interface" label="接口人" width="140"></el-table-column>
			    <el-table-column property="copy_people" label="抄送人" width="140"></el-table-column>
			    <el-table-column property="category" label="类别" width="140" sortable></el-table-column>
			    <el-table-column property="send_time" label="发送时间" width="140" sortable></el-table-column>
			    <el-table-column property="operation" label="操作" width="80">
			    	<template slot-scope="scope" >
			    		<i class="el-icon-hr-mail" title="查看邮件" @click="checkDetail(scope.row)"></i>
			    		<i class="el-icon-delete" title="删除" @click="del(scope.$index, scope.row)"></i>
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
			<div class="em-detail child-view" v-show="detailShow">
	      		<email-detail :email-item.sync="selectedEmail" @on-back="$_onBack"></email-detail>
	    	</div>
	    </transition>
	</section>
</template>

<script>
	import emailDetail from "@/components/page/emailDetail";
//	import { getList } from '../../api/api';
	
  	export default {
	    data() {
	      return {
	      	table_title:null,
	      	filters:{
	      		name:'',
	      		date:''
	      	},
	        tableData: [
	        	{
		          theme: '新员工入职提醒',
		          recipient: '张三',
		          interface: '李四',
		          category: '入职提醒',
		          copy_people: '王五',
		          send_time: '2018-7-18  14:00'
		        },
		        {
		          theme: '试用期绩效表提醒',
		          recipient: '张三',
		          interface: '李四',
		          category: '绩效表提醒',
		          copy_people: '王五',
		          send_time: '2018-7-18  14:00'
		        },
		        {
		          theme: '员工转正提醒',
		          recipient: '张三',
		          interface: '李四',
		          category: '转正提醒',
		          copy_people: '王五',
		          send_time: '2018-7-17  14:00'
		        }
	        ],
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
//	        project_id:'',
	        listLoading:false,
	        currentRow: null,
	        tableSelect: [],
//	        searchTag:'',
	        total:100,
	        page:1,
	        pageSize:20,
	        currentPage:1,
	        detailShow:false,
	        selectedEmail:null,
	      }
	    },
	    methods: {
	    	handleCurrentChange(val) {
		        this.currentRow = val;
		    },
		    $_handleSelectionChange(selection) {
		      this.tableSelect = selection;
		    },
		    checkDetail(item){
				this.detailShow = true;
				this.selectedEmail = item;
		    },
		    $_onBack: function(resultUserInfo) {
		      	this.detailShow = false;
		    },
		    
		    //获取数据
//		    getData() {
//				let para = {
//					page: this.page,
//					name: this.filters.name
//				};
//				this.listLoading = true;
//				getUserListPage(para).then((res) => {
//					this.total = res.data.total;
//					this.tableData = res.data.users;
//					this.listLoading = false;
//				});
//			},
	    	//删除
	    	del:function(index,row){
	    		this.$confirm('删除后将不能恢复，确认删除邮件吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					
					
				}).catch(() => {
					
				});
	    	},
	    	//批量删除
	    	batchDel() {
	    		var self = this;
			    if (this.tableSelect.length == 0) {
			        this.$alert("请选择需要删除的邮件", "提示", {
			            confirmButtonText: "确定",
			            type: "info"
			        });
			        return;
			    }
			    this.$confirm("删除后将不能恢复，确认删除所选邮件吗?", "提示", {
			        type: "warning"
			    })
			       	.then(() => {
			        })
			        .catch(() => {});
	    	},
	    	//分页
	    	handleCurrent(val) {
	    		this.currentPage = val;//页数高亮
				this.page = val;
			},
			handleSizeChange(val) {
				this.pageSize = val
		    },
	    	
	    },
	    mounted(){
	   		this.table_title = this.$route.params.title;
		},
		watch:{
	   		'$route' (to, from){
	   			this.table_title = this.$route.params.title;
	   			this.detailShow = false;
	   		},
	  },
	  components: {
	    emailDetail
	  }
	}
</script>

<style scoped="scoped" lang="scss">
	
	@import "src/assets/scss/common.scss";
	@import "src/assets/scss/animation.scss";
	
</style>