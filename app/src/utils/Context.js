'use strict';

import Lz from 'lz-string';
const Session = {};

export default {
    state: {
    },
    //------------------session取值 or 存值----------------
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
        for (let key of Object.keys(this.state)) {
            this.state[key] = this.getSession(key) || '';
        }
    },
    getSession(key) {
        if (!Session.__loaded__) {
            let json = sessionStorage.getItem('__$__');
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
            for (let key in Session) {
                delete Session[key];
            }
            sessionStorage.removeItem('__$__');
        }
        this.restore();
    },
};