import Axios from "axios";
import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../util";

const state = {
    //ユーザー情報
    user: null,

    //api通信結果
    apiStatus: null,

    //会員登録エラーメッセージ
    registerErrorMessages: null,

    //ログインエラーメッセージ
    loginErrorMessages: null
};

const getters = {
    //ユーザーがログイン中かチェック
    check: state => !!state.user,

    //ユーザーの名前
    userName: state => (state.user ? state.user.name : "")
};

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setapiStatus(state, status) {
        state.apiStatus = status;
    },
    setRegisterErrorMessages(state, messages) {
        state.registerErrorMessages = messages;
    },
    setLoginErrorMessages(state, messages) {
        state.loginErrorMessages = messages;
    },
};

const actions = {
    //会員登録
    async register(context, data) {
        context.commit("setapiStatus", null);
        const response = await Axios.post("/api/register", data).catch(
            err => err.response || err
        );
        if (response.status === CREATED) {
            context.commit("setapiStatus", true);
            context.commit("setUser", response.data);
            return;
        }

        context.commit("setapiStatus", false);
        if(response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setRegisterErrorMessages', response.data.errors)
        }else {
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    //ログイン
    async login(context, data) {
        context.commit("setapiStatus", null);
        const response = await Axios.post("/api/login", data).catch(
            err => err.response || err
        );
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", response.data);
            return;
        };
        context.commit("setapiStatus", false);
        if(response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setLoginErrorMessages', response.data.errors)
        }else {
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    //ログアウト
    async logout(context) {
        context.commit("setapiStatus", null);
        const response = await Axios.post("/api/logout").catch(
            err => err.response || err
        );
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", null);
            return;
        };
        context.commit("setapiStatus", false);
        context.commit("error/setCode", response.status, { root: true });

    },
    //ログインユーザーチェック
    async currentUser(context) {
        context.commit("setapiStatus", null);
        const response = await axios.get("/api/user").catch(
            err => err.response || err
        );
        const user = response.data || null;
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", user);
            return;
        };

        context.commit("setapiStatus", false);
        context.commit("error/setCode", response.status, { root: true });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
