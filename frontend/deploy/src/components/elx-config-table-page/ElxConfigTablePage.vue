<template>
    <div class="elx-config-table-page">
        <elx-config-table
            :config="tableConfig"
            :columns="columns">
        </elx-config-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40, 50]"
            :pager-count="5"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
import ElxConfigTable from 'deploy/src/components/elx-config-table-page/components/elx-config-table/ElxConfigTable';
import processSql from './utils/processSql.js';
import { queryBySql } from './api/api';

export default {
    name: 'ElxConfigTablePage',
    componentName: 'ElxConfigTablePage',
    components: {
        ElxConfigTable
    },
    props: {
        formConfig: {
            type: Object,
            default() {
                return {};
            }
        },
        tableConfig: {
            type: Object,
            default() {
                return {};
            }
        },
        name: String,
        filter: {
            type: Object,
            default() {
                return {};
            }
        },
        ds: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            pageNum: 1,
            pageSize: 30,
            totalCount: 0,
            columns: []
        };
    },
    computed: {
    },
    methods: {
        evil(fn) {
            if (typeof fn === 'string' && fn.indexOf('function') > -1) {
                const Fn = Function;
                const newFn = fn.replace(/[\r\n]/g, ' ');
                return new Fn(`return ${newFn}`)();
            } else {
                return null;
            }
        },
        getDataBySql(sql) {
            queryBySql({
                initSql: sql,
                command: 'query',
                dataSource: 'defaultDB',
                start: (this.pageNum - 1) * this.pageSize,
                limit: this.pageSize
            }).then(res => {
                const { data } = res;
                if (Array.isArray(data.root)) {
                    this.tableConfig.data = data.root;
                    this.totalCount = data.count;
                }
                if (Array.isArray(data.columnModel)) {
                    this.columns = data.columnModel.map(col => {
                        return col.dataIndex;
                    });
                }
            }).catch(e => {
                console.log(e);
            });
        },
        getData() {
            if (!this.ds || !this.ds.sql) {
                return;
            }
            const { ds } = this;
            const form = this.filter;
            const sql = processSql(ds, form);

            this.getDataBySql(sql);
        },
        handleSizeChange(size) {
            this.pageSize = size;
            let num = Math.floor(this.totalCount / this.pageSize);
            if (this.totalCount % this.pageSize > 0) {
                num += 1;
            }
            if (num < this.pageNum) {
                this.pageNum = num;
            }
            this.getData('');
        },
        handleCurrentChange(num) {
            this.pageNum = num;
            this.getData('');
        }
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this.getData('');
        });
    }
};
</script>

<style scoped>
    @import './styles/index.scss';
</style>
