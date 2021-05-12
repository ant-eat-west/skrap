<template>
    <div class="field-list-attr">
        <div class="title">
            <span>字段列表</span>
            <i
                class="oper ri-refresh-fill"
                @click="refreshColumns">
            </i>
            <span
                class="oper uex-icon-plus-fill"
                @click="addField">
            </span>
        </div>
        <div class="field-list-title">
            <span>标题</span>
            <span>数据字段</span>
        </div>
        <draggable
            class="dragArea list-group"
            :list="option.options.fields"
            :group="{pull: false, put: false}"
            handle=".draggable">
            <div
                v-for="field in option.options.fields"
                :key="field.name"
                class="field-container">
                <i class="oper ri-drag-move-2-line draggable"></i>
                <el-input
                    v-model="field.currentName"
                    @blur="changeField(field)">
                </el-input>
                <el-input v-model="field.label"></el-input>
                <span
                    class="oper uex-icon-edit"
                    @click="editField(field)">
                </span>
                <span
                    class="oper uex-icon-delete"
                    @click="deleteField(field)">
                </span>
            </div>
        </draggable>
    </div>
</template>

<script>
import * as Widget from '../../../data/widget.conf.js';
import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';
import { queryBySql } from '../../../api/api';

export default {
    name: 'FieldListAttr',
    componentName: 'FieldListAttr',
    components: {
    },
    props: ['option', 'name', 'config'],
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        addField() {
            const key = new Date().getTime();
            this.option.options.fields.push(new Widget.Field(`field${key}`, `字段${key}`));
        },
        editField(field) {
            this.$emit('edit-field', field);
        },
        deleteField(field) {
            const { fields } = this.option.options;
            fields.splice(fields.indexOf(field), 1);
        },
        changeField(field) {
            field.name = field.currentName;
        },
        setCurrentName(fields) {
            for (const field of fields) {
                if (!('currentName' in field)) {
                    this.$set(field, 'currentName', field.name);
                }
            }
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
        refreshColumns() {
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
                    if (Array.isArray(data.columnModel)) {
                        const { fields } = this.option.options;
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
        }
    },
    watch: {
        'option.options.fields': function (val) {
            this.setCurrentName(val);
        }
    },
    beforeCreate() {
    },
    created() {
        this.setCurrentName(this.option.options.fields);
    }
};
</script>
<style scoped>
    @import './styles/index.scss';
</style>
