import Axios from 'axios';
import Storage from '@/utils/storage';
import configUrl from "./../config/index"

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
			Axios({
				method,
				url,
				params: data,
				headers:this.headers
			}).then(res=>{
				if (res.data.ok) {
					resolve(res.data);
				} else if (res.data.code === 1002) {
					//登录状态失效
					reject(new Error(`token失效`));
				} else {
					if( res.data.code )
						reject(new Error(`${res.data.code}: ${res.data.msg}`));
					else
						reject(new Error(`${res.data.msg}`));
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