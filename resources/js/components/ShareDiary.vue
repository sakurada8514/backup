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
                    v-if="item.users.img_url"
                    :src="item.users.img_url"
                    alt=""
                />
                <i
                    class="fa fa-user-circle profile__icon"
                    aria-hidden="true"
                    v-else
                ></i>
            </div>
            <div class="share-diary__user--info">
                <p class="share-diary__user--name">{{ item.users.name }}</p>
                <p class="share-diary__user--day">{{ createdDay }}</p>
            </div>
        </div>
        <div class="share-diary__title">{{ item.title }}</div>
        <div class="share-diary__info">
            <p class="share-diary__info--item">{{ item.diaries.currency }}</p>
            <p class="share-diary__info--item" :class="position">
                {{ item.diaries.position }}
            </p>
            <p class="share-diary__info--item" :class="item.diaries.result">
                {{ result }}
            </p>
            <button
                :class="{
                    'share-diary__reference--active': referencedByUser
                }"
                class="share-diary__reference"
                @click.prevent="submit"
            >
                <i class="fa fa-thumbs-up" aria-hidden="true"></i
                >{{ referenceCount }}
            </button>
        </div>
    </router-link>
</template>

<script>
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
            referenceCount: 0,
            referencedByUser: false
        };
    },
    computed: {
        //ログイン中ユーザーの名前
        userName() {
            return this.$store.getters["auth/userName"];
        },
        //日時日本語化処理
        createdDay() {
            const dateTime = this.item.created_at.split(" ");
            const date = dateTime[0];
            const dateJp = date.replace("-", "年").replace("-", "月") + "日 ";
            const time = dateTime[1].slice(0, 5);
            const createdDay = dateJp + time;
            return createdDay;
        },
        //resultフォーマット変更
        result() {
            return this.item.diaries.result === "win" ? "利確" : "損切り";
        },
        //positopnフォーマット変更
        position() {
            return this.item.diaries.position === "ロング" ? "long" : "short";
        }
    },
    methods: {
        //ログイン中ユーザーがいいね済ならいいね解除処理、いいねしていないならいいね付与処理
        async submit() {
            const id = this.item.id;
            this.referencedByUser
                ? await this.unReference(id)
                : await this.reference(id);
        },
        //いいね付与処理
        async reference(id) {
            //API通信
            const response = await axios
                .post(`/api/share/${id}/reference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でカウントに1プラス
                this.referenceCount++;
                //いいね済に変更
                this.referencedByUser = true;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        },
        //いいね解除処理
        async unReference(id) {
            //API通信
            const response = await axios
                .post(`/api/share/${id}/unreference`)
                .catch(err => err.response || err);

            if (response.status === OK) {
                //通信成功でカウント1マイナス
                this.referenceCount--;
                //いいね未へ変更
                this.referencedByUser = false;
            } else {
                //システムエラー
                this.$store.commit("error/setCode", response.status);
            }
        }
    },
    created() {
        this.referenceCount = this.item.references_count;
        this.referencedByUser = this.item.referenced_by_user;
    }
};
</script>
