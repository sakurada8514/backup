<template>
    <!-- 共有日記詳細ページ -->
    <div class="diary-detail">
        <div class="analysis__loading" v-if="loading">
            <vue-loading
                type="spiningDubbles"
                color=" #2c77bd"
                :size="{ width: '70px', height: '70px' }"
            ></vue-loading>
            <p class="analysis__loading--text">Now Loading...</p>
        </div>
        <div v-else>
            <div v-show="modalOpen" class="modal">
                <div class="modal__content">
                    <p>共有した日記を削除してもよろしいですか？</p>
                    <p>※元のMY日記は削除されません</p>
                    <div class="modal__select">
                        <button
                            class="modal__button"
                            @click="modalOpen = false"
                        >
                            キャンセル
                        </button>
                        <button class="modal__button" @click="destroy">
                            削除
                        </button>
                    </div>
                </div>
            </div>
            <div class="share-diary__user">
                <div class="share-diary__user--img">
                    <img
                        v-if="diary.user.img_url"
                        :src="diary.user.img_url"
                        alt=""
                    />
                    <i
                        class="fa fa-user-circle profile__icon"
                        aria-hidden="true"
                        v-else
                    ></i>
                </div>
                <div class="share-diary__user--info">
                    <p class="share-diary__user--name">
                        {{ diary.user.name }}
                    </p>
                    <p class="share-diary__user--day">{{ createdDay }}</p>
                </div>
            </div>
            <div class="share-diary__title">{{ diary.title }}</div>
            <button
                class="share-diary-detail__reference"
                :class="{
                    'share-diary-detail__reference--active': referencedByUser
                }"
                @click="submit"
            >
                <i
                    class="fa fa-thumbs-up"
                    aria-hidden="true"
                    :class="{ reference__active: active }"
                ></i
                >{{ referenceCount }}
            </button>
            <button
                class="share-diary__delete"
                @click="modalOpen = true"
                v-if="loginUserId === postUserId"
            >
                削除
            </button>
            <div class="diary-detail__content">
                <h1 class="diary-create__title">日記詳細</h1>
                <div class="diary-detail__info">
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">取引通貨</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diary.currency }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">ロット数</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diary.lot }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">エントリー方向</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diary.position }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">結果</p>
                        <p
                            class="diary__result  diary-detail__item--content"
                            :class="diary.diary.result"
                        >
                            <span v-if="diary.diary.result === 'win'"
                                >利確</span
                            >
                            <span v-else-if="diary.diary.result === 'lose'"
                                >損切り</span
                            >
                            <span v-else>エントリー中</span>
                            {{ diary.diary.settlement
                            }}<span v-if="diary.diary.result !== 'entry'"
                                >円</span
                            >
                        </p>
                    </div>
                </div>
                <h2 class="diary-detail__title">エントリー</h2>
                <div class="diary-detail__settlement">
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">レート</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diary.entry_rate }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">日時</p>
                        <p class="diary-detail__item--content day">
                            {{ entryDay }}
                        </p>
                    </div>
                    <div class="diary-detail__item--text">
                        <p class="diary-detail__item--title under">理由</p>
                        <p class="detail-text">{{ diary.diary.rationale }}</p>
                    </div>
                    <div
                        class="diary-detail__item--img"
                        v-if="diary.diary.entry_img_url"
                    >
                        <p class="diary-detail__item--title under">写真</p>
                        <img
                            class="diary-detail__img"
                            :src="diary.diary.entry_img_url"
                            alt=""
                        />
                    </div>
                </div>
                <h2 class="diary-detail__title">エグジット</h2>
                <div class="diary-detail__settlement">
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">レート</p>
                        <p class="diary-detail__item--content">
                            {{ diary.diary.exit_rate }}
                        </p>
                    </div>
                    <div class="diary-detail__item">
                        <p class="diary-detail__item--title">日時</p>
                        <p class="diary-detail__item--content day">
                            {{ exitDay }}
                        </p>
                    </div>
                    <div class="diary-detail__item--text">
                        <p class="diary-detail__item--title under">反省</p>
                        <p class="detail-text">{{ diary.diary.reflection }}</p>
                    </div>
                    <div
                        class="diary-detail__item--img"
                        v-if="diary.diary.exit_img_url"
                    >
                        <p class="diary-detail__item--title under">写真</p>
                        <img
                            class="diary-detail__img"
                            :src="diary.diary.exit_img_url"
                            alt=""
                        />
                    </div>
                </div>
                <div class="diary-detail__comments">
                    <h2 class="diary-detail__comments--title">
                        <i class="fa fa-comments" aria-hidden="true"></i
                        >コメント
                    </h2>
                    <div class="diary-detail__comments--form">
                        <form @submit.prevent="addComment">
                            <input
                                class="diary-detail__comments--input"
                                type="text"
                                placeholder="コメントを追加..."
                                v-model="content"
                            />
                            <div v-if="errorMessages" class="form__error">
                                <ul>
                                    <li
                                        v-for="msg in errorMessages.content"
                                        :key="msg"
                                        class="form__error--msg"
                                    >
                                        {{ msg }}
                                    </li>
                                </ul>
                            </div>
                            <button
                                class="diary-detail__comments--button"
                                type="submit"
                            >
                                送信
                            </button>
                        </form>
                    </div>
                    <div class="diary-detail__comments--area">
                        <ul>
                            <li
                                v-for="comment in comments"
                                :key="comment.id"
                                class="diary-detail__comments--content"
                            >
                                <img
                                    class="diary-detail__comments--img"
                                    v-if="comment.user.img_url"
                                    :src="comment.user.img_url"
                                    alt=""
                                />
                                <i
                                    class="fa fa-user-circle diary-detail__comments--icon"
                                    aria-hidden="true"
                                    v-else
                                ></i>
                                <div>
                                    <p class="diary-detail__comments--user">
                                        {{ comment.user.name }}
                                    </p>
                                    <p class="diary-detail__comments--text">
                                        {{ comment.content }}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { VueLoading } from "vue-loading-template";
