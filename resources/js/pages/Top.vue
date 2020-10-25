<template>
    <!-- トップページ -->
    <div class="top">
        <TopHeader></TopHeader>
        <div class="header">
            <p class="header__title">
                FXトレーダーが<span>勝つ</span>為の日記帳
            </p>
            <h1 class="header__logo"><span>FX</span>日記</h1>
            <div class="header__buttonarea">
                <router-link tag="button" to="/register" class="header__button"
                    >会員登録</router-link
                >
                <router-link tag="button" to="/login" class="header__button"
                    >ログイン</router-link
                >
            </div>
        </div>
        <div class="about">
            <h2 class="about__title">FX日記とは？</h2>
            <div class="about__text">
                <p>トレード日記をつけると良いと聞くけど書き方が分からない...</p>
                <p>自分のトレード勝率や合計損益が知りたい...</p>
                <p>他のトレーダーがどんなトレードをしているのか見てみたい...</p>
                <p>
                    このようなFXトレード初心者の悩みを<span>FX日記</span>は解決します。
                </p>
            </div>
            <div class="about__content">
                <div class="about__item">
                    <h3 class="about__item--title">日記を書く</h3>
                    <i class="fa fa-pencil-square-o about__item--icon" aria-hidden="true"></i>
                    <p class="about__item--text">自分のトレードを詳しく記録しましょう。</p>
                    <p>
                        FX日記なら項目に添って記入していくだけで簡単に本格的なトレード日記を書くことができます。
                    </p>
                </div>
                <div class="about__item">
                    <h3 class="about__item--title">振り返る・分析</h3>
                    <i class="fa fa-pie-chart about__item--icon" aria-hidden="true"></i>
                    <p class="about__item--text">過去のトレードを振り返って今後に活かしましょう。</p>
                    <p>
                        FX日記なら検索機能があるので振り返りも簡単、トレード勝率や合計損益も自動で算出してくれます。
                    </p>
                </div>
                <div class="about__item">
                    <h3 class="about__item--title">共有する</h3>
                    <i class="fa fa-share-alt about__item--icon" aria-hidden="true"></i>
                    <p class="about__item--text">他のトレーダーの日記を参考にしましょう。</p>
                    <p>
                        FX日記なら共有機能を使い他のトレーダーがどのような日記を書いているか見ることができます。参考になった日記にはいいねを押しましょう。さらにコメント機能を使い質問やアドバイスもできます。
                    </p>
                    <p></p>
                </div>
            </div>
        </div>
        <router-link tag="button" to="/register" class="footer__button"
                    >今すぐ始める</router-link
                >
        <div class="footer">
            <p class="footer__text">Copyright ©FX日記. All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
export default {
    components: {
        TopHeader
    }
};
</script>
