import axios from "axios";
import { OK, UNPROCESSABLE_ENTITY, CREATED } from "../util";

const state = {
    //api通信結果
    apiStatus: null,
    //日記作成バリデーションエラー
    diariesErrorMessages: null,
    //日記一覧
    diaries: null,
    //検索結果一覧
    searchResultDiaries: [],
    //検索条件
    searchFormData: null
};

const getters = {
    //日記が記入されているかチェック
    check: state => state.diaries.length !== 0
};

const mutations = {
    setDiaries(state, diaries) {
        state.diaries = diaries;
    },
    setapiStatus(state, status) {
        state.apiStatus = status;
    },
    setdiariesErrorMessages(state, messages) {
        state.diariesErrorMessages = messages;
    },
    setsearchResultDiaries(state, diaries) {
        state.searchResultDiaries = diaries;
    },
    setsearchFormData(state, formData) {
        state.searchFormData = formData;
    }
};

const actions = {
    //日記作成
    async create(context, data) {
        context.commit("setapiStatus", null);
        const response = await axios
            .post("/api/diaries", data)
            .catch(err => err.response || err);

        //通信成功したら日記情報をセット
        if (response.status === OK) {
            context.commit("setDiaries", response.data);
            context.commit("setapiStatus", true);
            return;
        }

        context.commit("setapiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setdiariesErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    //日記編集
    async update(context, { data, id }) {
        const response = await axios
            .post(`/api/diaries/${id}`, data)
            .catch(err => err.response || err);

        //通信成功したら日記情報をセット
        if (response.status === OK) {
            context.commit("setDiaries", response.data);
            context.commit("setapiStatus", true);
            return;
        }

        context.commit("setapiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setdiariesErrorMessages", response.data.errors);
        } else {
            //システムエラー
            context.commit("error/setCode", response.status, { root: true });
        }
    },
    //日記削除
    async delete(context, id) {
        const response = await axios
            .post(`/api/diaries/${id}/delete`)
            .catch(err => err.response || err);

        //通信成功したら日記情報をセット
        if (response.status === OK) {
            context.commit("setDiaries", response.data);
            context.commit("setapiStatus", true);
            return;
        }
        context.commit("setapiStatus", false);
        //バリデーションエラー
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit("setdiariesErrorMessages", response.data.errors);
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
