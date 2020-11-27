<template>
    <div class="calender">
        <div class="calender__content">
            <div class="calender__header">
                <div class="calender__arrow" @click="selectMonth(0)">＜</div>
                <div class="calender__month">{{ dateLabel }}</div>
                <div class="calender__arrow" @click="selectMonth(1)">＞</div>
            </div>
            <div>
                <ul class="calender__body">
                    <li
                        class="calender__panel"
                        v-for="space in spaces"
                        :key="space.key"
                    ></li>
                    <li
                        class="calender__panel"
                        :class="
                            selectedDate === date.date
                                ? 'calender__panel--selected'
                                : ''
                        "
                        v-for="date in dates"
                        :key="date.date"
                        @click="selectDate(date.date)"
                    >
                        <div class="calender__panel--date">
                            {{ date.dateNumber }}
                        </div>
                        <div
                            :class="
                                date.diaryCount > 0
                                    ? 'calender__panel--filled'
                                    : ''
                            "
                        >
                            {{ date.diaryCount }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="calender__footer">
            <Diary
                v-for="diary in diaryList"
                :key="`my-${diary.id}`"
                :item="diary"
            ></Diary>
            <div class="diarylist__non" v-if="diaryList.length === 0">
                <p>日記が記入されていません</p>
            </div>
        </div>
    </div>
</template>

<script>
import Diary from "../../../components/Diary";
import moment from "moment";
export default {
    components: {
        Diary
    },
    data() {
        return {
            //MY日記一覧
            diaries: [],
            //選択中の月
            selectedMonth: null,
            //選択中の日
            selectedDate: null,
            //選択中の日のMY日記
            diaryList: [],
            spaces: [],
            dateLabel: "",
            dates: [],
        };
    },
    methods: {
        //月選択処理
        selectMonth(num) {
            if (num === 0) {
                this.selectedMonth = moment(this.selectedMonth).subtract(
                    1,
                    "months"
                );
            } else {
                this.selectedMonth = moment(this.selectedMonth).add(
                    1,
                    "months"
                );
            }
        },
        //日付選択処理
        selectDate(date) {
            //日付データ代入
            this.selectedDate = date;
            //日記一覧リセット
            this.diaryList = [];
            //選択中の日にトレードした日記代入
            for (let key in this.diaries) {
                if (
                    moment(this.diaries[key].entry_at).format("YYYY-MM-DD") ===
                    date
                ) {
                    this.diaryList.push(this.diaries[key]);
                }
            }
        },
        readDiaries() {
            this.diaries = this.$store.state.diaries.diaries;
        }
    },
    created() {
        this.selectedDate = moment().format("YYYY-MM-DD");
        this.selectedMonth = moment();
        this.readDiaries();
        this.selectDate(this.selectedDate);
    },
    watch: {
        selectedMonth: function() {
            this.dateLabel = moment(this.selectedMonth).format("YYYY年MM月");
            //スペースリセット
            this.spaces = [];
            //スペース更新
            for (
                let i = 0;
                i <
                moment(this.selectedMonth)
                    .startOf("month")
                    .day();
                i++
            ) {
                this.spaces[i] = {
                    key: i
                };
            }
            //日付リセット
            this.dates = [];
            //日付更新
            for (let i = 0; i < moment(this.selectedMonth).daysInMonth(); i++) {
                let diaryCount = 0;
                this.dates[i] = {
                    date: moment(this.selectedMonth)
                        .startOf("month")
                        .add(i, "day")
                        .format("YYYY-MM-DD"),
                    dateNumber: i + 1,
                    diaryCount: null
                };

                //日記数を数える
                for (let key in this.diaries) {
                    if (
                        moment(this.diaries[key].entry_at).format(
                            "YYYY-MM-DD"
                        ) === this.dates[i].date
                    ) {
                        diaryCount++;
                    }
                }

                if (diaryCount === 0) {
                    diaryCount = "-";
                }

                this.dates[i].diaryCount = diaryCount;
            }
        }
    }
};
</script>
