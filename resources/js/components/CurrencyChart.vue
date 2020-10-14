<script>
import { Doughnut } from "vue-chartjs";

export default {
    extends: Doughnut,
    name: "currencyChart",
    props: {
        currencyData: {
            type: Array
        }
    },
    data() {
        return {
            datas: {
                // 凡例とツールチップに表示するラベル
                labels: [],
                // 表示するデータ
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            "#f87979",
                            "#aa4c8f",
                            "#38b48b",
                            "#006e54",
                            "#c1e4e9",
                            "#89c3eb",
                            "#c3d825",
                            "#db2f3d",
                            "#0bfa6f",
                            "#ee96e2"
                        ],
                        borderColor: "transparent"
                    }
                ]
            },
            options: {
                responsive: true,
                legend: {
                    position: "bottom"
                }
            }
        };
    },
    methods: {
        //データセット
        setData() {
            for (let data of this.currencyData) {
                this.datas.labels.push(data.currency);
                this.datas.datasets[0].data.push(data.currency_count);
            }
        }
    },
    mounted() {
        this.addPlugin({
            afterDraw(chart, go) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    let dataSum = 0;
                    dataset.data.forEach(element => {
                        dataSum += element;
                    });

                    let meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function(element, index) {
                            // フォントの設定
                            let fontSize = 10;
                            let fontStyle = "normal";
                            let fontFamily = "ヒラギノ角ゴ ProN W3";
                            ctx.fillStyle = "#1e1e1e";
                            // 設定を適用
                            ctx.font = Chart.helpers.fontString(
                                fontSize,
                                fontStyle,
                                fontFamily
                            );

                            // ラベルをパーセント表示に変更
                            let labelString = chart.data.labels[index];
                            let sum = Math.round(
                                (dataset.data[index] / dataSum) * 100
                            );
                            let dataString = `${dataset.data[index]}回 ${sum} %`;

                            // positionの設定
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";

                            let padding = -2;
                            let position = element.tooltipPosition();
                            // ツールチップに変更内容を表示
                            ctx.fillText(
                                labelString,
                                position.x,
                                position.y - fontSize / 2 - padding
                            ); // title
                            ctx.fillText(
                                dataString,
                                position.x,
                                position.y + fontSize / 2 - padding
                            );
                        });
                    }
                });
                let fontSize = 20;
                let fontStyle = "normal";
                let fontFamily = "ヒラギノ角ゴ ProN W3";
                ctx.fillStyle = "#1e1e1e";
                ctx.font = Chart.helpers.fontString(
                    fontSize,
                    fontStyle,
                    fontFamily
                );

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText(
                    "取引通貨",
                    chart.width / 2,
                    chart.height / 2 + -20
                );
            }
        });
        this.setData();
        this.renderChart(this.datas, this.options);
    }
};
</script>
