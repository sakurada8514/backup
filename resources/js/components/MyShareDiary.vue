<template>
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
        <!-- <button class="share-diary__delete" @click.prevent="destroy">
            削除
        </button> -->
        <div class="share-diary__title">{{ item.title }}</div>
        <div class="share-diary__info">
            <p class="share-diary__info--item">{{ item.diaries.currency }}</p>
            <p class="share-diary__info--item" :class="position">
                {{ item.diaries.position }}
            </p>
            <p class="share-diary__info--item" :class="item.diaries.result">
                {{ result }}
            </p>
            <div class="share-diary__reference">
                <i class="fa fa-thumbs-up" aria-hidden="true"></i>10
            </div>
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
        result() {
            return this.item.diaries.result === "win" ? "利確" : "損切り";
        },
        position() {
            return this.item.diaries.position === "ロング" ? "long" : "short";
        }
    },
    methods: {
        // async destroy() {
        //     const id = Number(this.item.id);
        //     console.log(id)
        //     const response = await axios
        //         .post(`/api/share/delete/${id}`)
        //         .catch(err => err.response || err);

        //     if (response.status === OK) {
        //         const userName = this.$store.getters["auth/userName"];
        //         this.$router.push({
        //             name: "mysharediaries",
        //             params: { name: userName }
        //         });
        //     } else {
        //         //システムエラー
        //         this.$store.commit("error/setCode", response.status);
        //     }

        // }
    }
};
</script>
