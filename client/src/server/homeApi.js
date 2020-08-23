import {GET,PUT,DELETE,POST} from './../utils/request'
export default {
   async getHomeData({data,url=null}){
      return await GET('/api/data',data,url)
   }
}