import { OK, UNPROCESSABLE_ENTITY } from "../../../util";
export default {
    components: {
        VueLoading
    },
    data() {
        return {
            diary: null,
            //いいね数
            referenceCount: 0,
            //ログイン中ユーザーがこの日記をいいねしているかどうか
            referencedByUser: false,
            loading: true,
            //ボタンアニメーション
            active: false,
            //コメントデータ
            comments: null,
            //新規コメントデータ
            content: "",
            //エラーメッセージ
            errorMessages: null,
            //共有日記を投稿したユーザーID
            postUserId: null,
            //ログイン中のユーザーID
            loginUserId: null,
            modalOpen: false
        };
    },
    computed: {
        //エントリー日時日本語化
        entryDay() {
            const entryDay = this.diary.diary.entry_at;
            return this.chengeJp(entryDay);
        },
        //エグジット日時日本語化
        exitDay() {
            const exitDay = this.diary.diary.exit_at;
            return this.chengeJp(exitDay);
        },
        //日時日本語化処理
        createdDay() {
            moment.locale("ja");
            const date = moment(this.diary.created_at).format(
                "YYYY年MM月DD日 HH:mm"
            );
            return date;
        }
    },
    methods: {
        //日記取得
        async readDiary() {
            const id = Number(this.$route.params["id"]);
            //日記詳細取得
            const response = await axios
                .get(`/api/share/${id}`)
                .catch(err => err.response || err);
            //通信成功ならデータ代入
            if (response.status === OK) {
                this.diary = response.data;
                this.comments = response.data.comments;
                this.referenceCount = response.data.references_count;
                this.referencedByUser = response.data.referenced_by_user;
                this.postUserId = response.data.user.id;
                this.loginUserId = this.$store.getters["auth/userId"];
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }

            this.loading = false;
        },
        //削除処理
        async destroy() {
            const id = Number(this.$route.params["id"]);
            const response = await axios
                .post(`/api/share/delete/${id}`)
                .catch(err => err.response || err);
            if (response.status === OK) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries/share`);
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //ログイン中ユーザーがいいね済ならいいね解除処理、いいねしていないならいいね付与処理
        async submit() {
            this.referencedByUser
                ? await this.unReference()
                : await this.reference();
        },
        //いいね付与処理
        async reference() {
            const id = Number(this.$route.params["id"]);

            const response = await axios
                .post(`/api/share/${id}/reference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でカウントに1プラス
                this.referenceCount++;
                //いいね済に変更
                this.referencedByUser = true;
                //ボタンアニメーション
                this.active = true;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //いいね解除処理
        async unReference() {
            const id = Number(this.$route.params["id"]);

            const response = await axios
                .post(`/api/share/${id}/unreference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でカウント1マイナス
                this.referenceCount--;
                //いいね未へ変更
                this.referencedByUser = false;
                //ボタンアニメーション
                this.active = false;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //コメント処理
        async addComment() {
            const id = Number(this.$route.params["id"]);
            const formData = new FormData();
            formData.append("content", this.content);
            //コメント投稿
            const response = await axios
                .post(`/api/share/${id}/comment`, formData)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功で投稿したコメントを追加する
                this.comments.push(response.data);
                //フォームリセット
                this.content = "";
                //バリデーション
            } else if (response.status === UNPROCESSABLE_ENTITY) {
                this.errorMessages = response.data.errors;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //ページ戻る
        back() {
            this.$router.go(-1);
        },
        //日時日本語化処理
        chengeJp(data) {
            if (!data) {
                return null;
            }
            moment.locale("ja");
            const date = moment(data).format(
                "YYYY年MM月DD日 HH:mm ddd"
            );
            return date;
        }
    },
    created() {
        this.readDiary();
    }
};
</script>
