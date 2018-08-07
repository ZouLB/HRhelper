import axios from 'axios';

//let base = process.env.API_URL;
let base = "http://192.168.137.1:8080";

//export const getMailPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };
export const getMailPage = params => { return axios.get(`${base}/mail/list`, { params: params }); };

//export const removeMail = params => { return axios.get(`${base}/user/remove`, { params: params }); };

//export const batchRemoveMail = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

//export const getList = params => { return axios.post(`${base}/user/listpage`, params).then(res => res.data); };
