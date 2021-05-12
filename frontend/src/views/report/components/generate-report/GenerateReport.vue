<template>
    <div class="generate-report">
        <div class="page-header">
            <span
                class="title"
                v-text="title">
            </span>
            <el-tooltip
                class="item"
                effect="dark"
                :content="descr"
                popper-class="tooltip-width-300"
                placement="bottom-end">
                <span
                    class="uex-icon-help">
                </span>
            </el-tooltip>
        </div>
        <div class="page config-widget" :class="config.options.type">
            <div
                class="region config-widget drag-widget"
                v-for="element in config.children"
                :key="element.id"
                :class="{
                    'attr-active': attrModel ? attrModel.name == element.name : false,
                    'form inline': element.type == 'form' && element.options.type == 'inline',
                    'form block': element.type == 'form' && element.options.type == 'block',
                    table: element.type == 'table',
                    graph: element.type == 'graph',
                    'grid-layout': element.type == 'grid-layout'
                }"
                :style="{
                    'flex-shrink': element.type == 'form' ? 1 : 1,
                    flex: element.type != 'form' ? 1 : '1'
                }"
            >
                <template v-if="element.type == 'form' && element.options.type == 'inline'">
                    <div class="form filter">
                        <el-form
                            :inline="true"
                            :model="element.models">
                            <elx-table-filter v-model="element.models">
                                <template v-for="(item, index) in element.children">
                                    <elx-table-filter-field
                                        :key="index"
                                        v-if="item.type != 'button'"
                                        :label="item.label"
                                        :prop="item.name"
                                    >
                                        <template #default>
                                            <generate-form-item
                                                :name="name"
                                                :widget="item"
                                                :models="element.models"
                                                @query="query(element)"
                                            ></generate-form-item>
                                        </template>
                                    </elx-table-filter-field>
                                </template>
                            </elx-table-filter>
                            <div class="pos-right">
                                <template v-for="(item, index) in element.children">
                                    <generate-form-item
                                        :key="index"
                                        v-if="item.type == 'button'"
                                        :name="name"
                                        :widget="item"
                                        :models="element.models"
                                        @query="query(element)"
                                    ></generate-form-item>
                                </template>
                            </div>
                        </el-form>
                    </div>
                </template>
                <template v-if="element.type == 'form' && element.options.type != 'inline'">
                    <generate-form
                        :element="element">
                    </generate-form>
                </template>
                <template v-if="element.type == 'table'">
                    <div class="table">
                        <elx-config-table-page
                            :ref="element.name"
                            :name="name"
                            :table-config="element.options"
                            :ds="getDs(element.options.ds)"
                            :filter="getFilter(element.options.ds)"
                        ></elx-config-table-page>
                    </div>
                </template>
                <template v-if="element.type == 'graph'">
                    <div class="graph">
                        <component
                            :ref="element.name"
                            class="chart"
                            :table-config="element.options"
                            :ds="getDs(element.options.ds)"
                            :element="element"
                            :is="element.options.type + '-chart'">
                        </component>
                    </div>
                </template>
                <template v-if="element.type == 'grid-layout'">
                    <el-row
                        :gutter="element.options.gutter"
                        :style="{
                            height: element.options.height
                        }"
                    >
                        <el-col v-for="item in element.children" :key="item.id" :span="item.span">
                            <div class="grid-content">
                                <div
                                    class="region config-widget drag-widget"
                                    v-for="child in item.children"
                                    :key="child.id"
                                    :class="{
                                        'attr-active': attrModel ? attrModel.name == child.name : false,
                                        form: child.type == 'form',
                                        table: child.type == 'table',
                                        'grid-layout': child.type == 'grid-layout',
                                        'graph-layout': child.type == 'graph-layout'
                                    }"
                                    :style="{
                                        'flex-shrink': child.type == 'form' ? 1 : 1,
                                        flex: child.type == 'table' ? 1 : '1'
                                    }"
                                >
                                    <template v-if="child.type == 'table'">
                                        <elx-config-table-page
                                            :ref="child.name"
                                            :name="name"
                                            :table-config="child.options"
                                            :ds="getDs(child.options.ds)"
                                            :filter="getFilter(child.options.ds)"
                                        ></elx-config-table-page>
                                    </template>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import GenerateForm from '../generate-form/GenerateForm';
import GenerateFormItem from '../../../page-config/components/generate-form-item/GenerateFormItem';
import ElxConfigTablePage from 'deploy/src/components/elx-config-table-page/ElxConfigTablePage';
import ElxTableFilter from 'deploy/src/components/elx-table-filter/ElxTableFilter';
import ElxTableFilterField from 'deploy/src/components/elx-table-filter/ElxTableFilterField';
// import LineChart from '../../../page-config/components/chart/line-chart/LineChart';
// import BarChart from '../../../page-config/components/chart/bar-chart/BarChart';
// import PieChart from '../../../page-config/components/chart/pie-chart/PieChart';

import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';

export default {
    name: 'GenerateReport',
    componentName: 'GenerateReport',
    components: {
        GenerateForm,
        GenerateFormItem,
        ElxConfigTablePage,
        ElxTableFilter,
        ElxTableFilterField
        // LineChart,
        // BarChart,
        // PieChart
    },
    props: ['config', 'title', 'descr'],
    data() {
        return {
            name: `report${new Date().getTime()}`,
            attrModel: {},
            attrFieldModel: {},
            vm: {}
        };
    },
    computed: {},
    methods: {
        getDs(id) {
            return this.config.datasources.find((ds) => {
                return ds.id === id;
            });
        },
        getFilter(id) {
            const ds = this.config.datasources.find((item) => {
                return item.id === id;
            });
            if (ds) {
                const form = this.config.children.find((item) => {
                    return item.name === ds.filterName;
                });
                if (form) {
                    return form;
                }
            }
            return null;
        },
        getData(ds, form) {
            const sql = processSql(ds, form);
            for (const widgetName of ds.widgets) {
                if (this.$refs[widgetName] && this.$refs[widgetName][0]) {
                    if ('getDataBySql' in this.$refs[widgetName][0]) {
                        this.$refs[widgetName][0].getDataBySql(sql);
                    } else {
                        const chart = this.$refs[widgetName][0];
                        chart.queryBySql(sql, chart.element);
                    }
                }
            }
        },
        query(form) {
            const ds = this.config.datasources.find((item) => {
                return item.filterName === form.name;
            });
            if (ds) {
                this.getData(ds, form);
            }
        }
    },
    watch: {},
    beforeCreate() {},
    created() {
    },
    mounted() {}
};
</script>
<style scoped>
@import './styles/index.scss';
</style>
