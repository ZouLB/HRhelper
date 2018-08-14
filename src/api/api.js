import axios from 'axios';

//http://10.200.202.36:8080/operation/getOperationMenu
//let base = process.env.API_URL;
let base = "http://10.200.197.97:8080";

export const getMenuList = params => { return axios.get(`${base}/operation/getOperationMenu`, { params: params }); };

//export const getMailPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const getMailPage = params => { return axios.post(`${base}/mail/list`, params).then(res => res.data); };


//export const removeMail = params => { return axios.get(`${base}/user/remove`, { params: params }); };

//export const batchRemoveMail = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

//export const getList = params => { return axios.post(`${base}/user/listpage`, params).then(res => res.data); };
