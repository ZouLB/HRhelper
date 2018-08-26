webpackJsonp([7],{"4rSx":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("P9l9"),o={data:function(){return{listLoading:!1,addLoading:!1,currentRow:null,tableData:[],hrForm:[],addFormVisible:!1,editFormVisible:!1,addForm:{operationName:"",userId:""},editForm:{},addFormRules:{operationName:[{required:!0,message:"请输入业务名称",trigger:"change"}],userId:[{required:!0,message:"请选择接口人",trigger:"blur"}]},editFormRules:{operationName:[{required:!0,message:"请输入业务名称",trigger:"change"}],principal:[{required:!0,message:"请选择接口人",trigger:"blur"}]}}},methods:{handleCurrentChange:function(e){this.currentRow=e},$_getBus:function(){var e=this;this.listLoading=!0,Object(a.f)().then(function(t){console.log(t.data.resultEntity),e.tableData=t.data.resultEntity,e.listLoading=!1})},$_del:function(e,t){var i=this;this.$confirm("删除后将不能恢复，确认删除业务吗?","提示",{type:"warning"}).then(function(){i.listLoading=!0;var e={operationId:t.id};Object(a.k)(e).then(function(e){i.listLoading=!1,i.$message({message:"删除成功",type:"success"}),i.$_getBus()})}).catch(function(){})},$_addSubmit:function(){var e=this;Object(a.a)(this.addForm).then(function(t){e.addLoading=!0,e.$message({message:"新增成功",type:"success"}),e.addLoading=!1,e.addFormVisible=!1,e.$_getBus()})},$_editSubmit:function(){var e=this;Object(a.e)(this.addForm).then(function(t){e.addLoading=!0,e.$message({message:"编辑成功",type:"success"}),e.addLoading=!1,e.addFormVisible=!1,e.$_getBus()})},$_addBus:function(){this.addFormVisible=!0,this.addForm={}},$_editBus:function(e){this.editFormVisible=!0,this.editForm=e,console.log(this.editForm)}},watch:{},mounted:function(){var e=this;Object(a.g)().then(function(t){e.hrForm=t.data.resultEntity}),this.$_getBus()}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("div",{staticClass:"head clearfix editHead"},[i("span",[e._v("业务管理")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:e.$_addBus}},[e._v("新增业务")])],1),e._v(" "),i("div",{staticClass:"content"},[i("el-table",{ref:"singleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"highlight-current-row":"","v-loading":e.listLoading,stripe:"",border:"",size:"mini","tooltip-effect":"dark"},on:{"current-change":e.handleCurrentChange}},[i("el-table-column",{attrs:{property:"operationName",label:"业务名称","show-overflow-tooltip":""}}),e._v(" "),i("el-table-column",{attrs:{property:"principal",label:"接口人",width:"100",sortable:""}}),e._v(" "),i("el-table-column",{attrs:{property:"createTime",label:"创建时间",width:"160",sortable:""}}),e._v(" "),i("el-table-column",{attrs:{property:"updateTime",label:"更新时间",width:"160",sortable:""}}),e._v(" "),i("el-table-column",{attrs:{property:"operation",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("i",{staticClass:"el-icon-edit-outline",attrs:{title:"编辑"},on:{click:function(i){e.$_editBus(t.row)}}}),e._v(" "),i("router-link",{attrs:{to:"rules"}},[i("i",{staticClass:"el-icon-setting",attrs:{title:"规则管理"}})]),e._v(" "),i("i",{staticClass:"el-icon-delete",attrs:{title:"删除"},on:{click:function(i){e.$_del(t.$index,t.row)}}})]}}])})],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"新增业务",visible:e.addFormVisible,"close-on-click-modal":!1,width:"400px"},on:{"update:visible":function(t){e.addFormVisible=t}}},[i("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"80px",rules:e.addFormRules}},[i("el-form-item",{attrs:{label:"业务名称",prop:"operationName"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入业务名称"},model:{value:e.addForm.operationName,callback:function(t){e.$set(e.addForm,"operationName",t)},expression:"addForm.operationName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"接口人",prop:"userId"}},[i("el-select",{attrs:{placeholder:"请选择接口人"},model:{value:e.addForm.userId,callback:function(t){e.$set(e.addForm,"userId",t)},expression:"addForm.userId"}},e._l(e.hrForm,function(e,t){return i("el-option",{key:t,attrs:{label:e.username,value:e.id}})}))],1),e._v(" "),i("el-form-item",{staticStyle:{"margin-bottom":"0"}},[i("el-button",{attrs:{type:"primary",loading:e.addLoading},on:{click:e.$_addSubmit}},[e._v("确定")]),e._v(" "),i("el-button",{nativeOn:{click:function(t){e.addFormVisible=!1}}},[e._v("取消")])],1)],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑业务",visible:e.editFormVisible,"close-on-click-modal":!1,width:"400px"},on:{"update:visible":function(t){e.editFormVisible=t}}},[i("el-form",{ref:"editForm",attrs:{model:e.editForm,"label-width":"80px",rules:e.editFormRules}},[i("el-form-item",{attrs:{label:"业务名称",prop:"operationName"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入业务名称"},model:{value:e.editForm.operationName,callback:function(t){e.$set(e.editForm,"operationName",t)},expression:"editForm.operationName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"接口人",prop:"principal"}},[i("el-select",{attrs:{placeholder:"请选择接口人"},model:{value:e.editForm.principal,callback:function(t){e.$set(e.editForm,"principal",t)},expression:"editForm.principal"}},e._l(e.hrForm,function(e,t){return i("el-option",{key:t,attrs:{label:e.username,value:e.id}})}))],1),e._v(" "),i("el-form-item",{staticStyle:{"margin-bottom":"0"}},[i("el-button",{attrs:{type:"primary",loading:e.addLoading},on:{click:e.$_editSubmit}},[e._v("确定")]),e._v(" "),i("el-button",{nativeOn:{click:function(t){e.addFormVisible=!1}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var l=i("vSla")(o,r,!1,function(e){i("h6QX")},"data-v-24ba95cc",null);t.default=l.exports},h6QX:function(e,t){}});