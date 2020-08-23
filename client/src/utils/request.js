import Axios from 'axios';
import Storage from '@/utils/storage';
import configUrl from "./../config/index"
import router from './../route/route'
const instance = axios.create();


  //------------------添加请求拦截器---------------
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// -----------------------添加响应拦截器------------------
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
class Api{
	constructor() {
		// this.routeInfo = process.env.server;
		this.routeInfo = {
			api:configUrl.DEBUG_URL
		}
	}
	get headers() {
		return {
			Authorization:`Bearer ${Storage.getStorage('token')}`
		}
	}
	do(method, url, data, oUrl) {
		url = (oUrl || this.routeInfo[url.split('/')[1]]) + '/' + (url.split('/').slice(2)).join('/');
		return new Promise((resolve, reject) => {
			instance({
				method,
				url,
				timeout: 3000,
				params: data,
				headers:this.headers
			}).then(res=>{
				if (res.data.ok) {
					resolve(res.data);
				} else if (res.data.code === 1002) {
					//登录状态失效
					reject(new Error(`token失效`));
				} else {
					if( res.data.code ){
						router.currentRoute.path !== 'login' &&
						router.replace({
						  path: 'login',
						  query: { redirect: router.currentRoute.path },
						})
						reject(new Error(`${res.data.code}: ${res.data.msg}`));
					}
					else{
						reject(new Error(`${res.data.msg}`));
					}
				}
			}).catch(err=>{
				reject(err)
			})
		})
	}
}
export default{
	GET(...arguments){return Api.do('get',...arguments)},
	PUT(...arguments){return Api.do('put',...arguments)},
	DELETE(...arguments){return Api.do('delete',...arguments)},
	POST(...arguments){return Api.do('post',...arguments)}
}