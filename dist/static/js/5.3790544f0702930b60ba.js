webpackJsonp([5],{Cq8e:function(t,e){},LLmL:function(t,e){},R65K:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});l("LOkV");var a={data:function(){return{table_title:null,filters:{name:"",date:"",sortSearch:""},tableData:[],pickerOptions2:{shortcuts:[{text:"今天",onClick:function(t){var e=new Date,l=new Date;l.setTime(l.getTime()),t.$emit("pick",[l,e])}},{text:"最近一周",onClick:function(t){var e=new Date,l=new Date;l.setTime(l.getTime()-6048e5),t.$emit("pick",[l,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,l=new Date;l.setTime(l.getTime()-2592e6),t.$emit("pick",[l,e])}}]},listLoading:!1,currentRow:null,tableSelect:[],total:100,page:1,pageSize:20,currentPage:1,detailShow:!1,selectedEmail:null,sortId:null,title:["所有分类","入职提醒","绩效表提醒","转正提醒","续签合同","工作年限贺卡"]}},methods:{handleCurrentChange:function(t){this.currentRow=t},handleSelectionChange:function(t){this.tableSelect=t},$_initialize:function(){var t=this.$route.params.id;this.table_title=this.title[t],0==this.$route.params.id?this.sortId="":this.sortId=this.$route.params.id},$_checkDetail:function(t){this.detailShow=!0,this.selectedEmail=t},$_onBack:function(t){this.detailShow=!1},handleCurrent:function(t){this.currentPage=t,this.page=t},handleSizeChange:function(t){this.pageSize=t}},mounted:function(){this.$_initialize()},watch:{$route:function(t,e){this.$_initialize(),this.detailShow=!1},table_title:function(){this.$_initialize()}},components:{emailDetail:l("sDdn").a}},i={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",[t.detailShow?t._e():l("div",[l("div",{staticClass:"head clearfix"},[l("span",[t._v("已发送文件"),l("i",{staticClass:"el-icon-arrow-right"}),t._v(t._s(t.table_title))]),t._v(" "),l("el-button",{attrs:{type:"primary",size:"small"}},[t._v("导出")]),t._v(" "),l("el-button",{attrs:{type:"danger",size:"small",plain:""},on:{click:t.$_batchDel}},[t._v("删除")]),t._v(" "),l("el-button",{staticClass:"search",attrs:{type:"primary",size:"small",plain:""},on:{click:function(e){t.$_getData()}}},[t._v("搜索")]),t._v(" "),l("el-input",{attrs:{placeholder:"员工姓名",clearable:"",size:"small"},model:{value:t.filters.name,callback:function(e){t.$set(t.filters,"name",e)},expression:"filters.name"}},[l("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),t._v(" "),"续签合同"!=t.table_title?l("el-input",{attrs:{placeholder:"所属部门",clearable:"",size:"small"},model:{value:t.filters.name,callback:function(e){t.$set(t.filters,"name",e)},expression:"filters.name"}},[l("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]):t._e(),t._v(" "),l("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions2},model:{value:t.filters.date,callback:function(e){t.$set(t.filters,"date",e)},expression:"filters.date"}}),t._v(" "),"绩效表提醒"==t.table_title?l("el-select",{attrs:{clearable:"",placeholder:"招聘类型"},model:{value:t.filters.sortSearch,callback:function(e){t.$set(t.filters,"sortSearch",e)},expression:"filters.sortSearch"}},[l("el-option",{attrs:{label:"社招",value:"社招"}}),t._v(" "),l("el-option",{attrs:{label:"校招",value:"校招"}})],1):t._e()],1),t._v(" "),l("div",{staticClass:"content"},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"",stripe:"",border:"",size:"mini","tooltip-effect":"dark"},on:{"current-change":t.handleCurrentChange,"selection-change":t.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection",width:"50"}}),t._v(" "),l("el-table-column",{attrs:{property:"recipient",label:"员工姓名",width:"80","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{property:"recipient",label:"所属部门",width:"130","show-overflow-tooltip":"",sortable:""}}),t._v(" "),l("el-table-column",{attrs:{property:"recipient",label:"入职时间",width:"130","show-overflow-tooltip":"",sortable:""}}),t._v(" "),"转正提醒"==t.table_title?l("el-table-column",{attrs:{property:"recipient",label:"拟转正时间",width:"130","show-overflow-tooltip":"",sortable:""}}):t._e(),t._v(" "),"绩效表提醒"==t.table_title?l("el-table-column",{attrs:{property:"recipient",label:"招聘类型",width:"105","show-overflow-tooltip":"",sortable:""}}):t._e(),t._v(" "),"续签合同"==t.table_title?l("el-table-column",{attrs:{property:"recipient",label:"合同结束日期",width:"130","show-overflow-tooltip":"",sortable:""}}):t._e(),t._v(" "),l("el-table-column",{attrs:{property:"mailName",label:"邮件主题","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{property:"recipient",label:"收件人",width:"80","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{property:"copyPeople",label:"抄送人",width:"80","show-overflow-tooltip":""}}),t._v(" "),"转正提醒"==t.table_title?l("el-table-column",{attrs:{property:"recipient",label:"审核状态",width:"80","show-overflow-tooltip":""}}):t._e(),t._v(" "),l("el-table-column",{attrs:{property:"sendTime",label:"发送时间",width:"150","show-overflow-tooltip":"",sortable:""}}),t._v(" "),l("el-table-column",{attrs:{fixed:"right",property:"opera",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("i",{staticClass:"el-icon-hr-mail",attrs:{title:"查看邮件"},on:{click:function(l){t.$_checkDetail(e.row)}}}),t._v(" "),l("i",{staticClass:"el-icon-delete",attrs:{title:"删除"},on:{click:function(l){t.$_del(e.$index,e.row)}}})]}}])})],1)],1),t._v(" "),l("div",{staticClass:"footer"},[l("span",[t._v("接口人：")]),t._v(" "),l("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"total,sizes, prev, pager, next","current-page":t.currentPage,"page-sizes":[20,50,100],total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrent,"update:currentPage":function(e){t.currentPage=e}}})],1)]),t._v(" "),l("transition",{attrs:{name:"fade",mode:"out-in"}},[t.detailShow?l("div",{staticClass:"em-detail child-view"},[l("email-detail",{attrs:{"email-item":t.selectedEmail},on:{"update:emailItem":function(e){t.selectedEmail=e},"on-back":t.$_onBack}})],1):t._e()])],1)},staticRenderFns:[]};var n=l("vSla")(a,i,!1,function(t){l("Cq8e")},"data-v-3b528ce6",null);e.default=n.exports},sDdn:function(t,e,l){"use strict";var a={data:function(){return{}},props:{emailItem:{type:Object,default:null}},methods:{$_onBack:function(){this.$emit("on-back",null)},$_del:function(t,e){var l=this;this.$confirm("删除后将不能恢复，确认删除该邮件吗?","提示",{type:"warning"}).then(function(){l.listLoading=!0}).catch(function(){})},handleCurrent:function(t){this.currentPage=t,this.page=t},handleSizeChange:function(t){this.pageSize=t}}},i={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",[l("div",{staticClass:"head clearfix"},[l("span",[t._v("邮件详情")]),t._v(" "),l("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:t.$_onBack}},[t._v("返回")]),t._v(" "),l("el-button",{attrs:{type:"danger",size:"small",plain:""},on:{click:t.$_del}},[t._v("删除")])],1),t._v(" "),l("div",{staticClass:"message"},[l("h3",[t._v(t._s(t.emailItem.mail_name))]),t._v(" "),l("ul",[l("li",[t._v("收件人："+t._s(t.emailItem.recipient)+"<"+t._s(t.emailItem.recipient_address)+">")]),t._v(" "),l("li",[t._v("时间："+t._s(t.emailItem.send_time))]),t._v(" "),l("li",[t._v("接口人："+t._s(t.emailItem.sender)+"<"+t._s(t.emailItem.sender_address)+">")]),t._v(" "),l("li",[t._v("附件：")])])]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"letter-box"},[l("div",{staticClass:"letter-border"},[l("p",{staticStyle:{font:"15px/26px '微软雅黑'",color:"#333","white-space":"2px"}},[t._v("Hi，"),l("br"),t._v("\n\t\t\t  \t\t    今天是加入品高的第一天，过得还惬意么?感受到品高的活力了么？真诚地祝您在公司一切愉快！"),l("br"),t._v(" \n\t\t\t        \t有什么需要帮忙的么？试试下面的方法？"),l("br"),t._v("\n\t\t\t        1）想了解部门对自己工作绩效的期望？需要开通公司系统某个模块的权限？想了解业务的接口人？"),l("br"),t._v(" \n\t\t\t        答：直属部门经理可以帮到你！“LINK-工作指南“可以帮到你！"),l("br"),t._v("\n\t\t\t        2）\\t想了解近段时间的工作安排？想尽快了解负责的业务、项目情况？"),l("br"),t._v("\n\t\t\t        答：快去找你的导师帮忙吧！"),l("br"),t._v("\n\t\t\t        3）入职提交的材料还有遗漏？社保公积金有疑惑？入职时介绍的办事流程还有疑惑？"),l("br"),t._v("\n\t\t\t         答：欢迎咨询温柔可爱的HR小姐姐：）"),l("br"),t._v("\n\t\t\t            HR小姐姐祝您工作顺利！生活愉快！幸福感爆棚！开启Bingo旅程!\n            \t")])])])}]};var n=l("vSla")(a,i,!1,function(t){l("LLmL")},"data-v-6803a4b8",null);e.a=n.exports}});