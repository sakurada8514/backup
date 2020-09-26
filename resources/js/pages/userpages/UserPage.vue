<template>
    <div class="userpage">
        <h1>usrepa</h1>
        <router-view></router-view>
        <button @click="logout">logout</button>
    </div>
</template>

<script>
export default {
    computed: {
        apiStatus() {
            return this.$store.state.auth.apiStatus;
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("auth/logout");
            if (this.apiStatus) {
                this.$router.push("/");
            }
        }
    }
};
</script>
