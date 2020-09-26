<template>
    <div class="register">
        <router-link to="/" tag="h1" class="form__logo"
            ><span class="navbar__logo--blue">FX</span>日記</router-link
        >
        <div class="form">
            <h2 class="form__title">ユーザー登録</h2>
            <form class="form__content" @submit.prevent="register">
                <div class="form__item">
                    <label class="form__item--label">ユーザー名</label>
                    <input
                        class="form__item--input"
                        type="text"
                        id="name"
                        name="name"
                        required
                        value=""
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
                        id="email"
                        name="email"
                        required
                        value=""
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
                        id="password"
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
                        id="password_confirmation"
                        name="password_confirmation"
                        required
                        v-model="registerForm.password_confirmation"
                    />
                </div>
                <button class="form__button" type="submit">
                    <span v-show="loading" class="form__button--loading"></span
                    >ユーザー登録
                </button>
            </form>
            <a class="google" href="http://localhost:8000/login/google"
                ><i class="fa fa-google" aria-hidden="true"></i
                >Googleアカウントで登録</a
            >
            <router-link class="form__to" tag="p" to="/login"
                >ログインはこちら</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        registerErrors() {
            return this.$store.state.auth.registerErrorMessages;
        }
    },
    methods: {
        async register() {
            this.loading = true;
            await this.$store.dispatch("auth/register", this.registerForm);
            this.loading = false;
            if (this.apiStatus) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries`);
            }
        },
        clearError() {
            this.$store.commit("auth/setRegisterErrorMessages", null);
        }
    },
    created() {
        this.clearError();
    }
};
</script>
