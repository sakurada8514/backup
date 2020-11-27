<template>
    <!-- マイ日記一覧ページ -->
    <div class="diarylist">
        <Diary
            v-for="diary in diaries"
            :key="`my-${diary.id}`"
            :item="diary"
        ></Diary>
        <div class="diarylist__non" v-if="diariesStatus">
            <p>まだ日記が記入されていません</p>
            <p>右下のボタンから日記を記入しましょう</p>
        </div>
    </div>
</template>

<script>
import Diary from "../../../components/Diary";
export default {
    components: {
        Diary
    },
    data() {
        return {
            diaries: []
        };
    },
    computed: {
        //日記が一つ以上あるかチェック
        diariesStatus() {
            return this.diaries.length === 0;
        }
    },
    methods: {
        //日記一覧取得
        readDiaries() {
            this.diaries = this.$store.state.diaries.diaries;
        }
    },
    created() {
        this.readDiaries();
    }
};
</script>
