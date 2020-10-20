<template>
<!-- 会員登録ページ -->
    <div class="register">
        <router-link to="/" tag="h1" class="form__logo"
            ><span class="form__logo--blue">FX</span>日記</router-link
        >
        <div class="form">
            <h2 class="form__title">ユーザー登録</h2>
            <form class="form__content" @submit.prevent="register">
                <div class="form__item">
                    <label class="form__item--label">ユーザー名</label>
                    <input
                        class="form__item--input"
                        type="text"
                        name="name"
                        required
                        v-model="registerForm.name"
                    />
                    <ul v-if="registerErrors" class="form__error">
                        <li
                            v-for="msg in registerErrors.name"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <div class="form__item">
                    <label class="form__item--label">メールアドレス</label>
                    <input
                        class="form__item--input"
                        type="email"
                        name="email"
                        required
                        v-model="registerForm.email"
                    />
                    <ul v-if="registerErrors" class="form__error">
                        <li
                            v-for="msg in registerErrors.email"
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
                        v-model="registerForm.password"
                    />
                    <ul v-if="registerErrors" class="form__error">
                        <li
                            v-for="msg in registerErrors.password"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <div class="form__item">
                    <label class="form__item--label">パスワード(確認)</label>
                    <input
                        class="form__item--input"
                        type="password"
                        name="password_confirmation"
                        required
                        v-model="registerForm.password_confirmation"
                    />
                </div>
                <button class="form__button" type="submit">
                    <vue-loading
                        type="bubbles"
                        color="#fff"
                        :size="{ width: '30px', height: '30px' }"
                        v-if="loading"
                        class="form__button--loading"
                    ></vue-loading
                    >ユーザー登録
                </button>
            </form>
            <a class="google" href="http://localhost:8000/login/google"
                ><i class="fa fa-google" aria-hidden="true"></i
                >Googleアカウントで登録</a
            >
            <router-link class="form__to" to="/login"
                >ログインはこちら</router-link
            >
        </div>
    </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
    components: {
        VueLoading
    },
    data() {
        return {
            // 登録情報
            registerForm: {
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            },
            loading: false
        };
    },
    computed: {
        // 通信ステータス
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        // バリデーションエラー
        registerErrors() {
            return this.$store.state.auth.registerErrorMessages;
        }
    },
    methods: {
        // 会員登録処理
        async register() {
            this.loading = true;
            await this.$store.dispatch("auth/register", this.registerForm);
            this.loading = false;
            if (this.apiStatus) {
                // 登録成功で日記一覧へ移動
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries/list/`);
            }
        },
        // エラーリセット
        clearError() {
            this.$store.commit("auth/setRegisterErrorMessages", null);
        }
    },
    created() {
        this.clearError();
    }
};
</script>
