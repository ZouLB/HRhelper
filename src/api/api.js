import axios from 'axios';

//http://10.200.202.36:8080/operation/getOperationMenu
//let base = process.env.API_URL;
let base = "http://10.200.202.36:8080";

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

//获取规则
export const getRuleList = params => { return axios.get(`${base}/rule/list`, { params: params }); };

//删除规则
export const removeRule = params => { return axios.delete(`${base}/rule/del`, { params: params }); };

//获取规则详情
export const getRuleDetail = params => { return axios.get(`${base}/rule/get`, { params: params }); };


//export const getMailPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

//export const removeMail = params => { return axios.get(`${base}/user/remove`, { params: params }); };

//export const batchRemoveMail = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

//export const getList = params => { return axios.post(`${base}/user/listpage`, params).then(res => res.data); };
