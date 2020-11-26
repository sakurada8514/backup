<template>
    <div class="diary-list">
        <div class="diary-list__nav">
            <router-link
                class="diary-list__nav--item"
                :to="{ name: 'diariesList' }"
                exact
                >リスト</router-link
            >
            <router-link
                class="diary-list__nav--item"
                :to="{ name: 'carender' }"
                >カレンダー</router-link
            >
        </div>
        <div class="diary-list__content">
            <router-view></router-view>
        </div>
        <router-link :to="{ name: 'create' }" class="toDiaryCreateForm"
            ><i class="fa fa-pencil" aria-hidden="true"></i
        ></router-link>
        <router-link :to="{ name: 'search' }" class="toDiarySearch"
            ><i class="fa fa-search" aria-hidden="true"></i
        ></router-link>
    </div>
</template>
