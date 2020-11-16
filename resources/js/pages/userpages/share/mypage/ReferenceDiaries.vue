<template>
    <!-- ログイン中ユーザーがいいねした日記一覧ページ -->
    <div class="share-list">
        <div class="mypage__loading" v-if="loading">
            <vue-loading
                type="spiningDubbles"
                color=" #2c77bd"
                :size="{ width: '70px', height: '70px' }"
            ></vue-loading>
            <p class="analysis__loading--text">Now Loading...</p>
        </div>
        <ShareDiary
            v-for="diary in diaries"
            :key="`reference-${diary.id}`"
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
import { OK } from "../../../../util";
import ShareDiary from "../../../../components/ShareDiary";
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
            load: false,
            //無限スクロール読み込みローディング
            itemLoading: false
        };
    },
    methods: {
        //無限スクロール日記データ代入
        async getDiaries() {
            //無限スクロール読み込み可、不可
            if (this.load) {
                //読み込み中は読み込めないようにする
                if (!this.itemLoading) {
                    this.itemLoading = true;

                    const response = await axios
                        .get("/api/user/share/reference?page=" + this.page)
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
                .get("/api/user/share/reference?page=1")
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.diaries = response.data.data;
                this.page++;
                //総ページ数代入
                this.lastPage = response.data.last_page;
                this.load = true;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }

            this.loading = false;
        },
        //リセット処理
        clear() {
            this.itemLoading = false;
            this.load = false;
            this.page = 1;
            this.diaries = [];
        }
    },
    async created() {
        this.clear();
        await this.readDiaries();

        //スクロール位置検知
        if (this.load) {
            window.onscroll = () => {
                //ページ下部までスクロールされたら日記取得
                let bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight ==
                    document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.getDiaries();
                }
            };
        }
    }
};
</script>
