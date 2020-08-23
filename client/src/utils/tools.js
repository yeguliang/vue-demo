'use strict';
export default {
    //------------------------------- 验证类型------------------
    getType(type) {
        let str = Object.prototype.toString.call(type);
        let objType = ""
        switch (str) {
            case "[object Number]":
                objType = "Number"
                break;
            case "[object String]":
                objType = "String"
                break;
            case "[object Function]":
                objType = "Function"
                break;
            case "[object Array]":
                objType = "Array"
                break;
            case "[object Object]":
                objType = "Object"
                break;
            case "[object Boolean]":
                objType = "Boolean"
                break;
            case "[object Null]":
                objType = "Null"
                break;
            case "[object Undefined]":
                objType = "Undefined"
                break;
            case "[object Symbol]":
                objType = "Symbol"
                break;
        }
        return objType
    },
    //---------------------------根据对象id去重并记录重复次数---------------
    noRepeat(arr) {
        let result = arr.reduce((obj, item) => {
            let find = obj.find(i => i.id === item.id);
            let _d = {
                ...item,
                count: 1
            };
            find ? find.count++ : obj.push(_d);
            return obj;
        }, []);
        return result
    },
    //------------------------------- 数组扁平化--------------------------
    flatten(arr) {
        let result = [];
        arr.forEach((item, i, arr) => {
            if (Array.isArray(item)) {
                result = result.concat(this.flatten(item));
            } else {
                result.push(arr[i])
            }
        })
        return result;
    },
    //--------------------------------排序-----------------------------
    _sort(arr, key) {
        if (!arr.length) {
            return false
        }
        let type = this.getType(arr[0][key])
        // console.log("=>type",type)
        let newArr = []
        switch (type) {
            case 'Number':
                newArr = arr.sort((a, b) => {
                    let A = a[key]
                    let B = b[key]
                    if (A < B) {           // 按某种排序标准进行比较, a 小于 b
                        return -1;
                    }
                    if (A > B) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case 'String':
                newArr = arr.sort((a, b) => {
                    let A = a[key].toUpperCase(); // ignore upper and lowercase
                    let B = b[key].toUpperCase(); // ignore upper and lowercase
                    if (A < B) {
                        return -1;
                    }
                    if (A > B) {
                        return 1;
                    }
                    return 0;
                });
                break;
            // default:return false
        }
        // console.log("newArr", newArr)
        return newArr
    },
    //--------------------------------判断客户端------------------------
    judgeClient() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
        console.log('是否是Android：' + isAndroid); //true,false
        console.log('是否是iOS：' + isIOS);
        if (isAndroid) {
            return 'Android';
        } else if (isIOS) {
            return 'IOS';
        } else {
            return 'PC';
        }
    },
    //判断访问终端
    // browser:{
    //     versions: function () {
    //     let u = navigator.userAgent, app = navigator.appVersion;
    //     return {
    //         trident: u.indexOf('Trident') > -1, //IE内核
    //         presto: u.indexOf('Presto') > -1, //opera内核
    //         webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    //         gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
    //         mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    //         ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    //         android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
    //         iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
    //         iPad: u.indexOf('iPad') > -1, //是否iPad
    //         webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    //         weixin: u.indexOf('MicroMessenger') > -1, //是否微信
    //         qq: u.match(/\sQQ/i) == " qq" //是否QQ
    //     };
    //     }(),
    //     language: (navigator.browserLanguage || navigator.language).toLowerCase()
    // },

    isPC() {
        /*true则pc，false则mobile*/
        let u = navigator.userAgent;
        let Agents = ["Android", "iPhone", "webOS", "BlackBerry", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        let flag = true;
        for (let i = 0; i < Agents.length; i++) {
            if (u.indexOf(Agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    //------------------------------------img=>base64------------------------
    // img html的img标签 ext 图片格式  returns {string}
    getImageBase64(img, ext) {
        let canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height); //使用画布画图
        let dataURL = canvas.toDataURL("image/" + ext);  //返回的是一串Base64编码的URL并指定格式
        canvas = null; //释放
        return dataURL;
    },
    //------------------------------------身份证号------------------------
    // 生成随机数字，max限制最大值，base限制最小值
    getRandom(max, base) {
        return Math.floor(Math.random() * max + (base ? base : 0));
    },
    // 根据前17位生成末位
    cnNewID(idcard) {
        let arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
        let arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
        let sum = 0;
        for (let j = 0; j < 17; j++) {
            // 对前17位数字与权值乘积求和
            sum += parseInt(idcard[j], 10) * arrExp[j];
        }
        return arrValid[sum % 11];
    },
    // 生成身份证号
    getIdcard() {
        let idcard = '';
        for (let i = 0; i < 18; i++) {
            if (i < 6) {
                idcard += this.getRandom(10)
            } else if (i == 6) {
                idcard += this.getRandom(2, 1) //年份第一位仅支持1和2
            } else if (i == 7) {
                idcard += idcard[6] == '1' ? 9 : 0;//两位年份规则，仅支持19和20
            } else if (i == 8) {
                idcard += idcard[6] == '1' ? this.getRandom(7, 3) : this.getRandom(2); //三位年份规则，仅支持193-199、200、201这些值
            } else if (i == 9) {
                idcard += this.getRandom(10) //四位年份规则,0-9
            } else if (i == 10) {
                idcard += this.getRandom(2);//首位月份规则
            } else if (i == 11) {
                idcard += idcard[10] == '0' ? this.getRandom(9, 1) : this.getRandom(3);//末位月份规则
            } else if (i == 12) {
                let maxDays = new Date(idcard.substr(6, 4), idcard.substr(10, 2), 0).getDate(); // 获取当月最大天数
                let day = this.getRandom(maxDays, 1)
                idcard += day < 10 ? ('0' + day) : day;
                i++
            } else if (i > 13 && i < 17) {
                idcard += this.getRandom(10)
            } else if (i == 17) {
                idcard += this.cnNewID(idcard);
            }
        }
        return idcard;
    },
    //-------------------------------------------- 移动端----------------------------------------------------
    // 键盘抬起bug处理
    //Android
    isAndroid() {
        //获取原窗口的高度
        let originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
        window.onresize = function () {
            //键盘弹起与隐藏都会引起窗口的高度发生变化
            let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (resizeHeight - 0 < originalHeight - 0) {
                //当软键盘弹起，在此处操作
                //_self.show_bo = false;
            } else {
                //当软键盘收起，在此处操作
                // _self.show_bo = true;
            }
        };
    },
    // ios：focusin和focusout支持冒泡，对应focus和blur, 使用focusin和focusout的原因是focusin和focusout可以冒泡，focus和blur不会冒泡，这样就可以使用事件代理，处理多个输入框存在的情况。
    isiOS() {
        document.body.addEventListener("focusin", () => {
            //软键盘弹出的事件处理
            //this.show_bo = false;
        });
        document.body.addEventListener("focusout", () => {
            //软键盘收起的事件处理
            //this.show_bo = true;
        });
    },
    time33Hash(str = '') {
        for (var i = 0, len = str.length, hash = 5381; i < len; ++i) {
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        };
        return (hash & 0x7fffffff).toString(36);
    }

};