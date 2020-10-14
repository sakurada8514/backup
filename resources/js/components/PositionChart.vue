<script>
import { Doughnut } from "vue-chartjs";

export default {
    extends: Doughnut,
    name: "positionChart",
    props: {
        positionData: {
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
                            "#db2f3d",
                            "#4183c0"
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
        setData() {
            for (let data of this.positionData) {
                this.datas.labels.push(data.position);
                this.datas.datasets[0].data.push(data.position_count);
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
                let fontFamily = "ヒラギノ角ゴ ProN W3"
                ctx.fillStyle = "#1e1e1e";
                ctx.font = Chart.helpers.fontString(
                    fontSize,
                    fontStyle,
                    fontFamily
                );

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // position(第二, 第三引数は適宜調整)
                ctx.fillText(
                    "ポジション",
                    chart.width / 2 ,
                    chart.height / 2 + -20
                );
            }
        });
        this.setData();
        this.renderChart(this.datas, this.options);
    }
};
</script>
