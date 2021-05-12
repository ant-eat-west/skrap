<template>
    <el-form
        label-position="top"
        label-width="80px"
        :model="parentOption.options">
        <el-form-item label="表单名称">
            <el-input v-model="parentOption.label"></el-input>
        </el-form-item>
        <el-form-item label="表单标识">
            <el-input v-model="parentOption.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定模型">
            <el-select
                v-model="parentOption.options.ds"
                placeholder="请选择模型"
                clearable
                @change="changeDs">
                <el-option
                    v-for="ds in config.datasources"
                    :key="ds.id"
                    :label="ds.label || ds.id"
                    :value="ds.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="字段列表">
            <div class="title">
                <i
                    class="oper ri-refresh-fill"
                    @click="refreshColumns">
                </i>
                <el-button
                    type="text"
                    @click="importModel">
                    导入到表单
                </el-button>
            </div>
            <el-table
                :data="fields"
                border
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="英文名">
                </el-table-column>
                <el-table-column
                    prop="label"
                    label="中文名">
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="表单类型">
            <el-select
                v-model="parentOption.options.type"
                placeholder="请选择类型">
                <el-option
                    label="块级"
                    value="block">
                </el-option>
                <el-option
                    label="行内"
                    value="inline">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题位置">
            <el-select
                v-model="parentOption.options.labelPosition"
                placeholder="请选择位置">
                <el-option
                    label="左对齐"
                    value="left">
                </el-option>
                <el-option
                    label="右对齐"
                    value="right">
                </el-option>
                <el-option
                    label="顶部对齐"
                    value="top">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="表单布局">
            <el-select
                v-model="parentOption.options.layout"
                placeholder="请选择布局">
                <el-option
                    label="单列"
                    value="100%">
                </el-option>
                <el-option
                    label="双列"
                    value="50%">
                </el-option>
                <el-option
                    label="三列"
                    value="33.33333%">
                </el-option>
                <el-option
                    label="四列"
                    value="25%">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="标题宽度">
            <el-input v-model="parentOption.options.labelWidth"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
import { queryBySql } from '../../../api/api';

export default {
    name: 'FormAttr',
    componentName: 'FormAttr',
    components: {
    },
    props: ['option', 'parentOption', 'name', 'config'],
    data() {
        if (!this.parentOption.options) {
            this.$set(this.parentOption, 'options', {
                type: 'block',
                layout: '100%',
                labelWidth: '80px',
                labelPosition: 'right',
                ds: null
            });
        }
        return {
            fields: []
        };
    },
    computed: {
    },
    methods: {
        importModel() {
            const { children } = this.parentOption;
            for (const field of this.fields) {
                const item = children.find(child => {
                    return child.name === field.name;
                });
                if (!item) {
                    children.push({
                        id: `field${new Date().getTime() + field.name}`,
                        label: field.label,
                        name: field.name,
                        type: 'input',
                        dependent: 'form',
                        options: {
                            type: 'text',
                            placeholder: '请输入文本',
                            rows: 2,
                            clearable: false
                        }
                    });
                }
            }
        },
        refreshColumns() {
            const dsId = this.parentOption.options.ds;
            if (!dsId) {
                this.$notify({
                    title: '提示',
                    message: '未绑定模型，请绑定！',
                    type: 'warning'
                });
            } else {
                const ds = this.config.datasources.find(item => {
                    return item.id === dsId;
                });
                queryBySql({
                    initSql: ds.sql,
                    command: 'query',
                    dataSource: 'defaultDB',
                    start: 0,
                    limit: 1
                }).then(res => {
                    const { data } = res;
                    if (Array.isArray(data.columnModel)) {
                        const { fields } = this;
                        for (const col of data.columnModel) {
                            const item = fields.find(field => {
                                return field.name === col.dataIndex;
                            });
                            if (!item) {
                                fields.push({
                                    name: col.dataIndex,
                                    label: col.header,
                                    type: col.type
                                });
                            }
                        }
                    }
                }).catch(e => {
                    console.log(e);
                });
            }
        },
        changeDs() {
            this.refreshColumns();
        }
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {

    }
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
