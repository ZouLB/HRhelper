<template>
	<section>
		<div>
			<div class="head clearfix">
				<span>帮助</span>
			</div>
			<div class="content">
				<el-collapse v-model="activeName">
					<el-collapse-item title="一、系统介绍" name="1">
						<p>本系统的主要是实现品高软件股份有限公司人力资源部门日常业务（如入职提醒、绩效表提醒、转正提醒、工作年限祝贺、合同续签通知等）自动化，提高业务审批流程的速度，并有效降低人力资源部工作人员的工作量。</p>
					</el-collapse-item>
					<el-collapse-item title="二、规则生成说明" name="2">
						<p>本系统的业务管理，可以点击右上角的新增业务，来新增业务类型，包括新员工入职、试用期员工转正等等，而在生成业务类型的同时，可以设置该业务类型所对应的接口人，当设置完，接口人登陆系统则只能看到自己所负责的模块。</p>
						<p>而对于业务类型，则可对其进行新增规则操作，比如，对新员工入职提醒业务，则可对其新增“入职一天后发送提醒邮件”的规则，设置规则条数无限制，并可对其设置启用与否。</p>
					</el-collapse-item>
					<el-collapse-item title="三、工作流介绍" name="3" class="text">
						<h2>1、新员工入职提醒</h2>
						<div class="pic"><img src="../../assets/img/1.png" style="height: 230px;"/></div>
						<p>该流程为系统确认员工入职天数，发送对应的入职提醒邮件</p>
						<h2>2、试用期绩效表提醒</h2>
						<div class="pic"><img src="../../assets/img/2.png" style="height: 210px;"/></div>
						<p>该流程为系统确认试用期员工的招聘类型，每隔一段时间发送邮件提醒他们填写绩效表</p>
						<h2>3、试用期员工转正提醒</h2>
						<div class="pic"><img src="../../assets/img/3.png" style="height: 260px;"/></div>
						<p>该流程为系统确认员工试用期是否到期，发送邮件提醒部门经理审批是否允许该员工转正，当同意时，系统发送邮件提醒员工准备转正材料；不同意时，发生邮件通知HR；没回复时，邮件提醒HR去联系经理</p>
						<h2>4、工作年限贺卡提醒</h2>
						<div class="pic"><img src="../../assets/img/4.png" style="height: 220px;"/></div>
						<p>该流程为系统确认员工的工作年限，发送对应的年限祝贺贺卡给员工，并抄送其部门经理</p>
						<h2>5、员工续签合同提醒</h2>
						<div class="pic"><img src="../../assets/img/5.png" style="height: 260px;"/></div>
						<p>该流程为系统确认员工合同是否到期，邮件提醒部门经理是否同意续签。当部门经理同意时，邮件咨询员工是否续签；不同意时，则通知HR；没回复时，则邮件提醒HR联系经理。</p>
					</el-collapse-item>
					<el-collapse-item title="四、模板生成" name="4">
						<p>因为部分业务模板存在有动态信息，并且与收件人信息相关，因此对于邮件模板中的动态信息系统要求管理员采用特定格式的书写，用以保证其被正确的识别和替换。</p>
						<p>比如用户姓名，在模板编辑的时候，我们要填的则为：convert#name#，以此它会自动来获取用户姓名，下表是一些系统所需获取的信息，以及我们所要填写代替的内容：</p>
						<div class="table">
							<el-table
							    :data="tableData"
							    size="mini"
							    border
							    style="width: 100%">
							    <el-table-column
							      prop="title"
							      label="表示的信息"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="msg"
							      label="需要填写的内容">
							    </el-table-column>
							</el-table>
						</div>
						<p>注：截至日期用于提醒收件员工在截止日期前完成邮件内的工作内容；发送日期用于在邮件内容中展示邮件的发送日期。</p>
					</el-collapse-item>
					<el-collapse-item title="五、关于我们" name="5">
						<p>制作团队：幸福队</p>
						<p>团队成员：张勇翔、陈伟幸、邹柳冰、韩超超、吴卓伟、李富国</p>
						<p>联系电话：18826108872</p>
						<p>联系邮箱：zhangyx@bingosoft.net</p>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
	</section>

</template>

<style lang="scss" scoped="scoped">
	@import "src/assets/scss/_common.scss";
	
	.content{
		padding: 35px;
		bottom:22px;
		p{
			text-indent:2em;
			font: 14px/25px "微软雅黑";
			color: #909399;
		}
		h2{
			text-indent:1em;
			font: 14px/25px "微软雅黑";
			color: #606266;
			padding: 20px;
		}
		.pic{
			text-align: center;
			padding-bottom: 20px;
		}
		
		.text p{
			text-indent: 3em;
		}
		
		.table{
			width: 430px;
			height: 700px;
			margin: 20px auto;
		}
	}
</style>

<script>
  export default {
    data() {
      return {
        activeName: [],
        tableData: [{
          title: '姓名',
          msg: 'convert#name#'
        },{
          title: '邮箱地址',
          msg: 'convert#mail#'
        },{
          title: '所属部门',
          msg: 'convert#department#'
        },{
          title: '上级领导',
          msg: 'convert#manager#'
        },{
          title: '上级领导的邮箱地址',
          msg: 'convert#manager_mail#'
        },{
          title: '转正日期',
          msg: 'convert#fullmenber_day#'
        },{
          title: '拟转正日期',
          msg: 'convert#plan_fullmenber_day#'
        },{
          title: '入职日期',
          msg: 'convert#entry_day#'
        },{
          title: '招聘类型',
          msg: 'convert#recruit_class#'
        },{
          title: '签订合同的次数',
          msg: 'convert#sign_count#'
        },{
          title: '累计工作天数',
          msg: 'convert#day_of_work#'
        },{
          title: '累计工作月数',
          msg: 'convert#WorkMonth#'
        },{
          title: '累计工作年限',
          msg: 'convert#year_of_work#'
        },{
          title: '合同到期日',
          msg: 'convert#contract_day#'
        },{
          title: '签订合同类型',
          msg: 'convert#sign_class#'
        },{
          title: '截至日期',
          msg: 'convert#Deadline#'
        },{
          title: '发送日期',
          msg: 'convert#SendDate#'
        }
        ]
      };
    }
  }
</script>