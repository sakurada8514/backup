<template>
<!-- 共有日記詳細ページ -->
    <div class="diary-detail">
        <div class="analysis__loading" v-if="loading">
            <vue-loading
                type="spiningDubbles"
                color=" #2c77bd"
                :size="{ width: '70px', height: '70px' }"
            ></vue-loading>
            <p class="analysis__loading--text">Now Loading...</p>
        </div>
        <div v-else>
            <div class="share-diary__user">
                <div class="share-diary__user--img">
                    <img
                        v-if="diary.users.img_url"
                        :src="diary.users.img_url"
                        alt=""
                    />
                    <i
                        class="fa fa-user-circle profile__icon"
                        aria-hidden="true"
                        v-else
                    ></i>
                </div>
                <div class="share-diary__user--info">
                    <p class="share-diary__user--name">
                        {{ diary.users.name }}
                    </p>
                    <p class="share-diary__user--day">{{ createdDay }}</p>
                </div>
            </div>
            <div class="share-diary__title">{{ diary.title }}</div>
            <button
                class="share-diary-detail__reference"
                :class="{
                    'share-diary-detail__reference--active': referencedByUser
                }"
                @click="submit"
            >
                <i class="fa fa-thumbs-up" aria-hidden="true"></i
                >{{ referenceCount }}
            </button>
            <div class="diary-detail__content">
                <h1 class="diary-create__title">日記詳細</h1>
                <div class="diary-detail__info">
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">取引通貨</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diaries.currency }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">ロット数</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diaries.lot }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">エントリー方向</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diaries.position }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">結果</p>
                        <p
                            class="diary__result  diary-detail__item--content"
                            :class="diary.diaries.result"
                        >
                            <span v-if="diary.diaries.result === 'win'"
                                >利確</span
                            >
                            <span v-else-if="diary.diaries.result === 'lose'"
                                >損切り</span
                            >
                            <span v-else>エントリー中</span>
                            {{ diary.diaries.settlement
                            }}<span v-if="diary.diaries.result !== 'entry'"
                                >円</span
                            >
                        </p>
                    </div>
                </div>
                <h2 class="diary-detail__title">エントリー</h2>
                <div class="diary-detail__settlement">
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">レート</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diaries.entry_rate }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">日時</p>
                        <p class="diary-detail__item--content day">
                            {{ entryDay }}
                        </p>
                    </div>
                    <div class="diary-detail__item--text">
                        <p class="diary-detail__item--title under">理由</p>
                        <p>{{ diary.diaries.rationale }}</p>
                    </div>
                    <div
                        class="diary-detail__item--img"
                        v-if="diary.diaries.entry_img_url"
                    >
                        <p class="diary-detail__item--title under">写真</p>
                        <img
                            class="diary-detail__img"
                            :src="diary.diaries.entry_img_url"
                            alt=""
                        />
                    </div>
                </div>
                <h2 class="diary-detail__title">エグジット</h2>
                <div class="diary-detail__settlement">
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">レート</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diaries.exit_rate }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">日時</p>
                        <p class="diary-detail__item--content day">
                            {{ exitDay }}
                        </p>
                    </div>
                    <div class="diary-detail__item--text">
                        <p class="diary-detail__item--title under">反省</p>
                        <p>{{ diary.diaries.reflection }}</p>
                    </div>
                    <div
                        class="diary-detail__item--img"
                        v-if="diary.diaries.exit_img_url"
                    >
                        <p class="diary-detail__item--title under">写真</p>
                        <img
                            class="diary-detail__img"
                            :src="diary.diaries.exit_img_url"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
import { OK } from "../../../util";
export default {
    components: {
        VueLoading
    },
    data() {
        return {
            diary: null,
            referenceCount: 0,
            referencedByUser: false,
            loading: true
        };
    },
    computed: {
        //エントリー日時日本語化
        entryDay() {
            const entryDay = this.diary.diaries.entry_at;
            return this.chengeJp(entryDay);
        },
        //エグジット日時日本語化
        exitDay() {
            const exitDay = this.diary.diaries.exit_at;
            return this.chengeJp(exitDay);
        },
        //日時日本語化処理
        createdDay() {
            const dateTime = this.diary.created_at.split(" ");
            const date = dateTime[0];
            const dateJp = date.replace("-", "年").replace("-", "月") + "日 ";
            const time = dateTime[1].slice(0, 5);
            const createdDay = dateJp + time;
            return createdDay;
        }
    },
    methods: {
        //日記取得
        async readDiary() {
            const id = Number(this.$route.params["id"]);
            // console.log(id);
            const response = await axios
                .get(`/api/share/${id}`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.diary = response.data;
                this.referenceCount = response.data.references_count;
                this.referencedByUser = response.data.referenced_by_user;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }

            this.loading = false;
        },
        //ログイン中ユーザーがいいね済ならいいね解除処理、いいねしていないならいいね付与処理
        async submit() {
            this.referencedByUser
                ? await this.unReference()
                : await this.reference();
        },
        //いいね付与処理
        async reference() {
            const id = Number(this.$route.params["id"]);
            //API通信
            const response = await axios
                .post(`/api/share/${id}/reference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でカウントに1プラス
                this.referenceCount++;
                //いいね済に変更
                this.referencedByUser = true;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //いいね解除処理
        async unReference() {
            const id = Number(this.$route.params["id"]);
            //API通信
            const response = await axios
                .post(`/api/share/${id}/unreference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でカウント1マイナス
                this.referenceCount--;
                //いいね未へ変更
                this.referencedByUser = false;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //ページ戻る
        back() {
            this.$router.go(-1);
        },
        //日時日本語化処理
        chengeJp(data) {
            if (!data) {
                return null;
            }
            const dateTime = data.split(" ");
            const date = dateTime[0];
            const dateJp = date.replace("-", "年").replace("-", "月") + "日 ";
            const time = dateTime[1].slice(0, 5);
            const dayData = date.split("-");
            const day = new Date(dayData[0], dayData[1], dayData[2]);
            const weekJp = ["日", "月", "火", "水", "木", "金", "土"];
            const dayJp = weekJp[day.getDay()];
            const result = dateJp + time + " " + dayJp;
            return result;
        }
    },
    created() {
        this.readDiary();
    }
};
</script>
