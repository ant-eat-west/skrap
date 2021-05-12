<template>
    <el-form
        label-position="top"
        label-width="80px"
        :model="option.options">
        <el-form-item label="表格标识">
            <el-input
                v-model="option.name"
                disabled>
            </el-input>
        </el-form-item>
        <el-form-item label="绑定数据源">
            <el-select
                v-model="option.options.ds"
                placeholder="请选择数据源"
                clearable>
                <el-option
                    v-for="ds in config.datasources"
                    :key="ds.id"
                    :label="ds.label || ds.id"
                    :value="ds.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button
                @click="testSql">
                测试数据
            </el-button>
        </el-form-item>
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="操作列" name="1">
                <el-form
                    label-position="top">
                    <el-form-item label="标题">
                        <el-input v-model="option.options.actionColumnOption.label"></el-input>
                    </el-form-item>
                    <el-form-item label="宽度">
                        <el-input v-model="option.options.actionColumnOption.width"></el-input>
                    </el-form-item>
                    <el-form-item label="列固定">
                        <el-radio-group v-model="option.options.actionColumnOption.fixed">
                            <el-radio-button :label="false">无</el-radio-button>
                            <el-radio-button label="left">左</el-radio-button>
                            <el-radio-button label="right">右</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="操作项">
                        <draggable
                            class="dragArea list-group"
                            :list="option.options.actions"
                            :group="{pull: false, put: false}"
                            handle=".draggable">
                            <div
                                v-for="action in option.options.actions"
                                :key="action.name"
                                class="action-container">
                                <i class="oper ri-drag-move-2-line draggable"></i>
                                <el-input
                                    v-model="action.label"
                                    @blur="changeAction(action)">
                                </el-input>
                                <span
                                    class="oper uex-icon-edit"
                                    @click="editAction(action)">
                                </span>
                                <span
                                    class="oper uex-icon-delete"
                                    @click="deleteAction(action)">
                                </span>
                            </div>
                        </draggable>
                        <el-button
                            type="info"
                            @click="addAction">
                            添加一项
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
            <el-collapse-item title="顶部操作" name="2">
            </el-collapse-item>
            <el-collapse-item title="风格与样式" name="3">
            </el-collapse-item>
            <el-collapse-item title="行选择器" name="4">
            </el-collapse-item>
            <el-collapse-item title="分页设置" name="5">
            </el-collapse-item>
        </el-collapse>
    </el-form>
</template>

<script>
import * as Widget from '../../../data/widget.conf.js';

export default {
    name: 'TableAttr',
    componentName: 'TableAttr',
    components: {
    },
    props: ['option', 'name', 'config'],
    data() {
        if (!this.option.options.actionColumnOption) {
            this.$set(this.option.options, 'actionColumnOption', {
                label: '操作',
                width: '100px',
                fixed: false
            });
        }
        return {
            activeNames: []
        };
    },
    computed: {
    },
    methods: {
        testSql() {
            this.$emit('test-sql', this.option);
        },
        handleChange() {

        },
        addAction() {
            console.log('add-action');
            if (!Array.isArray(this.option.options.actions)) {
                this.$set(this.option.options, 'actions', []);
            }
            const key = new Date().getTime();
            this.option.options.actions.push(new Widget.Action(`action${key}`, `操作${key}`));
        },
        changeAction(action) {
            console.log(action);
        },
        editAction(action) {
            this.$emit('edit-action', action);
        },
        deleteAction(action) {
            console.log(action);
        }
    },
    watch: {
        'option.options.ds': function (val) {
            for (const ds of this.config.datasources) {
                const index = ds.widgets.indexOf(this.option.name);
                if (index > -1 && ds.id !== val) {
                    ds.widgets.splice(index, 1);
                }
                if (ds.id === val && index < 0) {
                    ds.widgets.push(this.option.name);
                }
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
