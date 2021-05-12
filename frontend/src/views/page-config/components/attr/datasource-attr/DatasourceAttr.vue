<template>
    <div class="datasource-attr">
        <div class="title">
            数据源列表
            <i
                class="ri-add-circle-fill"
                @click="addDs">
            </i>
        </div>
        <div class="list">
            <el-tag
                v-for="ds in datasources"
                closable
                :key="ds.id"
                :disable-transitions="false"
                :type="activeDs && activeDs.id == ds.id ? 'success' : null"
                @click="handleDs(ds)"
                @close="deleteDs(ds)">
                {{ds.label}}
            </el-tag>
        </div>
        <el-form
            v-if="activeDs"
            label-position="top"
            label-width="80px"
            :model="activeDs">
            <el-form-item label="store名称">
                <el-input v-model="activeDs.label"></el-input>
            </el-form-item>
            <el-form-item label="绑定表单">
                <el-select
                    v-model="activeDs.filterName"
                    placeholder="请选择筛选表单">
                    <template v-for="item in config.children">
                        <el-option
                            v-if="config && item.type == 'form'"
                            :key="item.name"
                            :label="item.label || item.name"
                            :value="item.name">
                        </el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="SQL">
                <el-input
                    v-model="activeDs.sql"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 6}">
                </el-input>
            </el-form-item>
            <el-form-item>
                <div slot="label">
                    字段
                    <i
                        class="ri-refresh-fill"
                        @click="refreshColumns">
                    </i>
                </div>
                <el-table
                    border
                    size="mini"
                    style="width: 100%"
                    :data="activeDs.columns">
                    <el-table-column
                        prop="name"
                        label="字段名">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="label"
                        label="字段中文名">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.label"></el-input>
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';
import { queryBySql } from '../../../api/api';

export default {
    name: 'DatasourceAttr',
    componentName: 'DatasourceAttr',
    components: {
    },
    props: ['datasources', 'config'],
    data() {
        return {
            activeDs: this.datasources && this.datasources.length > 0 ? this.datasources[0] : null
        };
    },
    computed: {
    },
    methods: {
        deleteDs(ds) {
            if (this.activeDs === ds) {
                this.activeDs = null;
            }
            this.datasources.splice(this.datasources.indexOf(ds), 1);
        },
        addDs() {
            const key = new Date().getTime();
            const ds = {
                id: `ds${key}`,
                label: `数据源${key}`,
                type: 'ds',
                filterName: '',
                sql: 'select {colPiece},*from tablename where 1=1 {condiPiece} {groupPiece}',
                columns: [],
                widgets: []
            };
            this.datasources.push(ds);
            if (this.datasources.length === 1) {
                this.activeDs = ds;
            }
        },
        handleDs(ds) {
            this.activeDs = ds;
        },
        getFilter() {
            const ds = this.activeDs;
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
        getRealSql() {
            const ds = this.activeDs;
            const form = this.getFilter();
            const sql = processSql(ds, form);
            return sql;
        },
        refreshColumns() {
            queryBySql({
                initSql: this.getRealSql(),
                command: 'query',
                dataSource: 'defaultDB',
                start: 0,
                limit: 1
            }).then(res => {
                const { data } = res;
                if (Array.isArray(data.columnModel)) {
                    this.activeDs.columns = data.columnModel.map(col => {
                        return {
                            name: col.dataIndex,
                            label: col.header,
                            type: col.type
                        };
                    });
                }
            }).catch(e => {
                console.log(e);
            });
        }
    },
    watch: {
        datasources(val) {
            if (!this.activeDs && val.length > 0) {
                this.activeDs = val[0];
            }
        }
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
