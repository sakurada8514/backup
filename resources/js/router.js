import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Top from "./pages/Top.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import UserPage from "./pages/userpages/UserPage.vue";
import Diaries from "./pages/userpages/diary/Diaries.vue";
import DiaryList from "./pages/userpages/diary/DiaryList.vue";
import DiaryCreateForm from "./pages/userpages/diary/DiaryCreateForm.vue";
import DiarySearch from "./pages/userpages/diary/DiarySearch.vue";
import DiaryDetail from "./pages/userpages/diary/DiaryDetail.vue";
import DiaryEditForm from "./pages/userpages/diary/DiaryEditForm.vue";
import Share from "./pages/userpages/share/Share.vue";
import ShareList from "./pages/userpages/share/ShareList.vue";
import MyPage from "./pages/userpages/share/mypage/MyPage.vue";
import MyShareDiarie from "./pages/userpages/share/mypage/MyShareDiaries.vue";
import ReferenceDiaries from "./pages/userpages/share/mypage/ReferenceDiaries.vue";
import Ranking from "./pages/userpages/share/Ranking.vue";
import PostDiaries from "./pages/userpages/share/posts/PostDiaries.vue";
import ShareDiaryDetail from "./pages/userpages/share/ShareDiaryDetail.vue";
import PostDiaryDetail from "./pages/userpages/share/posts/PostDiaryDetail.vue";
import Analysis from "./pages/userpages/Analysis.vue";
import System from "./pages/System.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Top,
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
        component: Login,
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
        component: Register,
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
        component: UserPage,
        children: [
            {
                path: "list",
                component: Diaries,
                children: [
                    {
                        path: "",
                        component: DiaryList,
                        name: "diariesList"
                    },
                    {
                        path: "create",
                        name: "create",
                        component: DiaryCreateForm
                    },
                    {
                        path: "search",
                        name: "search",
                        component: DiarySearch
                    },
                    {
                        path: ":id",
                        name: "diaryDetail",
                        props: true,
                        component: DiaryDetail
                    },
                    {
                        path: ":id/edit",
                        name: "edit",
                        component: DiaryEditForm
                    }
                ]
            },
            {
                path: "share",
                component: Share,
                children: [
                    {
                        path: "",
                        name: "share",
                        component: ShareList
                    },
                    {
                        path: "mypage",
                        component: MyPage,
                        children: [
                            {
                                path: "",
                                name: "mysharediaries",
                                component: MyShareDiarie
                            },
                            {
                                path: "reference",
                                name: "reference",
                                component: ReferenceDiaries
                            }
                        ]
                    },
                    {
                        path: "ranking",
                        name: "ranking",
                        component: Ranking
                    }
                ]
            },
            {
                path: "posts",
                name: "posts",
                component: PostDiaries
            },
            {
                path: "share/:id",
                name: "shareDiaryDetail",
                component: ShareDiaryDetail
            },
            {
                path: "posts/:id",
                name: "postDiaryDetail",
                component: PostDiaryDetail
            },
            {
                path: "analysis",
                name: "analysis",
                component: Analysis
            }
        ],
        //ログイン中ユーザーのみアクセスできる
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
        component: System
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
    //スクロールポジション維持
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

export default router;
