<template>
<!-- ログインしたユーザーのみアクセスできるページ -->
    <div class="userpage">
        <div class="navbar">
            <router-link :to="{ name: 'diariesList' }" class="navbar__item"
                ><i class="fa fa-list-ol navbar__icon" aria-hidden="true"></i
                >MY日記</router-link
            >
            <router-link :to="{ name: 'analysis' }" class="navbar__item"
                ><i class="fa fa-pie-chart navbar__icon" aria-hidden="true"></i
                >分析</router-link
            >
            <router-link :to="{ name: 'share' }" class="navbar__item"
                ><i class="fa fa-share-alt navbar__icon" aria-hidden="true"></i
                >日記共有</router-link
            >
        </div>
        <div class="contents">
            <router-view></router-view>
        </div>
        <div class="footer">
            <p class="footer__text">Copyright ©FX日記. All Rights Reserved.</p>
            <button class="footer__button" @click="logout">ログアウト</button>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        //API通信ステータス
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        //ログイン中ユーザーの名前
        userName() {
            return this.$store.getters["auth/userName"];
        }
    },
    methods: {
        //ログアウト
        async logout() {
            await this.$store.dispatch("auth/logout");
            //API通信が成功したらトップページへ移動
            if (this.apiStatus) {
                this.$router.push("/");
            }
        }
    }
};
</script>