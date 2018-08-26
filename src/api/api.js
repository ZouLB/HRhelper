import axios from 'axios';

//http://10.200.202.36:8080/operation/getOperationMenu
//let base = process.env.API_URL;
let base = "http://ccw.free.idcfengye.com";

//获取菜单
export const getMenuList = params => { return axios.get(`${base}/operation/getOperationMenu`, { params: params }); };

//获取邮件信息
export const getMailPage = params => { return axios.post(`${base}/mail/list`, params).then(res => res.data); };

//删除邮件
export const removeMail = params => { return axios.delete(`${base}/mail/del`, { params: params }); };

//批量删除邮件
export const batchRemoveMail = params => { return axios.delete(`${base}/mail/patch_del`, { params: params }); };

//取消发送邮件
export const cancelSendMail = params => { return axios.get(`${base}/mail/cancel`, { params: params }); };

//批量取消发送邮件
export const batchCancelSendMail = params => { return axios.get(`${base}/mail/patch_cancel`, { params: params }); };


//获取业务
export const getBusList = params => { return axios.get(`${base}/operation/list`, { params: params }); };

//获取业务负责人
export const getHR = params => { return axios.get(`${base}/user/listPrincipal`, { params: params }); };

//添加业务
export const addBus = params => { return axios.post(`${base}/operation/add`, params).then(res => res.data); };

//编辑业务
export const editBus = params => { return axios.patch(`${base}/operation/update`, params).then(res => res.data); };

//删除业务
export const removeBus = params => { return axios.delete(`${base}/operation/del`, { params: params }); };


//获取规则
export const getRuleList = params => { return axios.get(`${base}/rule/list`, { params: params }); };

//删除规则
export const removeRule = params => { return axios.delete(`${base}/rule/del`, { params: params }); };

//获取规则详情
export const getRuleDetail = params => { return axios.get(`${base}/rule/get`, { params: params }); };

//添加规则
export const addRule = params => { return axios.post(`${base}/rule`, params).then(res => res.data); };

//编辑规则
export const editRule = params => { return axios.patch(`${base}/rule`, params).then(res => res.data); };


//export const getMailPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

//export const removeMail = params => { return axios.get(`${base}/user/remove`, { params: params }); };

//export const batchRemoveMail = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

//export const getList = params => { return axios.post(`${base}/user/listpage`, params).then(res => res.data); };
