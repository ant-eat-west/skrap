<template>
    <el-form label-position="top" label-width="80px" :model="option.options">
        <el-form-item label="图形标识">
            <el-input v-model="option.name" disabled>
            </el-input>
        </el-form-item>
        <el-form-item label="图形类型">
            <el-select v-model="option.options.type" placeholder="请选择类型">
                <el-option v-for="option in types" :label="option.label" :value="option.value" :key="option.value">
                </el-option>
            </el-select>
            <div class="more-config"><span>更多属性配置</span></div>
        </el-form-item>
        <el-form-item label="绑定数据源">
            <el-select v-model="option.options.ds" placeholder="请选择数据源" @change="getField" clearable>
                <el-option v-for="ds in config.datasources" :key="ds.id" :label="ds.label || ds.id" :value="ds.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="testSql">
                测试数据
            </el-button>
        </el-form-item>
        <div v-if="option.options.fields.length > 0" class="field-list">
            <div class="field-title"><span>字段</span></div>
            <div v-for="field in option.options.fields" :key="field.name" class="field-container">
                <el-form label-position="top" label-width="80px" :model="field">
                    <div class="field-label"><span>{{field.name}}</span></div>
                    <el-form-item label="">
                        <el-input v-model="field.label"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-select v-model="field.dType" placeholder="请选择类型">
                            <el-option v-for="option in fieldTypes" :label="option.label" :value="option.value" :key="option.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="field.dType =='zb' && option.options.type != 'pie'" label="">
                        <!-- <colorPicker v-model="field.color" /> -->
                        <el-color-picker v-model="field.color" size="small"></el-color-picker>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </el-form>
</template>
<script>
import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';
import { queryBySql } from '../../../api/api';

export default {
    name: 'GraphAttr',
    componentName: 'GraphAttr',
    components: {},
    props: ['option', 'name', 'config', 'data'],
    data() {
        return {
            types: [
                { label: '折线图', value: 'line' },
                { label: '柱状图', value: 'bar' },
                { label: '饼状图', value: 'pie' }
            ],
            fieldTypes: [
                { label: '指标', value: 'zb' },
                { label: '维度', value: 'dim' }
            ],
            defaultColor: '#2D84FB'
        };
    },
    computed: {},
    methods: {
        headleChangeColor(field) {
            field.color = this.color;
            console.log(field);
        },
        testSql() {
            const dimFields = this.option.options.fields.filter((value) => {
                return value.dType === 'dim';
            });
            const zbFields = this.option.options.fields.filter((value) => {
                return value.dType === 'zb';
            });
            if (dimFields.length === 0 && zbFields.length === 0) {
                this.$notify({
                    title: '提示',
                    message: '请选择字段类型',
                    type: 'warning'
                });
                return;
            }
            if (dimFields.length === 0) {
                this.$notify({
                    title: '提示',
                    message: '未设置维度字段，请设置！',
                    type: 'warning'
                });
                return;
            }
            if (zbFields.length === 0) {
                this.$notify({
                    title: '提示',
                    message: '未设置指标字段，请设置！',
                    type: 'warning'
                });
                return;
            }
            this.$emit('test-sql', this.option);
        },
        getFilter(ds) {
            if (ds) {
                const form = this.config.children.find(item => {
                    return item.name === ds.filterName;
                });
                if (form) {
                    return form;
                }
            }
            return null;
        },
        getRealSql(ds) {
            const form = this.getFilter(ds);
            const sql = processSql(ds, form);
            return sql;
        },
        getField() {
            const dsId = this.option.options.ds;
            if (!dsId) {
                this.$notify({
                    title: '提示',
                    message: '未绑定数据源，请绑定！',
                    type: 'warning'
                });
            } else {
                const ds = this.config.datasources.find(item => {
                    return item.id === dsId;
                });
                queryBySql({
                    initSql: this.getRealSql(ds),
                    command: 'query',
                    dataSource: 'defaultDB',
                    start: 0,
                    limit: 1
                }).then(res => {
                    const { data } = res;
                    console.log('getField data', data);
                    console.log('getField options', this.option.options);
                    if (Array.isArray(data.columnModel)) {
                        const fields = [];
                        for (const col of data.columnModel) {
                            fields.push({
                                name: col.dataIndex,
                                label: col.header,
                                type: col.type,
                                dType: '',
                                color: this.defaultColor
                            });
                        }
                        this.option.options.fields = JSON.parse(JSON.stringify(fields));
                        console.log('getField options', this.option.options);
                        // const { fields } = this.option.options;
                        // console.log("getField fields", fields);
                        // for (const col of data.columnModel) {
                        //     const item = fields.find(field => {
                        //         return field.name === col.dataIndex;
                        //     });
                        //     if (!item) {
                        //         fields.push({
                        //             name: col.dataIndex,
                        //             label: col.header,
                        //             type: col.type
                        //         });
                        //     }
                        // }
                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        }
    },
    watch: {
        'option.options.ds': function(val) {
            for (const ds of this.config.datasources) {
                const index = ds.widgets.indexOf(this.option.name);
                if (index > -1 && ds.id !== val) {
                    ds.widgets.splice(index, 1);
                }
                if (ds.id === val && index < 0) {
                    ds.widgets.push(this.option.name);
                }
            }
            if (!val) {
                this.option.options.fields = [];
            }
        }
    },
    beforeCreate() {},
    created() {
        this.option.options.fields.map((val) => {
            return val.color || this.defaultColor;
        });
    }
};
</script>
<style scoped>
@import './styles/index.scss';
</style>
