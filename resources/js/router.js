import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: () => import("./pages/Top.vue"),
        name: "top",
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                const userName = store.getters["auth/userName"];
                next(`/${userName}/diaries/list/`);
            } else {
                next();
            }
        }
    },
    {
        path: "/login",
        component: () => import("./pages/Login.vue"),
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                const userName = store.getters["auth/userName"];
                next(`/${userName}/diaries/list/`);
            } else {
                next();
            }
        }
    },
    {
        path: "/register",
        component: () => import("./pages/Register.vue"),
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                const userName = store.getters["auth/userName"];
                next(`/${userName}/diaries/list/`);
            } else {
                next();
            }
        }
    },
    {
        path: "/:name/diaries",
        component: () => import("./pages/userpages/UserPage.vue"),
        children: [
            {
                path: "list",
                component: () => import("./pages/userpages/diary/Diaries.vue"),
                children: [
                    {
                        path: "",
                        component: () =>
                            import("./pages/userpages/diary/DiaryList.vue"),
                        name: "diariesList"
                    },
                    {
                        path: "create",
                        name: "create",
                        component: () =>
                            import(
                                "./pages/userpages/diary/DiaryCreateForm.vue"
                            )
                    },
                    {
                        path: "search",
                        name: "search",
                        component: () =>
                            import(
                                "./pages/userpages/diary/DiarySearch.vue"
                            )
                    },
                    {
                        path: ":id",
                        name: "diaryDetail",
                        props: true,
                        component: () =>
                            import("./pages/userpages/diary/DiaryDetail.vue"),
                        
                    },
                    {
                        path: ":id/edit",
                        name: "edit",
                        component: () =>
                            import("./pages/userpages/diary/DiaryEditForm.vue")
                    },
                ]
            },
            {
                path: "share",
                name: "share",
                component: () => import("./pages/userpages/Share.vue")
            },
            {
                path: "analysis",
                name: "analysis",
                component: () => import("./pages/userpages/Analysis.vue")
            }
        ],
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                next();
            } else {
                next("/");
            }
        }
    },
    {
        path: "/500",
        component: () => import("./pages/System.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

export default router;
