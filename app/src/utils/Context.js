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
    }
};