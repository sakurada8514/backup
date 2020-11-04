import axios from "axios";
import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../util";

const state = {
    //ユーザー情報
    user: null,

    //api通信結果
    apiStatus: null,

    //会員登録エラーメッセージ
    registerErrorMessages: null,

    //ログインエラーメッセージ
    loginErrorMessages: null,

    profileErrorMessages: null
};

const getters = {
    //ユーザーがログイン中かチェック
    check: state => !!state.user,

    //ユーザーの名前
    userName: state => (state.user ? state.user.name : ""),

    //ユーザーID
    userId: state => (state.user ? state.user.id : "")
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
    setProfileErrorMessages(state, messages) {
        state.profileErrorMessages = messages;
    }
};

const actions = {
    //会員登録
    async register(context, data) {
        context.commit("setapiStatus", null);
        const response = await axios
            .post("/api/register", data)
            .catch(err => err.response || err);

        //通信成功したらユーザー情報と日記情報をセット
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", response.data.user);
            const diaries = response.data.diaries || null;
            context.commit("diaries/setDiaries", diaries, { root: true });
            return;
        }

        context.commit("setapiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setRegisterErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    //ログイン
    async login(context, data) {
        context.commit("setapiStatus", null);
        const response = await axios
            .post("/api/login", data)
            .catch(err => err.response || err);

        //通信成功したらユーザー情報と日記情報をセット
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", response.data.user);
            const diaries = response.data.diaries || null;
            context.commit("diaries/setDiaries", diaries, { root: true });
            return;
        }
        context.commit("setapiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setLoginErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    //ログアウト
    async logout(context) {
        context.commit("setapiStatus", null);
        const response = await axios
            .post("/api/logout")
            .catch(err => err.response || err);

        //通信成功したらユーザー情報と日記情報をリセット
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", null);
            context.commit("diaries/setDiaries", null, { root: true });
            return;
        }
        context.commit("setapiStatus", false);
        //システムエラー
        context.commit("error/setCode", response.status, { root: true });
    },
    //ログインユーザーチェック
    async currentUser(context) {
        const response = await axios
            .get("/api/user")
            .catch(err => err.response || err);

        //通信成功したらユーザー情報と日記情報をセット
        if (response.status === OK) {
            const user = response.data.user || null;
            context.commit("setUser", user);
            const diaries = response.data.diaries || null;
            context.commit("diaries/setDiaries", diaries, { root: true });
            return;
        }

        //システムエラー
        context.commit("error/setCode", response.status, { root: true });
    },
    async profileUpdate(context, data) {
        context.commit("setapiStatus", null);
        const response = await axios
                .post("/api/user/update", data)
                .catch(err => err.response || err);

        //通信成功したらユーザー情報
        if (response.status === OK) {
            context.commit("setapiStatus", true);
            context.commit("setUser", response.data.user);
            return;
        }
        context.commit("setapiStatus", false);

        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setProfileErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
