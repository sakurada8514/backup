import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import error from "./error";
import diaries from './diaries'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        error,
        diaries
    }
});

export default store;
