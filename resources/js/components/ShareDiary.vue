<template>
    <!-- 共有日記 -->
    <router-link
        class="share-diary"
        tag="div"
        :to="{
            name: 'shareDiaryDetail',
            params: { name: userName, id: item.id }
        }"
    >
        <div class="share-diary__user">
            <div class="share-diary__user--img">
                <img
                    v-if="item.user.img_url"
                    :src="item.user.img_url"
                    alt=""
                />
                <i
                    class="fa fa-user-circle"
                    aria-hidden="true"
                    v-else
                ></i>
            </div>
            <div class="share-diary__user--info">
                <p class="share-diary__user--name">{{ item.user.name }}</p>
                <p class="share-diary__user--day">{{ createdDay }}</p>
            </div>
        </div>
        <div class="share-diary__title">{{ item.title }}</div>
        <div class="share-diary__info">
            <p class="share-diary__info--item">{{ item.diary.currency }}</p>
            <p class="share-diary__info--item" :class="position">
                {{ item.diary.position }}
            </p>
            <p class="share-diary__info--item" :class="item.diary.result">
                {{ result }}
            </p>
            <button
                :class="{
                    'share-diary__reference--active': referencedByUser
                }"
                class="share-diary__reference"
                @click.prevent="referenceSubmit"
            >
                <i
                    class="fa fa-thumbs-up"
                    aria-hidden="true"
                    :class="{ reference__active: active }"
                ></i
                >{{ referenceCount }}
            </button>
        </div>
    </router-link>
</template>

<script>
import moment from "moment";
import { OK } from "../util";
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            //いいね数
            referenceCount: 0,
            //ログイン中ユーザーがいいね済かどうか
            referencedByUser: false,
            //ボタンアニメーション
            active: false
        };
    },
    computed: {
        //ログイン中ユーザーの名前
        userName() {
            return this.$store.getters["auth/userName"];
        },
        //日時日本語化処理
        createdDay() {
            moment.locale("ja");
            const date = moment(this.item.entry_at).format(
                "YYYY年MM月DD日 HH:mm"
            );
            return date;
        },
        //resultフォーマット変更
        result() {
            return this.item.diary.result === "win" ? "利確" : "損切り";
        },
        //positopnフォーマット変更
        position() {
            return this.item.diary.position === "ロング" ? "long" : "short";
        }
    },
    methods: {
        //ログイン中ユーザーがいいね済ならいいね解除処理、いいねしていないならいいね付与処理
        async referenceSubmit() {
            const id = this.item.id;
            this.referencedByUser
                ? await this.unReference(id)
                : await this.reference(id);
        },
        //いいね付与処理
        async reference(id) {
            const response = await axios
                .post(`/api/share/${id}/reference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でいいね数に1プラス
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
        async unReference(id) {
            const response = await axios
                .post(`/api/share/${id}/unreference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でいいね数1マイナス
                this.referenceCount--;

                //いいね未へ変更
                this.referencedByUser = false;

                //ボタンアニメーション
                this.active = false;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    created() {
        //いいね情報セット
        this.referenceCount = this.item.references_count;
        this.referencedByUser = this.item.referenced_by_user;
    }
};
</script>
