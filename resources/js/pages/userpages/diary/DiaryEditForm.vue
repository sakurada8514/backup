<template>
    <div class="diary-create">
        <form class="diary-form" @submit.prevent="submit">
            <h1 class="diary-create__title">日記編集</h1>
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
                        v-model="diaryEditForm.currency"
                    />
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
                        v-model.number="diaryEditForm.lot"
                    />
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
                        v-model="diaryEditForm.position"
                    /><span>ロング</span>
                    <input
                        class="diary-form__item--radio"
                        name="position"
                        type="radio"
                        value="ショート"
                        v-model="diaryEditForm.position"
                    /><span>ショート</span>
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
                        v-model="diaryEditForm.result"
                    /><span>エントリー中</span>
                    <input
                        class="diary-form__item--radio"
                        name="result"
                        type="radio"
                        value="win"
                        v-model="diaryEditForm.result"
                    /><span>利確</span>
                    <input
                        class="diary-form__item--radio"
                        name="result"
                        type="radio"
                        value="lose"
                        v-model="diaryEditForm.result"
                    /><span>損切り</span>
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
                            v-model.number="diaryEditForm.settlement"
                        /><span>円</span>
                    </div>
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
                            v-model.number="diaryEditForm.entry_rate"
                        />
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
                            v-model="diaryEditForm.entry_at"
                        />
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
                            v-model="diaryEditForm.rationale"
                        ></textarea>
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
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.entry_img"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
                        <output class="diary-form__preview" v-if="entryPreview">
                            <img :src="entryPreview" alt="" />
                        </output>
                    </div>
                </div>
            </div>

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
                            v-model.number="diaryEditForm.exit_rate"
                        />
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
                            v-model="diaryEditForm.exit_at"
                        />
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
                            v-model="diaryEditForm.reflection"
                        ></textarea>
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
                        <ul v-if="diariesErrors" class="form__error">
                            <li
                                v-for="msg in diariesErrors.exit_img"
                                :key="msg"
                                class="form__error--msg"
                            >
                                {{ msg }}
                            </li>
                        </ul>
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
            <div class="diary-edit__button">
                <button class="diary-edit__button--cancel" @click="back">
                    キャンセル
                </button>
                <button class="diary-edit__button--done" type="submit">
                    <vue-loading
                        type="bubbles"
                        color="#fff"
                        :size="{ width: '30px', height: '30px' }"
                        v-if="loading"
                        class="diary-edit__button--loading"
                    ></vue-loading>
                    記入完了
                </button>
            </div>
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
            diaryEditForm: {
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
            entryPreview: null,
            exitPreview: null,
            loading: false,
            diary: null
        };
    },
    computed: {
        apiStatus() {
            return this.$store.state.diaries.apiStatus;
        },
        resultStatus() {
            return this.diaryEditForm.result;
        },
        show() {
            return this.resultStatus === "win" || this.resultStatus === "lose";
        },
        diariesErrors() {
            return this.$store.state.diaries.diariesErrorMessages;
        }
    },
    methods: {
        //編集する日記取得
        readDiary() {
            const id = Number(this.$route.params["id"]);
            const diaries = this.$store.state.diaries.diaries;
            for (let diary of diaries) {
                if (diary.id === id) {
                    this.diary = diary;
                    break;
                }
            }
        },
        //写真プレビュー
        onEntryFileChenge(event) {
            if (event.target.files.length === 0) {
                this.resetEntryPreview();
                return;
            }

            if (!event.target.files[0].type.match("image.*")) {
                this.resetEntryPreview();
                return;
            }

            const render = new FileReader();

            render.onload = e => {
                this.entryPreview = e.target.result;
            };

            render.readAsDataURL(event.target.files[0]);

            this.diaryEditForm.entry_img = event.target.files[0];
        },
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

            this.diaryEditForm.exit_img = event.target.files[0];
        },
        //プレビューリセット
        resetEntryPreview() {
            this.entryPreview = "";
            this.$el.querySelector(".entry-file").value = null;
        },
        resetExitPreview() {
            this.exitPreview = "";
            this.$el.querySelector(".exit-file").value = null;
        },
        //日時の初期値設定する為日時のフォーマット変更
        timeFormat(val) {
            if (val) {
                return val.replace(" ", "T").slice(0, -3);
            } else {
                return "";
            }
        },
        //決済損益フォーマット変更
        settlementFormat() {
            if (this.diary.settlement) {
                //もしマイナスなら符号反転
                if (this.diary.settlement < 0) {
                    return -this.diary.settlement;
                } else {
                    return this.diary.settlement;
                }
            } else {
                return "";
            }
        },
        //初期値設定
        substitution() {
            this.diaryEditForm.currency = this.diary.currency;
            this.diaryEditForm.position = this.diary.position;
            this.diaryEditForm.lot = this.diary.lot;
            this.diaryEditForm.result = this.diary.result;
            this.diaryEditForm.settlement = this.settlementFormat();
            this.diaryEditForm.entry_rate = this.diary.entry_rate;
            this.diaryEditForm.rationale = this.diary.rationale;
            this.diaryEditForm.exit_rate = this.diary.exit_rate || "";
            this.diaryEditForm.reflection = this.diary.reflection || "";
            this.diaryEditForm.entry_at = this.timeFormat(this.diary.entry_at);
            this.diaryEditForm.exit_at = this.timeFormat(this.diary.exit_at);

            this.entryPreview = this.diary.entry_img_url || null;
            this.exitPreview = this.diary.exit_img_url || null;
        },
        //日記更新API通信
        async submit() {
            this.loading = true;
            let formData = new FormData();
            formData.append("currency", this.diaryEditForm.currency);
            formData.append("position", this.diaryEditForm.position);
            formData.append("lot", this.diaryEditForm.lot);
            formData.append("result", this.diaryEditForm.result);
            formData.append("settlement", this.diaryEditForm.settlement);
            formData.append("entry_rate", this.diaryEditForm.entry_rate);
            formData.append("entry_at", this.diaryEditForm.entry_at);
            formData.append("entry_img", this.diaryEditForm.entry_img);
            formData.append("rationale", this.diaryEditForm.rationale);
            formData.append("exit_rate", this.diaryEditForm.exit_rate);
            formData.append("exit_at", this.diaryEditForm.exit_at);
            formData.append("reflection", this.diaryEditForm.reflection);
            formData.append("exit_img", this.diaryEditForm.exit_img);

            const id = Number(this.$route.params["id"]);
            await this.$store.dispatch("diaries/update", {
                data: formData,
                id: id
            });
            this.loading = false;
            //通信成功で一覧へ戻る
            if (this.apiStatus) {
                const userName = this.$store.getters["auth/userName"];
                this.$router.push(`/${userName}/diaries/list/`);
            }
        },
        //エラーメッセージリセット
        crearError() {
            this.$store.commit("diaries/setdiariesErrorMessages", null);
        },
        //ページ戻る
        back() {
            this.$router.go(-1);
        }
    },
    created() {
        this.readDiary();
        this.substitution();
        this.crearError();
    }
};
</script>
