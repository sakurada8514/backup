<template>
    <router-link
        class="diary"
        tag="div"
        :to="{ name: 'diaryDetail', params: { name: userName, id: item.id } }"
    >
        <div class="diary__date">
            <p>{{ entryDay }}</p>
        </div>
        <div class="diary__content">
            <div class="diary__left">
                <div class="diary__left--item">
                    <p class="diary__title">取引通貨</p>
                    <p>{{ item.currency }}</p>
                </div>
                <div :class="item.result" class="diary__left--item">
                    <p class="diary__title">結果</p>
                    <p class="diary__result" :class="item.result">
                        <span v-if="item.result === 'win'">利確</span>
                        <span v-else-if="item.result === 'lose'">損切り</span>
                        <span v-else>エントリー中</span>
                        {{ item.settlement }}<span v-if="item.result !== 'entry'">円</span>
                    </p>
                </div>
            </div>
            <div class="diary__right">
                <div class="diary__right--item">
                    <p class="diary__title">エントリー理由</p>
                    <p class="diary__text">
                        {{ rationale }}
                    </p>
                </div>
                <div class="diary__right--item">
                    <p class="diary__title">反省</p>
                    <p v-if="item.result === 'entry'">
                        エグジット後記入してください
                    </p>
                    <p v-else>
                        {{ reflection }}
                    </p>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        //ログイン中ユーザーの名前
        userName() {
            return this.$store.getters["auth/userName"];
        },
        //文章省略
        rationale() {
            let rationale = this.item.rationale;
            return this.abridgement(rationale);
        },
        reflection() {
            let reflection = this.item.reflection || "";
            return this.abridgement(reflection);
        },
        //日時日本語化処理
        entryDay() {
            const dateTime = this.item.entry_at.split(" ");
            const date = dateTime[0];
            const dateJp = date.replace("-", "年").replace("-", "月") + "日 ";
            const time = dateTime[1].slice(0, 5);
            const dayData = date.split("-");
            const day = new Date(dayData[0], dayData[1], dayData[2]);
            const weekJp = ["日", "月", "火", "水", "木", "金", "土"];
            const dayJp = weekJp[day.getDay()];
            const entryDay = dateJp + time + " " + dayJp;
            return entryDay;
        },

    },
    methods: {
        //文章省略処理
        abridgement(text) {
            if (text.length > 50) {
                return text.slice(0, 50) + "...";
            } else {
                return text;
            }
        }
    }
};
</script>
