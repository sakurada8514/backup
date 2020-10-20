<template>
<!-- マイ日記記入ページ -->
    <div class="diary-create">
        <form class="diary-form" @submit.prevent="submit">
            <h1 class="diary-create__title">日記記入</h1>
            <div class="diary-form__info">
                <div class="diary-form__item">
                    <label class="diary-form__item--label" for="currency"
                        >取引通貨</label
                    >
                    <input
                        class="diary-form__item--input"
                        type="text"
                        name="currency"
                        placeholder="例:EUR/USD"
                        required
                        v-model="diaryCreateForm.currency"
                    />
                    <!-- エラーメッセージ -->
                    <ul v-if="diariesErrors" class="form__error">
                        <li
                            v-for="msg in diariesErrors.currency"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <div class="diary-form__item">
                    <label class="diary-form__item--label" for="lot"
                        >ロット数</label
                    >
                    <input
                        class="diary-form__item--input"
                        type="number"
                        name="lot"
                        required
                        v-model.number="diaryCreateForm.lot"
                    />
                    <!-- エラーメッセージ -->
                    <ul v-if="diariesErrors" class="form__error">
                        <li
                            v-for="msg in diariesErrors.lot"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <div class="diary-form__item">
                    <label class="diary-form__item--label radio" for="position"
                        >エントリー方向</label
                    >
                    <input
                        class="diary-form__item--radio"
                        name="position"
                        type="radio"
                        value="ロング"
                        v-model="diaryCreateForm.position"
                    /><span>ロング</span>
                    <input
                        class="diary-form__item--radio"
                        name="position"
                        type="radio"
                        value="ショート"
                        v-model="diaryCreateForm.position"
                    /><span>ショート</span>
                    <!-- エラーメッセージ -->
                    <ul v-if="diariesErrors" class="form__error">
                        <li
                            v-for="msg in diariesErrors.position"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <div class="diary-form__item">
                    <label class="diary-form__item--label radio" for="result"
                        >結果</label
                    >
                    <input
                        class="diary-form__item--radio"
                        name="result"
                        type="radio"
                        value="entry"
                        checked
                        v-model="diaryCreateForm.result"
                    /><span>エントリー中</span>
                    <input
                        class="diary-form__item--radio"
                        name="result"
                        type="radio"
                        value="win"
                        v-model="diaryCreateForm.result"
                    /><span>利確</span>
                    <input
                        class="diary-form__item--radio"
                        name="result"
                        type="radio"
                        value="lose"
                        v-model="diaryCreateForm.result"
                    /><span>損切り</span>
                    <!-- エラーメッセージ -->
                    <ul v-if="diariesErrors" class="form__error">
                        <li
                            v-for="msg in diariesErrors.result"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <!-- 結果がエントリ中の場合は非表示 -->
                <div class="diary-form__item" v-show="show">
                    <label class="diary-form__item--label" for="settlement"
                        >決済損益</label
                    >
                    <div>
                        <span
                            class="diary-form__item--code"
                            v-if="resultStatus === 'win'"
                            >＋</span
                        >
                        <span
                            class="diary-form__item--code"
                            v-else-if="resultStatus === 'lose'"
                            >ー</span
                        >
                        <span class="diary-form__item--code" v-else></span>
                        <input
                            class="diary-form__item--input settlement"
                            type="number"
                            name="settlement"
                            placeholder="エグジット済の場合は記入"
                            v-model.number="diaryCreateForm.settlement"
                        /><span>円</span>
                    </div>
                    <!-- エラーメッセージ -->
                    <ul v-if="diariesErrors" class="form__error">
                        <li
                            v-for="msg in diariesErrors.settlement"
                            :key="msg"
                            class="form__error--msg"
                        >
                            {{ msg }}
                        </li>
                    </ul>
                </div>
            </div>
            <h2 class="diary-form__title">エントリー</h2>
            <div class="diary-form__entry">
                <div class="formarea">
                    <div class="diary-form__item">
                        <label class="diary-form__item--label" for="entry_rate"
                            >レート</label
                        >
                        <input
                            class="diary-form__item--input"
                            type="number"
                            name="entry_rate"
                            placeholder="例:1.10000"
                            step="0.00001"
                            required
                            v-model.number="diaryCreateForm.entry_rate"
                        />
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.entry_rate"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                    </div>
                    <div class="diary-form__item">
                        <label class="diary-form__item--label" for="entry_at"
                            >日時</label
                        >
                        <input
                            class="diary-form__item--input"
                            type="datetime-local"
                            name="entry_at"
                            required
                            v-model="diaryCreateForm.entry_at"
                        />
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.entry_at"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                    </div>
                    <div class="diary-form__item textarea">
                        <label class="diary-form__item--label" for="rationale"
                            >理由</label
                        >
                        <textarea
                            class="diary-form__item--textarea"
                            name="rationale"
                            cols="25"
                            rows="40"
                            required
                            placeholder="エントリーした理由や根拠を記入"
                            v-model="diaryCreateForm.rationale"
                        ></textarea>
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.rationale"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                    </div>
                    <div class="diary-form__item img">
                        <label class="diary-form__item--label" for="entry_img"
                            >写真</label
                        >
                        <input
                            class="diary-form__item--input diary-form__item--file entry-file"
                            type="file"
                            name="entry_img"
                            @change="onEntryFileChenge"
                        />
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.entry_img"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                        <!-- 写真プレビュー -->
                        <output class="diary-form__preview" v-if="entryPreview">
                            <img :src="entryPreview" alt="" />
                        </output>
                    </div>
                </div>
            </div>
            <!-- 結果がエントリ中の場合は非表示 -->
            <h2 v-show="show" class="diary-form__title">エグジット</h2>
            <div class="diary-form__exit" v-show="show">
                <div class="formarea">
                    <div class="diary-form__item">
                        <label class="diary-form__item--label" for="exit_rate"
                            >レート</label
                        >
                        <input
                            class="diary-form__item--input"
                            type="number"
                            name="exit_rate"
                            placeholder="例:1.10000"
                            step="0.00001"
                            v-model.number="diaryCreateForm.exit_rate"
                        />
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.exit_rate"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                    </div>
                    <div class="diary-form__item">
                        <label class="diary-form__item--label" for="exit_at"
                            >日時</label
                        >
                        <input
                            class="diary-form__item--input"
                            type="datetime-local"
                            name="exit_at"
                            v-model="diaryCreateForm.exit_at"
                        />
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.exit_at"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                    </div>
                    <div class="diary-form__item textarea">
                        <label class="diary-form__item--label" for="reflection"
                            >反省</label
                        >
                        <textarea
                            class="diary-form__item--textarea"
                            name="reflection"
                            cols="25"
                            rows="40"
                            placeholder="トレードの反省を記入"
                            v-model="diaryCreateForm.reflection"
                        ></textarea>
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.reflection"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                    </div>
                    <div class="diary-form__item img">
                        <label class="diary-form__item--label" for="exit_img"
                            >写真</label
                        >
                        <input
                            class="diary-form__item--input diary-form__item--file exit-file"
                            type="file"
                            name="exit_img"
                            @change="onExitFileChenge"
                        />
                        <!-- エラーメッセージ -->
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.exit_img"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                        <!-- 写真プレビュー -->
                        <output
                            class="diary-form__preview"
                            v-if="exitPreview"
                            @change="onExitFileChenge"
                        >
                            <img :src="exitPreview" alt="" />
                        </output>
                    </div>
                </div>
            </div>
            <button class="diary-form__button" type="submit">
                <!-- API通信中のみローディング表示 -->
                <vue-loading
                type="bubbles"
                color="#fff"
                :size="{ width: '30px', height: '30px' }"
                v-if="loading"
                class="diary-form__button--loading"
            ></vue-loading>
                記入完了
            </button>
            <ul v-if="diariesErrors" class="form__error">
                <li class="form__error--notice">
                    記入に誤りがあります。
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
    components: {
        VueLoading
    },
    data() {
        return {
            //日記作成データ
            diaryCreateForm: {
                currency: "",
                position: "",
                lot: "",
                result: "",
                settlement: "",
                entry_rate: "",
                entry_at: "",
                rationale: "",
                entry_img: "",
                exit_rate: "",
                exit_at: "",
                reflection: "",
                exit_img: ""
            },
            //エントリー画像プレビューパス
            entryPreview: null,
            //エグジット画像プレビューパス
            exitPreview: null,
            //ローディング表示
            loading: false
        };
    },
    computed: {
        //API通信ステータス
        apiStatus() {
            return this.$store.state.diaries.apiStatus;
        },
        //トレード結果入力情報取得
        resultStatus() {
            return this.diaryCreateForm.result;
        },
        //トレード結果入力情報が'win'または'lose'だった場合trueを返す
        show() {
            return this.resultStatus === "win" || this.resultStatus === "lose";
        },
        //バリデーションエラー
        diariesErrors() {
            return this.$store.state.diaries.diariesErrorMessages;
        }
    },
    methods: {
        //画像プレビュー処理（エントリー）
        onEntryFileChenge(event) {
            //ファイルがセットされていなければリセット
            if (event.target.files.length === 0) {
                this.resetEntryPreview();
                return;
            }

            //画像ファイルでなければリセット
            if (!event.target.files[0].type.match("image.*")) {
                this.resetEntryPreview();
                return;
            }

            const render = new FileReader();

            //プレビューにパスセット
            render.onload = e => {
                this.entryPreview = e.target.result;
            };
            render.readAsDataURL(event.target.files[0]);

            //日記作成データへセット
            this.diaryCreateForm.entry_img = event.target.files[0];
        },
        //画像プレビュー処理（エグジット）
        onExitFileChenge(event) {
            if (event.target.files.length === 0) {
                this.resetExitPreview();
                return;
            }

            if (!event.target.files[0].type.match("image.*")) {
                this.resetExitPreview();
                return;
            }

            const render = new FileReader();

            render.onload = e => {
                this.exitPreview = e.target.result;
            };
            render.readAsDataURL(event.target.files[0]);

            this.diaryCreateForm.exit_img = event.target.files[0];
        },
        //ファイルリセット処理
        resetEntryPreview() {
            this.entryPreview = "";
            this.$el.querySelector(".entry-file").value = null;
        },
        resetExitPreview() {
            this.exitPreview = "";
            this.$el.querySelector(".exit-file").value = null;
        },
        //日記作成処理
        async submit() {
            this.loading = true;
            //フォームデータへセット
            let formData = new FormData();
            formData.append("currency", this.diaryCreateForm.currency);
            formData.append("position", this.diaryCreateForm.position);
            formData.append("lot", this.diaryCreateForm.lot);
            formData.append("result", this.diaryCreateForm.result);
            formData.append("settlement", this.diaryCreateForm.settlement);
            formData.append("entry_rate", this.diaryCreateForm.entry_rate);
            formData.append("entry_at", this.diaryCreateForm.entry_at);
            formData.append("entry_img", this.diaryCreateForm.entry_img);
            formData.append("rationale", this.diaryCreateForm.rationale);
            formData.append("exit_rate", this.diaryCreateForm.exit_rate);
            formData.append("exit_at", this.diaryCreateForm.exit_at);
            formData.append("reflection", this.diaryCreateForm.reflection);
            formData.append("exit_img", this.diaryCreateForm.exit_img);
            //API通信
            await this.$store.dispatch("diaries/create", formData);
            this.loading = false;
            //API通信が成功したら日記一覧へ移動
            if (this.apiStatus) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries/list/`);
            }
        },
        //エラーメッセージリセット処理
        crearError() {
            this.$store.commit("diaries/setdiariesErrorMessages", null);
        }
    },
    //ページ移動したらエラーメッセージリセット
    created() {
        this.crearError();
    }
};
</script>
