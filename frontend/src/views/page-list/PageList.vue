<template>
    <div class="page-list page-view">
        <elx-table-layout
            ref="tableLayout"
            :batch-oper="batchOper"
            :more-filter="true"
            :batch="false"
            :pagination="paginationVisible"
            :type-num="1"
            :type="type">
            <elx-table-filter slot="filter" v-model="form">
                <elx-table-filter-field label="页面名称" prop="name">
                    <template #default>
                        <el-input v-model="form.name" placeholder="页面名称"></el-input>
                    </template>
                </elx-table-filter-field>
            </elx-table-filter>
            <div slot="search">
                <el-button @click="getData">
                    搜索
                </el-button>
                <el-button @click="addPage">
                    新建
                </el-button>
            </div>
            <el-table
                slot="table"
                slot-scope="size"
                ref="table"
                :data="tableData"
                :height="size.height"
                style="width: 100%"
                @row-dblclick="rowDblclick"
            >
                <el-table-column
                    prop="id"
                    show-overflow-tooltip
                    label="页面ID">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="页面名称">
                </el-table-column>
                <el-table-column
                    prop="descr"
                    label="描述"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="userId"
                    label="负责人">
                </el-table-column>
                <el-table-column
                    prop="createDt"
                    :formatter="formatterDate"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="lastupDate"
                    :formatter="formatterDate"
                    label="修改时间">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                slot="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30, 40, 50]"
                :pager-count="5"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalElements"
            ></el-pagination>
        </elx-table-layout>
        <el-dialog
            title="页面配置"
            :visible.sync="dialogFormVisible">
            <el-form
                :model="configForm"
                :label-width="formLabelWidth">
                <el-form-item label="页面ID">
                    <el-input v-model="configForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="页面名称">
                    <el-input v-model="configForm.name"></el-input>
                </el-form-item>
                <el-form-item label="页面描述">
                    <el-input
                        v-model="configForm.descr"
                        type="textarea"
                        rows="4">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取 消
                </el-button>
                <el-button type="primary" @click="savePage">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ElxTableLayout from 'deploy/src/components/elx-table-layout/ElxTableLayout';
import ElxTableFilter from 'deploy/src/components/elx-table-filter/ElxTableFilter';
import ElxTableFilterField from 'deploy/src/components/elx-table-filter/ElxTableFilterField';
import { getPageList, savePage, deletePage } from './api/api';

const moment = require('moment');

export default {
    name: 'PageList',
    componentName: 'PageList',
    components: {
        ElxTableLayout,
        ElxTableFilter,
        ElxTableFilterField
    },
    data() {
        const defaultConfig = {
            id: null,
            name: '',
            descr: '',
            parameters: null
        };
        return {
            type: 'table',
            batchOper: false,
            form: {
                name: ''
            },
            searchVal: '',
            tableData: [],
            tableHeight: 0,
            props: {
                name: 'name',
                cnName: 'label'
            },
            pageNum: 1,
            pageSize: 30,
            totalElements: 0,
            paginationVisible: true,

            defaultConfig: {
                ...defaultConfig
            },
            configForm: {
                ...defaultConfig
            },
            formLabelWidth: '120px',
            dialogFormVisible: false
        };
    },
    computed: {},
    methods: {
        handleSizeChange(size) {
            this.pageSize = size;
            let num = Math.floor(this.totalElements / this.pageSize);
            if (this.totalElements % this.pageSize > 0) {
                num += 1;
            }
            if (num < this.pageNum) {
                this.pageNum = num;
            }
            this.getData();
        },
        handleCurrentChange(num) {
            this.pageNum = num;
            this.getData();
        },
        formatterDate(row, column, cellValue) {
            return moment(cellValue).format('YYYY-MM-DD HH:mm:ss');
        },
        getData() {
            getPageList({
                name: this.form.name,
                pageNum: this.pageNum - 1,
                pageSize: this.pageSize
            })
                .then((res) => {
                    const { data } = res;
                    if (data) {
                        this.tableData = data.content;
                        this.totalElements = data.totalElements;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        addPage() {
            console.log('add-page');
            this.configForm = {
                ...this.defaultConfig
            };
            this.dialogFormVisible = true;
        },
        savePage() {
            this.dialogFormVisible = false;
            savePage(this.configForm)
                .then((res) => {
                    const { data } = res;
                    if (data && data.state === 'success') {
                        this.$notify({
                            type: 'success',
                            title: '保存成功！'
                        });
                        this.getData();
                    } else {
                        this.$notify({
                            type: 'error',
                            title: '保存失败！'
                        });
                    }
                })
                .catch(() => {
                    this.$notify({
                        type: 'error',
                        title: '保存失败！'
                    });
                });
        },
        rowDblclick(row) {
            window.open(`/view/page-config/${row.id}`);
        },
        handleEdit(row) {
            this.configForm = {
                ...row
            };
            this.dialogFormVisible = true;
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该页面, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deletePage(row.id)
                        .then((res) => {
                            if (res.data) {
                                this.$notify({
                                    type: 'success',
                                    title: '成功',
                                    message: '删除成功!'
                                });
                                this.getData();
                            } else {
                                this.$notify({
                                    type: 'error',
                                    title: '失败',
                                    message: '删除失败!'
                                });
                            }
                        })
                        .catch((e) => {
                            console.log(e);
                            this.$notify({
                                type: 'error',
                                title: '失败',
                                message: '删除失败!'
                            });
                        });
                })
                .catch(() => {
                    this.$notify({
                        type: 'info',
                        title: '失败',
                        message: '已取消删除'
                    });
                });
        }
    },
    watch: {},
    beforeCreate() {},
    created() {
        this.getData();
    },
    mounted() {}
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
