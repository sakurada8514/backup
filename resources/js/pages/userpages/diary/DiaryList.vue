<template>
    <div class="diarylist">
        <router-link :to="{ name: 'create' }" class="toDiaryCreateForm"
            ><i class="fa fa-pencil" aria-hidden="true"></i
        ></router-link>
        <router-link :to="{ name: 'search' }" class="toDiarySearch"
            ><i class="fa fa-search" aria-hidden="true"></i></router-link>
        <Diary v-for="diary in diaries" :key="diary.id" :item="diary"></Diary>
        <infinite-loading @infinite="infiniteHandler" spinner="spiral">
            <div slot="spinner">ロード中...</div>
            <div slot="no-more"></div>
            <div class="diarylist__non" slot="no-results"></div>
        </infinite-loading>
        <div class="diarylist__non" v-if="diariesStatus">
            <p>まだ日記が記入されていません</p>
            <p>右下のボタンから日記を記入しましょう</p>
        </div>
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
            diaries: [],
            diariesData: [],
            start: 0,
            end: 15
        };
    },
    computed: {
        diariesStatus() {
            return this.diaries.length === 0;
        }
    },
    methods: {
        //日記一覧取得
        readDiaries() {
            this.diariesData = this.$store.state.diaries.diaries;
        },
        //無限スクロール
        infiniteHandler($state) {
            if (this.start < this.diariesData.length) {
                // 表示するデータがある場合
                this.getDiaries();
                $state.loaded();
            } else {
                // 表示するデータが無くなった場合
                $state.complete();
            }
        },
        //無限スクロール日記データ代入
        getDiaries() {
            this.diaries = this.diaries.concat(
                this.diariesData.slice(this.start, this.end)
            );
            this.start += 15;
            this.end += 15;
        }
    },
    created() {
        this.readDiaries();
    }
};
</script>
