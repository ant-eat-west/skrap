<template>
    <div
        ref="pieChart"
        width="100%"
        height="100%">
    </div>
</template>

<script>
import * as echarts from 'echarts';
import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';
import ResizeObserver from 'resize-observer-polyfill';
import { queryBySql } from '../../../api/api';

export default {
    name: 'PieChart',
    componentName: 'PieChart',
    components: {
    },
    props: ['option', 'parentOption', 'ds', 'element'],
    data() {
        return {
            chart: null,
            defaultOption: {
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 100,
                    right: 0
                },
                legend: {
                    orient: 'vertical',
                    left: 0,
                    top: 0,
                    formatter(value) {
                        let currentValue = value;
                        if (value.length > 10) {
                            currentValue = `${value.substring(0, 10)}...`;
                        }
                        return currentValue;
                    }
                },
                color: ['#2D84FB', '#05C056', '#907EEC', '#FFC107', '#AAB0BD', '#FF9292'],
                tooltip: {
                    trigger: 'item'
                },
                // visualMap: {
                //     show: false,
                //     min: 0,
                //     max: 500,
                //     inRange: {
                //         colorLightness: [0, 1]
                //     }
                // },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '90%'],
                        avoidLabelOverlap: false,
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 274, name: '联盟广告' },
                            { value: 235, name: '视频广告' },
                            { value: 400, name: '搜索引擎' }
                        ].sort((a, b) => {
                            return a.value - b.value;
                        }),
                        itemStyle: {
                            // color: '#2D84FB',
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        };
    },
    computed: {
    },
    methods: {
        refreshData(data, name) {
            console.log('pie-data', data);
            // 清空echarts之前渲染的数据
            this.chart.clear();
            this.defaultOption.series[0].data = data;
            // this.defaultOption.series[0].itemStyle.color = color;
            this.defaultOption.series[0].name = name;
            data.sort((a, b) => {
                return a.value - b.value;
            });
            // this.defaultOption.visualMap.min = data[0].value;
            // this.defaultOption.visualMap.max = data[data.length - 1].value + 10;
            console.log('pie-data sort', data);
            // 标题的展示和隐藏
            // this.lineOption.title.show = this.emptyshow
            // 赋值好之后将数据set进去
            this.chart.setOption(this.defaultOption, true);
        },
        getData(model, ds) {
            const sql = processSql(ds, model);
            this.queryBySql(sql, model);
        },
        queryBySql(sql, model) {
            queryBySql({
                initSql: sql,
                command: 'query',
                dataSource: 'defaultDB',
                start: 0,
                limit: 0
            }).then(res => {
                if (res.data) {
                    if (Array.isArray(res.data.root)) {
                        const data = res.data.root;

                        const seriesData = [];
                        const dimFields = model.options.fields.filter((value) => {
                            return value.dType === 'dim';
                        });
                        const zbFields = model.options.fields.filter((value) => {
                            return value.dType === 'zb';
                        });
                        for (const option of data) {
                            seriesData.push({ value: option[zbFields[0].name], name: option[dimFields[0].name] });
                        }
                        console.log('pie-color', zbFields[0].color);
                        this.refreshData(seriesData, zbFields[0].label, zbFields[0].color);
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    watch: {
        option() {
        }
    },
    beforeCreate() {
    },
    created() {

    },
    mounted() {
        this.ro = new ResizeObserver((entries) => {
            entries.map(() => {
                this.chart && this.chart.resize();
                return null;
            });
        });

        this.ro.observe(this.$el);

        this.chart = echarts.init(this.$refs.pieChart);
        this.defaultOption && this.chart.setOption(this.defaultOption);

        if (this.ds) {
            this.getData(this.element, this.ds);
        }
    },
    beforeDestroy() {
        this.ro.unobserve(this.$el);
    }
};
</script>
<style scoped>
    @import './styles/index.scss';
</style>
