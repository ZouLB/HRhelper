<template>
	<section class="loginBox">
		<div class="header">
			<h3><span>HR</span>小助手─业务审批</h3>
		</div>
		
		<div class="container">
			<!--<el-table
			    ref="singleTable"
			    :data="tableData"
			    highlight-current-row
			    v-loading="listLoading"
			    stripe
			    border
			    size="mini"
			    tooltip-effect="dark"
			    header-cell-style="#000"
			    style="width: 100%;">
			    <el-table-column property="employeeName" label="审批人" width="80"></el-table-column>
			    <el-table-column property="employeeName" label="审批对象"></el-table-column>
			    <el-table-column property="employeeName" label="审批事由"></el-table-column>
			    <el-table-column property="employeeName" label="当前审批状态"></el-table-column>
			</el-table>-->
			<h2>审批详情</h2>
			<table border="" cellspacing="" cellpadding="">
				<tr>
					<th>审批对象</th>
					<th>审批事由</th>
					<th>审批人</th>
					<th>当前审批状态</th>
				</tr>
				<tr>
					<td>Data</td>
					<td>Data</td>
					<td>Data</td>
					<td>Data</td>
				</tr>
			</table>
			<div class="opera">
				<el-button type="primary" size="small" :loading="passLoading">通过</el-button>
				<el-button type="danger" size="small" :loading="rejectLoading">拒绝</el-button>
			</div>
		</div>
	</section>
</template>

<script>
//import { requestLogin } from '../../api/api';
  
  export default {
    data() {
      return {
        listLoading: false,
        passLoading: false,
        rejectLoading: false,
        tableData:[{
        	employeeName:'test'
        }]
      };
    },
    methods: {
    	
    },
    mounted(){
    	
    }
  }

</script>

<style lang="scss" scoped="scoped">

	@import "src/assets/scss/_login.scss";
	
	.container{
		width: 400px;
        height: 215px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        padding: 40px;
        border-radius: 8px;
        background-color: rgba(0,0,0,.3);
	}
	h2{
		color: white;
		font-size: 20px;
		text-align: center;
		margin-bottom: 35px;
	}
	table{
		width: 100%;
		color: white;
		td,th{
			font-size: 15px;
			border: 1px solid #fff;
			text-align: center;
			padding: 7px;
		}
	}
	.opera{
		margin: 30px 0;
		text-align: center;
	}
	.el-button:nth-of-type(1){
		margin-right: 20px;
	}
	
</style>