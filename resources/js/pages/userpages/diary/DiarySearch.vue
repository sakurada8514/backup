<template>
    <div class="search">
        <div class="search-form">
            <h1 class="search-form__title">日記検索</h1>
            <div class="search-form__content">
                <div class="search-form__item">
                    <label class="search-form__item--label" for="currency"
                        >取引通貨</label
                    >
                    <input
                        class="search-form__item--input"
                        type="text"
                        name="currency"
                        placeholder="例:EUR/USD"
                        v-model="searchForm.currency"
                    />
                </div>
                <div class="search-form__item">
                    <label class="search-form__item--label" for="entry_at"
                        >年月</label
                    >
                    <input
                        class="search-form__item--input"
                        type="month"
                        name="entry_at"
                        min="2018-01"
                        max="2022-12"
                        v-model="searchForm.entry_at"
                    />
                </div>
                <div class="search-form__item">
                    <label class="search-form__item--label radio" for="position"
                        >エントリー方向</label
                    >
                    <input
                        class="search-form__item--radio"
                        name="position"
                        type="radio"
                        value="ロング"
                        v-model="searchForm.position"
                    /><span>ロング</span>
                    <input
                        class="search-form__item--radio"
                        name="position"
                        type="radio"
                        value="ショート"
                        v-model="searchForm.position"
                    /><span>ショート</span>
                </div>
                <div class="search-form__item">
                    <label class="search-form__item--label radio" for="result"
                        >結果</label
                    >
                    <input
                        class="search-form__item--radio"
                        name="result"
                        type="radio"
                        value="entry"
                        checked
                        v-model="searchForm.result"
                    /><span>エントリー中</span>
                    <input
                        class="search-form__item--radio"
                        name="result"
                        type="radio"
                        value="win"
                        v-model="searchForm.result"
                    /><span>利確</span>
                    <input
                        class="search-form__item--radio"
                        name="result"
                        type="radio"
                        value="lose"
                        v-model="searchForm.result"
                    /><span>損切り</span>
                </div>
            </div>
            <div class="search-form__buttonarea">
                <button class="search-form__button" @click="searchDiaries">
                    検索
                </button>
                <button class="search-form__button" @click="reset">
                    リセット
                </button>
            </div>
        </div>
        <div class="search__count" v-show="show">
            <p v-if="diariesCount > 0">{{ diariesCount }}件ヒットしました</p>
            <p v-else>検索結果がありません</p>
        </div>
        <Diary
            v-for="diary in filterResult"
            :key="diary.id"
            :item="diary"
        ></Diary>
    </div>
</template>

<script>
import Diary from "./Diary";
export default {
    components: {
        Diary
    },
    data() {
        return {
            searchForm: {
                currency: "",
                position: "",
                result: "",
                entry_at: ""
            },
            diariesData: [],
            filterResult: [],
            show: false
        };
    },
    methods: {
        //ページ読み込み時データ取得処理
        readDiaries() {
            //日記一覧データをストアから取得
            this.diariesData = this.$store.state.diaries.diaries;

            //検索結果一覧をストアから取得
            const storeSearchResultDiaries = this.$store.state.diaries.searchResultDiaries;
            this.filterResult = storeSearchResultDiaries;

            //検索条件をストアから取得
            const storeSearchFormData = this.$store.state.diaries.searchFormData;

            //検索条件があれば代入
            if (storeSearchFormData) {
                this.searchForm = storeSearchFormData;
            }

            //検索結果一覧が一つ以上あれば表示
            if(storeSearchResultDiaries.length > 0) {
                this.show = true;
            }
        },
        //検索処理
        searchDiaries() {
            let form = this.searchForm;
            let filterResult = this.diariesData;

            //各検索条件でフィルターをかける
            if (form.currency) {
                filterResult = filterResult.filter(function(diary) {
                    return diary.currency.indexOf(form.currency) > -1;
                });
            }
            if (form.position) {
                filterResult = filterResult.filter(function(diary) {
                    return diary.position.indexOf(form.position) > -1;
                });
            }
            if (form.result) {
                filterResult = filterResult.filter(function(diary) {
                    return diary.result.indexOf(form.result) > -1;
                });
            }
            if (form.entry_at) {
                filterResult = filterResult.filter(function(diary) {
                    return diary.entry_at.indexOf(form.entry_at) > -1;
                });
            }

            this.show = true;
            //フィルター後の日記一覧を代入
            this.filterResult = filterResult;

            //検索結果一覧を検索条件をページ移動しても維持する為ストアに保存
            this.$store.commit("diaries/setsearchResultDiaries", filterResult);
            this.$store.commit("diaries/setsearchFormData", form);
        },
        //検索条件リセット処理
        reset() {
            for (let key in this.searchForm) {
                this.searchForm[key] = "";
            }
            this.filterResult = [];
            this.show = false;
            this.$store.commit("diaries/setsearchResultDiaries", this.filterResult);
            this.$store.commit("diaries/setsearchFormData", null);
        }
    },
    computed: {
        //検索結果の件数取得
        diariesCount() {
            return this.filterResult.length;
        }
    },
    created() {
        this.readDiaries();
    }
};
</script>
