

export default {
    defaultData: {
        // source      : 'h5',
        // user_id     : '',
        // session_id  : '',
        token       : '',
        // is_login    : 0, //是否登录
        // is_mob_vl   : '', //是否有手机号，本项目废弃
        // is_wechat   : 0, //是否为微信环境
        // is_wx_auth  : 0, //是否刚刚授权
        // is_wx_rela  : 0, //是否已经关联微信记录
        // is_bind     : '', //是否绑定，本项目废弃

        // ck_prefix   : '', //cookie的前缀
        // ck_path     : '',
        // ck_domain   : '',
        
        // oauth_url   : '', //授权地址
        // inviteuid   : '', //邀请人ID，本项目废弃
        // callback_url: encodeURIComponent(window.location.href),
    },
    /**
   * 设置storage
   * 用法：storage.setStorage(key, value);
   * @param [key] 设置的名称。
   * @param [value] 设置的内容。
   */
    setStorage(key, value) { 
        let curTime = new Date().getTime();
        if (Object.prototype.toString.call(key) ==='[object Array]') {
            for (let k in key) {
                localStorage.setItem(k, JSON.stringify({
                    data: key["" + k],
                    time: curTime
                }));
                if (this.defaultData.hasOwnProperty(k)) {
                    this.defaultData[k] = key["" + k];
                }
                this.defaultData[k] = key["" + k];
            }
            return;
        }
        let curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({
            data: value,
            time: curTime
        }));

        // 如果存入的key值在storage内已经存在，更新value
        if (this.defaultData.hasOwnProperty(key)) {
            this.defaultData[key] = value;
        }
        return value;
    },
    /**
   * 获取Storage
   * 用法 storage.getStorage(key);
   * @param [key] 获取的名称。
   * @param [day] 超过过期的天数
   */
    getStorage(key, day = 3) { 
        var data = localStorage.getItem(key);
        if (data == 'false' || data == 'undefined') {
            return false;
        }
        if (data) {
            let dataObj = JSON.parse(data);
            if (new Date().getTime() - dataObj.time > 1000 * 60 * 60 * 24 * day) {
                return false;
            } else {
                return dataObj.data;
            }
        } else {
            return false;
        }
    },
    /**
   * 删除Storage
   * @param [key] 删除的名称。
   */
    removeStorage(key) {
        if (Object.prototype.toString.call(key) ==='[object Array]') {
            for (let i = 0; i < key.length; i++) {
                localStorage.removeItem(key[i]);
                if (this.defaultData.hasOwnProperty(key[i])) {
                    this.defaultData[key[i]] = "";
                }
            }
            return false;
        }
        localStorage.removeItem(key);
    },
    /**
   * 获取默认参数值
   */
    // getDefaultData() {
    //     for (let item in this.defaultData) {
    //         // source的不做更改不然所有接口会有跨域问题
    //         if (item != 'source') {
    //             this.defaultData[item] = this.getStorage(item);
    //         }
    //     }
    //     let inviteuid = this.getStorage("inviteuid", 30); // 判断有没有超过30天
    //     this.defaultData.inviteuid = inviteuid ? inviteuid : "";
    // }
}