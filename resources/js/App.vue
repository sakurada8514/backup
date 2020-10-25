<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import { INTERNAL_SERVER_ERROR } from "./util";
export default {
    computed: {
        errorCode() {
            return this.$store.state.error.code;
        }
    },
    watch: {
        //エラーコード監視
        errorCode: {
            handler(val) {
                //システムエラーが起きた場合エラーページへ移動
                if (val === INTERNAL_SERVER_ERROR) {
                    this.$router.push("/500");
                }
            },
            immediate: true
        },
        $route() {
            this.$store.commit("error/setCode", null);
        }
    }
};
</script>
