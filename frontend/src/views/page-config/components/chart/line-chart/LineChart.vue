<template>
    <div
        ref='lineChart'
        width='100%'
        height='100%'>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';
import ResizeObserver from 'resize-observer-polyfill';
import { queryBySql } from '../../../api/api';

export default {
    name: 'LineChart',
    componentName: 'LineChart',
    components: {
    },
    props: ['option', 'parentOption', 'ds', 'element'],
    data() {
        return {
            chart: null,
            defaultOption: {
                grid: {
                    top: 20,
                    bottom: 30,
                    left: 40,
                    right: 40,
                    containLabel: true
                },
                color: ['#2D84FB', '#05C056', '#907EEC', '#FFC107', '#AAB0BD', '#FF9292'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                            precision: 2
                            // formatter: function(params) {
                            //     if (params.axisDimension === 'x') {
                            //         return echarts.format.formatTime('yyyyMM', params.value);
                            //     }
                            //     return params.value.toFixed(2);
                            // }
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLabel: {
                        color: '#495465',
                        formatter(value) {
                            let currentValue = value;
                            if (value.length > 10) {
                                currentValue = `${value.substring(0, 10)}...`;
                            }
                            return currentValue;
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    boundaryGap: true
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#495465'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    boundaryGap: false
                },
                series: [{
                    name: '三期二B域',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                    showSymbol: true
                }]
            }
            /*
            defaultOption: {
                grid: {
                    top: 20,
                    bottom: 30,
                    left: 40,
                    right: 40,
                    containLabel: true
                },
                color: ['#2D84FB', '#05C056', '#907EEC', '#FFC107', '#AAB0BD', '#FF9292'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985',
                            precision: 2,
                            formatter: function(params) {
                                if (params.axisDimension === 'x') {
                                    return echarts.format.formatTime('yyyyMM', params.value);
                                }
                                return params.value.toFixed(2);
                            }
                        }
                    }
                },
                xAxis: {
                    type: 'time',
                    axisLabel: {
                        color: '#495465',
                        formatter(value) {
                           return echarts.format.formatTime('yyyyMM', value);
                        },
                        rich: {
                            year: {
                                color: '#000',
                                fontWeight: 'bold'
                            },
                            month: {
                                color: '#999'
                            }
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    boundaryGap: true
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: '#495465'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#DADFE6',
                            width: 1
                        }
                    },
                    boundaryGap: false
                },
                series: [{
                    name: '三期二B域',
                    data:[
                        ['2020-12', 69837],
                        ['202101', 77544],
                        ['202102', 88737],
                        ['202103', 154964]
                    ],
                    type: 'line',
                    smooth: true,
                    showSymbol: true
                }, {
                    name: 'time-range',
                    data:[
                        ['202009', null],
                        ['202105', null]
                    ],
                    type: 'line',
                    show: false,
                    showInTooltip: false,
                    connectNulls: false,
                    tooltip: {
                        show: false
                    }
                }]
            }
            */
        };
    },
    computed: {
    },
    methods: {
        initChart() {
            if (this.chart) {
                return;
            }
            this.ro = new ResizeObserver((entries) => {
                entries.map(() => {
                    this.chart && this.chart.resize();
                    return null;
                });
            });

            this.ro.observe(this.$el);

            this.chart = echarts.init(this.$refs.lineChart);
            this.defaultOption && this.chart.setOption(this.defaultOption);

            if (this.ds) {
                this.getData(this.element, this.ds);
            }
        },
        refreshData(data, datax, color) {
            // data.push({
            //     name: 'time-range',
            //     data: [
            //         ['202009', null],
            //         ['202105', null]
            //     ],
            //     type: 'line',
            //     show: false,
            //     showInTooltip: false,
            //     connectNulls: false,
            //     tooltip: {
            //         show: false
            //     }
            // });
            // console.log(data);
            // console.log(JSON.stringify(data));
            // this.chart.setOption({
            //     series: data
            // }, {
            //     replaceMerge: ['series']
            // });
            // 清空echarts之前渲染的数据
            this.chart.clear();
            // 赋值y轴
            this.defaultOption.series = data;
            // 修改颜色
            this.defaultOption.color = color;
            this.defaultOption.xAxis.data = datax;
            // 标题的展示和隐藏
            // this.lineOption.title.show = this.emptyshow;
            // 赋值好之后将数据set进去
            this.chart.setOption(this.defaultOption, true);
        },
        getData(model, ds) {
            const sql = processSql(ds, model);
            this.queryBySql(sql, model);
        },
        queryBySql(sql, model) {
            queryBySql({
                // initSql: `
                //     select
                //     REPLACE(dim1, '1#', '') as label,
                //     time_id as 'x',
                //     sum(ind2) as 'y'
                //     from dacp_rpt_tab_his
                //     where time_id >= '202012' AND time_id >= '202012' AND rpt_id='rpt_asset_value_month' AND ds_group='1'
                //     group by ds_group, time_id, dim1, dim2
                // `,
                initSql: sql,
                command: 'query',
                dataSource: 'defaultDB',
                start: 0,
                limit: 0
            }).then(res => {
                if (res.data) {
                    if (Array.isArray(res.data.root)) {
                        const data = res.data.root;

                        const datax = [];
                        const series = [];
                        const datay = [];
                        const color = [];
                        const dimFields = model.options.fields.filter((value) => {
                            return value.dType === 'dim';
                        });
                        const zbFields = model.options.fields.filter((value) => {
                            return value.dType === 'zb';
                        });
                        for (const option of data) {
                            const X = option[dimFields[0].name];
                            datax.push(X);
                        }
                        for (const zb of zbFields) {
                            const Y = [];
                            for (const option of data) {
                                Y.push(option[zb.name]);
                            }
                            color.push(zb.color);
                            datay.push({ name: zb.label, value: Y });
                        }
                        for (const item of datay) {
                            series.push({
                                name: item.name,
                                data: item.value,
                                type: 'line',
                                smooth: true,
                                showSymbol: true
                                /* areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(45, 132, 251, 0.5)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(45, 132, 251, 0)'
                                    }])
                                } */
                            });
                        }
                        this.refreshData(series, datax, color);
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
        this.initChart();
        // this.queryBySql();
    },
    beforeDestroy() {
        this.ro.unobserve(this.$el);
    }
};
</script>
<style scoped>
    @import './styles/index.scss';
</style>
