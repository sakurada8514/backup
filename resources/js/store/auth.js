import Axios from "axios";
import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../util";

const state = {
    user: null,
    apiStatus: null,
    registerErrorMessages: null,
    loginErrorMessages: null
};

const getters = {
    check: state => !!state.user,
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
