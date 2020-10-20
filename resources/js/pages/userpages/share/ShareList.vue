<template>
<!-- 共有日記一覧ページ -->
    <div class="share-list">
        <div class="analysis__loading" v-if="loading">
            <vue-loading
                type="spiningDubbles"
                color=" #2c77bd"
                :size="{ width: '70px', height: '70px' }"
            ></vue-loading>
            <p class="analysis__loading--text">Now Loading...</p>
        </div>
        <ShareDiary
            v-for="diary in diaries"
            :key="diary.id"
            :item="diary"
        ></ShareDiary>
        <div v-if="itemLoading">
            <vue-loading
                type="spiningDubbles"
                color="#858585"
                :size="{ width: '30px', height: '30px' }"
            ></vue-loading>
        </div>
    </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
import { OK } from "../../../util";
import ShareDiary from "../../../components/ShareDiary";
export default {
    components: {
        ShareDiary,
        VueLoading
    },
    data() {
        return {
            //日記データ
            diaries: null,
            //初期読み込みローディング
            loading: true,
            //現在のページ
            page: 1,
            //総ページ数
            lastPage: null,
            //無限スクロール読み込み可、不可
            load: true,
            //無限スクロール読み込みローディング
            itemLoading: false
        };
    },
    methods: {
        //無限スクロール日記データ代入
        async getDiaries() {
            //読み込み
            if (this.load) {
                //読み込み中は読み込めないようにする
                if (!this.itemLoading) {
                    this.itemLoading = true;
                    //API通信
                    const response = await axios
                        .get("/api/share?page=" + this.page)
                        .catch(err => err.response || err);
                    if (response.status === OK) {
                        //日記データ代入
                        this.diaries = this.diaries.concat(response.data.data);
                        //現在のページ数に＋1する
                        this.page++;
                        //ページ数が総ページ数大きい場合は次から読み込まないようにする
                        if (this.page > this.lastPage) {
                            this.load = false;
                        }
                    } else {
                        //システムエラー
                        this.$store.commit("error/setCode", response.status);
                    }

                    this.itemLoading = false;
                }
            }
        },
        //初期ページ読み込み
        async readDiaries() {
            const response = await axios
                .get("/api/share?page=1")
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.diaries = response.data.data;
                this.page++;
                this.lastPage = response.data.last_page;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }

            this.loading = false;
        },
        //リセット処理
        clear() {
            this.itemLoading = false;
            this.load = true;
            this.page = 1;
            this.diaries = [];
        }
    },
    mounted() {
        //スクロール検知
        window.onscroll = () => {
            //ページ下部までスクロールされたら日記取得
            let bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight ==
                document.documentElement.offsetHeight;
            if (bottomOfWindow) {
                this.getDiaries();
            }
        };
        // const options = {
        //     root: document.querySelector(".observerArea"),
        //     rootMargin: "-100px",
        //     threshold: 0
        // };
        // const callback = this.getDiaries;
        // const observer = new IntersectionObserver(callback, options);
    },
    async created() {
        this.clear();
        await this.readDiaries();
    }
};
</script>
