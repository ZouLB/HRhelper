webpackJsonp([0],{JhHb:function(t,e,a){a("SAFe");var i=a("AKd3").Object;t.exports=function(t,e,a){return i.defineProperty(t,e,a)}},P9l9:function(t,e,a){"use strict";a.d(e,"b",function(){return l}),a.d(e,"c",function(){return s}),a.d(e,"a",function(){return r});var i=a("OMN4"),n=a.n(i),l=function(t){return n.a.get("/user/listpage",{params:t})},s=function(t){return n.a.get("/user/remove",{params:t})},r=function(t){return n.a.get("/user/batchremove",{params:t})}},SAFe:function(t,e,a){var i=a("FITv");i(i.S+i.F*!a("sjnA"),"Object",{defineProperty:a("lIiZ").f})},a3Yh:function(t,e,a){"use strict";e.__esModule=!0;var i,n=a("liLe"),l=(i=n)&&i.__esModule?i:{default:i};e.default=function(t,e,a){return e in t?(0,l.default)(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},k4PW:function(t,e){},liLe:function(t,e,a){t.exports={default:a("JhHb"),__esModule:!0}},sDdn:function(t,e,a){"use strict";var i={data:function(){return{}},props:{emailItem:{type:Object,default:null}},methods:{goBack:function(){this.$router.go(-1)},$_onBack:function(){this.$emit("on-back",null)},del:function(t,e){var a=this;this.$confirm("删除后将不能恢复，确认删除该邮件吗?","提示",{type:"warning"}).then(function(){a.listLoading=!0}).catch(function(){})},handleCurrent:function(t){this.currentPage=t,this.page=t},handleSizeChange:function(t){this.pageSize=t}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",{staticClass:"head clearfix"},[a("span",[t._v("邮件详情")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:t.$_onBack}},[t._v("返回")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small",plain:""},on:{click:t.del}},[t._v("删除")])],1),t._v(" "),a("div",{staticClass:"message"},[a("h3",[t._v(t._s(t.emailItem.mail_name))]),t._v(" "),a("ul",[a("li",[t._v("收件人："+t._s(t.emailItem.recipient)+"<"+t._s(t.emailItem.recipient_address)+">")]),t._v(" "),a("li",[t._v("时间："+t._s(t.emailItem.send_time))]),t._v(" "),a("li",[t._v("发件人："+t._s(t.emailItem.sender)+"<"+t._s(t.emailItem.sender_address)+">")]),t._v(" "),a("li",[t._v("附件：")])])]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"letter-box"},[a("div",{staticClass:"letter-border"},[a("p",{staticStyle:{font:"15px/26px '微软雅黑'",color:"#333","white-space":"2px"}},[t._v("Hi，"),a("br"),t._v("\n\t\t\t  \t\t    今天是加入品高的第一天，过得还惬意么?感受到品高的活力了么？真诚地祝您在公司一切愉快！"),a("br"),t._v(" \n\t\t\t        \t有什么需要帮忙的么？试试下面的方法？"),a("br"),t._v("\n\t\t\t        1）想了解部门对自己工作绩效的期望？需要开通公司系统某个模块的权限？想了解业务的接口人？"),a("br"),t._v(" \n\t\t\t        答：直属部门经理可以帮到你！“LINK-工作指南“可以帮到你！"),a("br"),t._v("\n\t\t\t        2）\\t想了解近段时间的工作安排？想尽快了解负责的业务、项目情况？"),a("br"),t._v("\n\t\t\t        答：快去找你的导师帮忙吧！"),a("br"),t._v("\n\t\t\t        3）入职提交的材料还有遗漏？社保公积金有疑惑？入职时介绍的办事流程还有疑惑？"),a("br"),t._v("\n\t\t\t         答：欢迎咨询温柔可爱的HR小姐姐：）"),a("br"),t._v("\n\t\t\t            HR小姐姐祝您工作顺利！生活愉快！幸福感爆棚！开启Bingo旅程!\n            \t")])])])}]};var l=a("vSla")(i,n,!1,function(t){a("w07n")},"data-v-036ece8c",null);e.a=l.exports},sWeL:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("a3Yh"),n=a.n(i),l=a("sDdn"),s=a("P9l9"),r={data:function(){var t;return t={table_title:null,listLoading:!1,filters:{name:"",date:""},tableData:[],pickerOptions2:{shortcuts:[{text:"明天",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()+864e5),e.setTime(a.getTime()),t.$emit("pick",[a,e])}},{text:"后两天",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()+864e5),e.setTime(a.getTime()+864e5),t.$emit("pick",[a,e])}}]}},n()(t,"listLoading",!1),n()(t,"currentRow",null),n()(t,"tableSelect",[]),n()(t,"total",100),n()(t,"page",1),n()(t,"pageSize",20),n()(t,"currentPage",1),n()(t,"detailShow",!1),n()(t,"selectedEmail",null),n()(t,"sortId",null),t},methods:{handleCurrentChange:function(t){this.currentRow=t},$_handleSelectionChange:function(t){this.tableSelect=t},checkDetail:function(t){this.detailShow=!0,this.selectedEmail=t},$_onBack:function(t){this.detailShow=!1},initialize:function(){this.table_title=this.$route.params.title,0==this.$route.params.id?this.sortId="":this.sortId=this.$route.params.id,this.getData()},getData:function(){var t=this,e={page:this.page,pageSize:this.pageSize,name:this.filters.name,sort:this.sortId};this.listLoading=!0,Object(s.b)(e).then(function(e){t.total=e.data.total,t.tableData=e.data.users,t.listLoading=!1})},cancel:function(t,e){var a=this;this.$confirm("取消后将不能恢复，确认取消发送吗?","提示",{type:"warning"}).then(function(){a.listLoading=!0;var t={id:e.id};Object(s.c)(t).then(function(t){a.listLoading=!1,a.$message({message:"取消成功",type:"success"}),a.getData()})}).catch(function(){})},batchCancel:function(){var t=this;if(0!=this.tableSelect.length){var e=this.tableSelect.map(function(t){return t.id}).toString();this.$confirm("取消后将不能恢复，确认取消发送所选邮件吗?","提示",{type:"warning"}).then(function(){t.listLoading=!0;var a={ids:e};Object(s.a)(a).then(function(e){t.listLoading=!1,t.$message({message:"取消发送成功",type:"success"}),t.getData()})}).catch(function(){})}else this.$alert("请选择需要取消发送的邮件","提示",{confirmButtonText:"确定",type:"info"})},handleCurrent:function(t){this.currentPage=t,this.page=t,this.getData()},handleSizeChange:function(t){this.pageSize=t,this.getData()}},mounted:function(){this.initialize()},watch:{$route:function(t,e){this.initialize(),this.detailShow=!1}},components:{emailDetail:l.a}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[t.detailShow?t._e():a("div",[a("div",{staticClass:"head clearfix"},[a("span",[t._v("待发送文件"),a("i",{staticClass:"el-icon-arrow-right"}),t._v(t._s(t.table_title))]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small",plain:""},on:{click:t.batchCancel}},[t._v("取消发送")]),t._v(" "),a("el-button",{staticClass:"search",attrs:{type:"primary",size:"small",plain:""},on:{click:function(e){t.getData()}}},[t._v("搜索")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入收件人",clearable:"",size:"small"},model:{value:t.filters.name,callback:function(e){t.$set(t.filters,"name",e)},expression:"filters.name"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})]),t._v(" "),a("el-date-picker",{attrs:{type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":t.pickerOptions2},model:{value:t.filters.date,callback:function(e){t.$set(t.filters,"date",e)},expression:"filters.date"}})],1),t._v(" "),a("div",{staticClass:"content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"highlight-current-row":"",stripe:"",border:"",size:"mini","tooltip-effect":"dark"},on:{"current-change":t.handleCurrentChange,"selection-change":t.$_handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{property:"mail_name",label:"邮件主题","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{property:"recipient",label:"收件人",width:"140","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{property:"sender",label:"接口人",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{property:"copy_people",label:"抄送人",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{property:"operation_id",label:"类别",width:"140",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{property:"send_time",label:"发送时间",width:"150",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{property:"operation",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{staticClass:"el-icon-hr-mail",attrs:{title:"查看邮件"},on:{click:function(a){t.checkDetail(e.row)}}}),t._v(" "),a("i",{staticClass:"el-icon-hr-cancel",attrs:{title:"取消发送"},on:{click:function(a){t.cancel(e.$index,e.row)}}})]}}])})],1)],1),t._v(" "),a("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"sizes, prev, pager, next","current-page":t.currentPage,"page-sizes":[20,50,100],total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrent,"update:currentPage":function(e){t.currentPage=e}}})],1),t._v(" "),a("transition",{attrs:{name:"fade",mode:"out-in"}},[t.detailShow?a("div",{staticClass:"em-detail child-view"},[a("email-detail",{attrs:{"email-item":t.selectedEmail},on:{"update:emailItem":function(e){t.selectedEmail=e},"on-back":t.$_onBack}})],1):t._e()])],1)},staticRenderFns:[]};var c=a("vSla")(r,o,!1,function(t){a("k4PW")},"data-v-63c64556",null);e.default=c.exports},w07n:function(t,e){}});
//# sourceMappingURL=0.7c6bb6b4d1bee76c0fba.js.map