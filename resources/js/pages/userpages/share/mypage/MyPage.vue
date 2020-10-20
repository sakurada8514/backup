<template>
<!-- ユーザーページ -->
    <div class="mypage">
        <div class="profile">
            <div class="modal" v-show="profileEditShow">
                <div class="modal__content">
                    <output class="modal__preview" v-if="preview">
                        <img :src="preview" alt="" />
                    </output>
                    <i
                        class="fa fa-user-circle profile__icon"
                        aria-hidden="true"
                        v-else
                    ></i>
                    <input
                        class="modal__file"
                        type="file"
                        name="profileImg"
                        @change="onFileChenge"
                    />

                    <p class="modal__name">ニックネーム</p>
                    <input
                        class="modal__name--input"
                        type="text"
                        v-model="profileName"
                    />
                    <ul v-if="errors" class="form__error">
                        <li
                            v-for="msg in errors.img"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                    <ul v-if="errors" class="form__error">
                        <li
                            v-for="msg in errors.name"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                    <button class="modal__button cancel" @click="cancel">
                        キャンセル
                    </button>
                    <button class="modal__button" @click="update">
                        保存
                    </button>
                </div>
            </div>
            <div class="profile__img">
                <img :src="user.img_url" alt="" v-if="user.img_url" />
                <i
                    class="fa fa-user-circle profile__icon"
                    aria-hidden="true"
                    v-else
                ></i>
            </div>
            <div class="profile__name">
                <p>{{ user.name }}</p>
                <button class="profile__edit" @click="profileEditShow = true">
                    プロフィール編集
                </button>
            </div>
        </div>
        <div class="mysharediaries">
            <div class="mysharediaries__nav">
                <router-link
                    class="mysharediaries__nav--item"
                    :to="{ name: 'mysharediaries' }"
                    exact
                    >公開した日記</router-link
                >
                <router-link
                    class="mysharediaries__nav--item"
                    :to="{ name: 'reference' }"
                    >参考にした日記</router-link
                >
            </div>
            <div class="mysharediaries__content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: null,
            preview: null,
            profileImg: "",
            profileName: "",
            profileEditShow: false
        };
    },
    computed: {
        //API通信ステータス
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
        //バリデーションエラー
        errors() {
            return this.$store.state.auth.profileErrorMessages;
        }
    },
    methods: {
        //プロフィール画像プレビュー
        onFileChenge(event) {
            if (event.target.files.length === 0) {
                this.resetPreview();
                return;
            }

            if (!event.target.files[0].type.match("image.*")) {
                this.resetPreview();
                return;
            }

            const render = new FileReader();

            render.onload = e => {
                this.preview = e.target.result;
            };

            render.readAsDataURL(event.target.files[0]);

            this.profileImg = event.target.files[0];
        },
        resetPreview() {
            this.preview = "";
            this.$el.querySelector(".modal__file").value = null;
        },
        //プロフィール編集
        async update() {
            let formData = new FormData();
            formData.append("img", this.profileImg);
            formData.append("name", this.profileName);
            await this.$store.dispatch("auth/profileUpdate", formData);

            if (this.apiStatus) {
                this.user = this.$store.state.auth.user;
                this.profileEditShow = false;
            }
        },
        //編集キャンセル
        cancel() {
            this.profileEditShow = false;
            this.preview = this.user.img_url || null;
            this.crearError();
        },
        //エラークリア
        crearError() {
            this.$store.commit("auth/setProfileErrorMessages", null);
        }
    },
    created() {
        //ストアからユーザー情報読み込み
        this.user = this.$store.state.auth.user;
        this.preview = this.user.img_url || null;
        this.profileName = this.user.name;
    }
};
</script>
