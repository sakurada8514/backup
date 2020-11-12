<template>
<!-- マイ日記詳細ページ -->
    <div class="diary-detail">
        <div class="diary-detail__content">
            <h1 class="diary-create__title">日記詳細</h1>
            <div class="diary-detail__menu" @click="menuOpen = !menuOpen">
                <div class="diary-detail__menu--button">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div v-show="menuOpen" class="diary-detail__menu--content">
                <div class="diary-detail__menu--item">
                    <router-link tag="p" :to="{ name: 'edit' }"
                        ><i class="fa fa-pencil" aria-hidden="true"></i
                        >編集</router-link
                    >
                </div>
                <div
                    class="diary-detail__menu--item"
                    @click="modalOpen = !modalOpen"
                >
                    <button>
                        <i class="fa fa-trash" aria-hidden="true"></i>削除
                    </button>
                </div>
            </div>
            <div v-show="modalOpen" class="modal">
                <div class="modal__content">
                    <p>削除してもよろしいですか？</p>
                    <div class="modal__select">
                        <button
                            class="modal__button"
                            @click="
                                modalOpen = false;
                                menuOpen = false;
                            "
                        >
                            キャンセル
                        </button>
                        <button class="modal__button" @click="destroy">
                            削除
                        </button>
                    </div>
                </div>
            </div>
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
                    <p class="diary__result diary-detail__item--content" :class="diary.result">
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
            <h2 v-if="!show" class="diary-detail__title">エグジット</h2>
            <div class="diary-detail__settlement" v-if="!show">
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
            <button class="diary-detail__button" @click="back">
                一覧へ戻る
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            diary: null,
            menuOpen: false,
            modalOpen: false
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
        show() {
            return this.diary.result === "entry";
        },
        //API通信ステータス
        apiStatus() {
            return this.$store.state.diaries.apiStatus;
        }
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
        //日記削除処理
        async destroy() {
            const id = Number(this.$route.params["id"]);
            await this.$store.dispatch("diaries/delete", id);
            if (this.apiStatus) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries/list/`);
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
            const result = dateJp +  time + " " + dayJp;
            return result;
        }
    },
    created() {
        this.readDiary();
    }
};
</script>
