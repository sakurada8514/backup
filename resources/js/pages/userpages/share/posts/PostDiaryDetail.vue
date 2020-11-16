<template>
<!-- 共有する日記投稿ページ -->
    <div class="diary-detail">
        <div class="diaries-posts__form">
            <h1 class="diaries-posts__form--title">この日記を共有しますか？</h1>
            <p class="diaries-posts__form--label">日記タイトル</p>
            <input
                class="diaries-posts__form--input"
                type="text"
                placeholder="例：EUR/USDショート 100pips利確トレード"
                required
                v-model="formData.title"
            />
            <div v-if="errorMessages" class="form__error">
                <ul>
                    <li
                        v-for="msg in errorMessages.title"
                        :key="msg"
                        class="form__error--msg"
                    >
                        {{ msg }}
                    </li>
                </ul>
                <p class="form__error--msg " v-if="errorMessages.id">この日記は既に共有しています。他の日記を選択してください。</p>
            </div>
            <div class="diaries-posts__form--buttonarea">
                <button class="diaries-posts__form--button" @click="back">
                    一覧へ戻る
                </button>
                <button class="diaries-posts__form--button" @click="share">
                    <vue-loading
                        type="bubbles"
                        color="#fff"
                        :size="{ width: '20px', height: '20px' }"
                        v-if="loading"
                        class="diaries-posts__form--loading"
                    ></vue-loading>
                    共有する
                </button>
            </div>
        </div>
        <div class="diary-detail__content">
            <h1 class="diary-create__title">日記詳細</h1>
            <div class="diary-detail__info">
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">取引通貨</p>
                    <p class="diary-detail__item--content">{{ diary.currency }}</p>
                </div>
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">ロット数</p>
                    <p class="diary-detail__item--content">{{ diary.lot }}</p>
                </div>
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">エントリー方向</p>
                    <p class="diary-detail__item--content">{{ diary.position }}</p>
                </div>
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">結果</p>
                    <p class="diary__result  diary-detail__item--content" :class="diary.result">
                        <span v-if="diary.result === 'win'">利確</span>
                        <span v-else-if="diary.result === 'lose'">損切り</span>
                        <span v-else>エントリー中</span>
                        {{ diary.settlement
                        }}<span v-if="diary.result !== 'entry'">円</span>
                    </p>
                </div>
            </div>
            <h2 class="diary-detail__title">エントリー</h2>
            <div class="diary-detail__settlement">
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">レート</p>
                    <p class="diary-detail__item--content">{{ diary.entry_rate }}</p>
                </div>
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">日時</p>
                    <p class="diary-detail__item--content day">{{ entryDay }}</p>
                </div>
                <div class="diary-detail__item--text">
                    <p class="diary-detail__item--title under">理由</p>
                    <p class="detail-text">{{ diary.rationale }}</p>
                </div>
                <div class="diary-detail__item--img" v-if="diary.entry_img_url">
                    <p class="diary-detail__item--title under">写真</p>
                    <img
                        class="diary-detail__img"
                        :src="diary.entry_img_url"
                        alt=""
                    />
                </div>
            </div>
            <h2 class="diary-detail__title">エグジット</h2>
            <div class="diary-detail__settlement">
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">レート</p>
                    <p class="diary-detail__item--content">{{ diary.exit_rate }}</p>
                </div>
                <div class="diary-detail__item">
                    <p class="diary-detail__item--title">日時</p>
                    <p class="diary-detail__item--content day">{{ exitDay }}</p>
                </div>
                <div class="diary-detail__item--text">
                    <p class="diary-detail__item--title under">反省</p>
                    <p class="detail-text">{{ diary.reflection }}</p>
                </div>
                <div class="diary-detail__item--img" v-if="diary.exit_img_url">
                    <p class="diary-detail__item--title under">写真</p>
                    <img
                        class="diary-detail__img"
                        :src="diary.exit_img_url"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { OK, UNPROCESSABLE_ENTITY } from "../../../../util";
import { VueLoading } from "vue-loading-template";
export default {
    components: {
        VueLoading
    },
    data() {
        return {
            diary: null,
            formData: {
                title: "",
                id: ""
            },
            errorMessages: null,
            loading: false
        };
    },
    computed: {
        //エントリー日時日本語化
        entryDay() {
            const entryDay = this.diary.entry_at;
            return this.chengeJp(entryDay);
        },
        //エグジット日時日本語化
        exitDay() {
            const exitDay = this.diary.exit_at;
            return this.chengeJp(exitDay);
        },
    },
    methods: {
        //日記取得
        readDiary() {
            const id = Number(this.$route.params["id"]);
            const diaries = this.$store.state.diaries.diaries;
            for (let diary of diaries) {
                if (diary.id === id) {
                    this.diary = diary;
                    break;
                }
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
            const day = new Date(dayData[0], (dayData[1]-1), dayData[2]);
            const weekJp = ["日", "月", "火", "水", "木", "金", "土"];
            const dayJp = weekJp[day.getDay()];
            const result = dateJp + time + " " + dayJp;
            return result;
        },
        //日記投稿処理
        async share() {
            this.loading = true;
            const data = this.formData;
            const response = await axios
                .post("/api/share", data)
                .catch(err => err.response || err);

            //通信成功したら共有日記一覧へ移動
            if (response.status === OK) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push({
                    name: "share",
                    params: { name: userName }
                });
            //バリデーション
            } else if (response.status === UNPROCESSABLE_ENTITY) {
                this.errorMessages = response.data.errors;
            //システムエラー
            } else {
                this.$store.commit("error/setCode", response.status);
            }

            this.loading = false;
        }
    },
    created() {
        this.readDiary();
        this.formData.id = Number(this.$route.params["id"]);
    }
};
</script>
