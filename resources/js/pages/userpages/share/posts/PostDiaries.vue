<template>
<!-- 共有する日記選択ページ -->
    <div class="diaries-posts">
        <h1 class="diaries-posts__title">共有する日記を選択してください</h1>
        <PostDiary
            v-for="diary in diaries"
            :key="diary.id"
            :item="diary"
        ></PostDiary>
    </div>
</template>

<script>
import PostDiary from "../../../../components/PostDiary";
export default {
    components: {
        PostDiary
    },
    data() {
        return {
            diaries: []
        };
    },
    methods: {
        //日記一覧取得
        readDiaries() {
            this.diaries = this.$store.getters["diaries/exitDiaries"];
        }
    },
    created() {
        this.readDiaries();
    }
};
</script>
