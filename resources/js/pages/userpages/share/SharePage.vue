<template>
<!-- 共有日記ページ -->
    <div class="share">
        <div class="share__navbar">
            <router-link
                class="share__navbar--item mypage-link"
                :to="{ name: 'mysharediaries' }"
                >マイページ</router-link
            >
            <router-link
                class="share__navbar--item list"
                :to="{ name: 'share' }"
                exact
                >新着日記</router-link
            >
            <router-link
                class="share__navbar--item ranking"
                :to="{ name: 'ranking' }"
                >ランキング</router-link
            >
        </div>
        <div class="share__contents">
            <router-view></router-view>
        </div>
        <router-link :to="{name: 'posts'}" class="share__create-link">
            <i class="fa fa-share-square-o" aria-hidden="true"></i>
        </router-link>
    </div>
</template>
