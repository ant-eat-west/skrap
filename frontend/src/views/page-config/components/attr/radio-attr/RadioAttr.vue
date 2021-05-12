<template>
    <el-form
        v-if="option.type == 'radio'"
        class="radio-attr"
        label-position="top"
        label-width="80px"
        :model="option">
        <form-element-attr
            :name="name"
            :parent-option="parentOption"
            :option.sync="currentOption"
            :type.sync="option.type">
        </form-element-attr>
        <el-form-item label="控件名称">
            <el-input v-model="option.label"></el-input>
        </el-form-item>
        <el-form-item label="数据库字段">
            <el-input v-model="option.name"></el-input>
        </el-form-item>
        <el-form-item label="占位文本">
            <el-input v-model="option.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="类型">
            <el-select
                v-model="option.options.type"
                placeholder="请选择内容">
                <el-option
                    label="多选框组"
                    value="group">
                </el-option>
                <el-option
                    label="单个"
                    value="single">
                </el-option>
            </el-select>
        </el-form-item>
        <template v-if="option.options.type == 'single'">
            <el-form-item label="LABEL">
                <el-input v-model="option.options.LABEL"></el-input>
            </el-form-item>
        </template>
        <el-form-item
            label="选项"
            class="select-options"
            v-if="option.options.type == 'group'">
            <el-radio-group
                v-model="option.options.optionsType">
                <el-radio
                    label="static"
                    border>
                    静态数据
                </el-radio>
                <el-radio
                    label="dynamic"
                    border>
                    动态数据
                </el-radio>
            </el-radio-group>
            <template v-if="option.options.optionsType == 'static'">
                <el-checkbox
                    class="show-label"
                    v-model="showLabel">
                    是否显示标签
                </el-checkbox>
                <ul>
                    <draggable
                        class="dragArea list-group"
                        :list="option.options.options"
                        :group="{ pull: false, put: false }"
                        handle=".draggable"
                    >
                        <li
                            class="select-option"
                            :class="{ 'only-value': !showLabel }"
                            :label="item.LABEL || item.VALUE"
                            :key="index"
                            v-for="(item, index) in option.options.options"
                        >
                            <el-input v-model="item.VALUE" clearable></el-input>
                            <el-input v-show="showLabel" v-model="item.LABEL" clearable></el-input>
                            <i class="ri-drag-move-2-line draggable"></i>
                            <i class="ri-delete-bin-fill" @click="deleteOption(item)"></i>
                        </li>
                    </draggable>
                </ul>
                <el-button
                    type="text"
                    @click="addOptions">
                    添加选项
                </el-button>
                <el-button
                    type="text"
                    @click="resetValue">
                    重置选择
                </el-button>
            </template>
            <template v-if="option.options.optionsType == 'dynamic'">
                <el-radio-group
                    class="dynamic-group"
                    size="mini"
                    v-model="option.options.dynamicType">
                    <el-radio
                        label="sql">
                        SQL
                    </el-radio>
                    <el-radio
                        label="api">
                        API
                    </el-radio>
                </el-radio-group>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="option.options.optionsMethod">
                </el-input>
            </template>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input
                v-model="option.options.defaultValue">
            </el-input>
        </el-form-item>
        <el-form-item label="操作属性">
            <el-checkbox v-model="option.options.clearable">可清空文本</el-checkbox>
        </el-form-item>
    </el-form>
</template>

<script>
import FormElementAttr from '../form-element-attr/FormElementAttr';

export default {
    name: 'RadioAttr',
    componentName: 'RadioAttr',
    components: {
        FormElementAttr
    },
    props: ['option', 'parentOption', 'name'],
    data() {
        return {
            showLabel: false,
            dataModel: []
        };
    },
    computed: {
        currentOption: {
            get() {
                return this.option;
            },
            set(val) {
                this.$emit('update:option', val);
            }
        }
    },
    methods: {
        addOptions() {
            const option = {
                value: `option${new Date().getTime()}`
            };
            if (this.showLabel) {
                option.LABEL = option.VALUE;
            }
            this.option.options.options.push(option);
        },
        deleteOption(option) {
            const { options } = this.option.options;
            options.splice(options.indexOf(option), 1);
        },
        resetValue() {

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
