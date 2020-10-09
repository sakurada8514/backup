<template>
    <div class="login">
        <router-link to="/" tag="h1" class="form__logo"
            ><span class="form__logo--blue">FX</span>日記</router-link
        >
        <div class="form">
            <h2 class="form__title">ログイン</h2>
            <form class="form__content" @submit.prevent="login">
                <div class="form__item">
                    <label class="form__item--label">メールアドレス</label>
                    <input
                        class="form__item--input"
                        type="text"
                        name="email"
                        required
                        v-model="loginForm.email"
                    />
                    <ul v-if="loginErrors" class="form__error">
                        <li
                            v-for="msg in loginErrors.email"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <div class="form__item">
                    <label class="form__item--label">パスワード</label>
                    <input
                        class="form__item--input"
                        type="password"
                        name="password"
                        required
                        v-model="loginForm.password"
                    />
                    <ul v-if="loginErrors" class="form__error">
                        <li
                            v-for="msg in loginErrors.password"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <button class="form__button" type="submit">
                    <span v-show="loading" class="form__button--loading"></span
                    >ログイン
                </button>
            </form>
            <a class="google" href="http://localhost:8000/login/google"
                ><i class="fa fa-google" aria-hidden="true"></i
                >Googleアカウントでログイン</a
            >
            <router-link class="form__to" tag="p" to="/register"
                >ユーザー登録はこちら</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
                remember: "on"
            },
            loading: false
        };
    },
    computed: {
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        loginErrors() {
            return this.$store.state.auth.loginErrorMessages;
        }
    },
    methods: {
        async login() {
            this.loading = true;
            await this.$store.dispatch("auth/login", this.loginForm);
            this.loading = false;
            if (this.apiStatus) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries/list/`);
            }
        },
        //ページ移動ごとにエラーリセット
        clearError() {
            this.$store.commit("auth/setRegisterErrorMessages", null);
        }
    },
    created() {
        this.clearError();
    }
};
</script>
