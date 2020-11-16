<template>
<!-- 分析ページ -->
    <div>
        <div v-if="diariesCheck">
            <div class="analysis__loading" v-if="loading">
                <vue-loading
                    type="spiningDubbles"
                    color=" #2c77bd"
                    :size="{ width: '70px', height: '70px' }"
                ></vue-loading>
                <p class="analysis__loading--text">Now Loading...</p>
            </div>
            <div class="analysis" v-else>
                <div class="analysis__win-rate">
                    <p class="analysis__title">トレード勝率</p>
                    <p class="analysis__content">
                        {{ winRate }}
                    </p>
                </div>
                <div class="analysis__total">
                    <p class="analysis__title">合計損益</p>
                    <p class="analysis__content" :class="total">
                        {{ totalProfitAndLoss }}
                    </p>
                </div>
                <div class="analysis__currency-chart">
                    <CurrencyChart
                        :currencyData="data.currency"
                    ></CurrencyChart>
                </div>
                <div class="analysis__position-chart">
                    <PositionChart
                        :positionData="data.position"
                    ></PositionChart>
                </div>
            </div>
        </div>
        <div class="diarylist__non" v-else>
            <p>まだ日記が記入されていません</p>
        </div>
    </div>
</template>

<script>
import CurrencyChart from "../../components/CurrencyChart";
import PositionChart from "../../components/PositionChart";
import { VueLoading } from "vue-loading-template";
import { OK, INTERNAL_SERVER_ERROR } from "../../util";
export default {
    components: {
        CurrencyChart,
        PositionChart,
        VueLoading
    },
    data() {
        return {
            data: null,
            loading: true,
            //合計損益によりスタイル操作
            total: "profit"
        };
    },
    computed: {
        // 勝率フォーマット変更
        winRate() {
            return this.data.winRate + "%";
        },
        // 合計損益フォーマット変更
        totalProfitAndLoss() {
            return this.data.totalProfitAndLoss < 0
                ? this.data.totalProfitAndLoss + "円"
                : "+" + this.data.totalProfitAndLoss + "円";
        },
        // 日記が１つ以上記入してあるかチェック
        diariesCheck() {
            return this.$store.getters["diaries/check"];
        }
    },
    methods: {
        //API通信データ取得
        async readAnalysis() {
            const response = await axios
                .get("/api/analysis")
                .catch(err => err.response || err);

            if (response.status === OK) {
                this.data = response.data;
                //合計損益がマイナスならloss代入
                if (this.data.totalProfitAndLoss < 0) {
                    this.total = "loss";
                }
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }

            this.loading = false;
        }
    },
    async created() {
        // 日記が１つ以上あるなら通信を行う
        if (this.diariesCheck) {
            await this.readAnalysis();
        }
    }
};
</script>
