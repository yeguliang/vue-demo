'use strict';

import Lz from 'lz-string';
import JwtDecode from 'jwt-decode';

const Session = {};

export default {
    state: {
        logged: false,
        ready: false,
        //折叠菜单
        collapsed: true,
        //系统管理员
        root: false,
        //租户管理员
        admin: false,
        //用户id
        id: '',
        //用户名
        name: '',
        //租户id
        uid: '',
        //租户名
        user: '',
        //token有效期
        exp: 0,
        // 头像
        avatarImg: ''
    },
    // jwt(key) {
    //     return JwtDecode(this.getSession('token'))[key];
    // },
    cfg(key, value) {
        if (typeof key === 'string' && value === undefined) {
            var cfg = sessionStorage.getItem(key);
            return cfg ? JSON.parse(Lz.decompress(cfg)) : null;
        } else {
            sessionStorage.setItem(key, Lz.compress(JSON.stringify(value)));
            return value;
        }
    },
    session(key, value) {
        if (key === undefined) {
            return this.getSession();
        } else if (typeof key === 'string' && value === undefined) {
            return this.getSession(key);
        } else {
            return this.setSession(key, value);
        }
    },
    restore() {
        for (var key of Object.keys(this.state).slice(3, 10)) {
            this.state[key] = this.getSession(key) || '';
        }
    },
    getSession(key) {
        if (!Session.__loaded__) {
            var json = sessionStorage.getItem('__$__');
            if (json) {
                try {
                    Object.assign(Session, JSON.parse(Lz.decompress(json)));
                } catch (e) {
                    console.error(`failed to get session[${key}]: ${e.message}`);
                }
            }
            Session.__loaded__ = true;
        }
        return key ? Session[key] : Session;
    },
    setSession(key, value) {
        if (key) {
            if (typeof key === 'string') {
                Session[key] = value;
            } else {
                this.state.logged = true;
                Object.assign(Session, key);
            }
            sessionStorage.setItem('__$__', Lz.compress(JSON.stringify(Session)));
        } else {
            this.state.logged = false;
            for (var key in Session) {
                delete Session[key];
            }
            sessionStorage.removeItem('__$__');
        }
        this.restore();
    },
     // 验证类型
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
    //根据对象id去重并记录重复次数
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
    // 数组扁平化
    flatten(arr) {
        let result = [];
        arr.forEach((item, i, arr) => {
            if (Array.isArray(item)) {
                result = result.concat(flatten(item));
            } else {
                result.push(arr[i])
            }
        })
        return result;
    },
    // 排序
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
    }
};