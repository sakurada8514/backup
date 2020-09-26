import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./pages/Top.vue"),
        beforeEnter(to, from, next) {
            if(store.getters['auth/check']) {
                const userName = store.getters['auth/userName'] 
                next(`/${userName}/diaries`)
            }else {
                next()
            }
        }
    },
    {
        path: "/login",
        component: () => import("./pages/Login.vue"),
        beforeEnter(to, from, next) {
            if(store.getters['auth/check']) {
                const userName = store.getters['auth/userName'] 
                next(`/${userName}/diaries`)
            }else {
                next()
            }
        }
    },
    {
        path: "/register",
        component: () => import("./pages/Register.vue"),
        beforeEnter(to, from, next) {
            if(store.getters['auth/check']) {
                const userName = store.getters['auth/userName'] 
                next(`/${userName}/diaries`)
            }else {
                next()
            }
        }
    },
    {
        path: "/:name/diaries",
        component: () => import("./pages/userpages/UserPage.vue"),
        children: [
            {
                path: "",
                component: () => import("./pages/userpages/DiaryList.vue")
            },
            {
                path: ":id",
                component: () => import("./pages/userpages/Diary.vue")
            }
        ],
        beforeEnter(to, from, next) {
            if(store.getters['auth/check']) {
                const userName = store.getters['auth/userName'] 
                next()
            }else {
                next('/')
            }
        }
    },
    {
        path: '/500',
        component: () => import("./pages/System.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
