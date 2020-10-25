<template>
    <div  class="top-navbar">
        <div class="navbar">
            <div class="navbar__logo">
                <h1><span class="navbar__logo--blue">FX</span>日記</h1>
            </div>
            <button
                @click="menuOpen"
                class="navbar__button"
                :class="{ navbar__button_open: isMenuOpen }"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <ul class="navbar__menu" :class="{ navbar__menu_open: isMenuOpen }">
            <li @click="scrollTop" class="navbar__item">
                <p>トップ</p>
            </li>
            <li class="navbar__item">
                <p>FX日記とは</p>
            </li>
            <li class="navbar__item">
                <router-link tag="p" to="/register">会員登録</router-link>
            </li>
            <li class="navbar__item">
                <router-link tag="p" to="/login">ログイン</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMenuOpen: false
        };
    },
    methods: {
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        menuOpen() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
};
</script>
