<template>
    <el-form
        v-if="option.type == 'date-picker'"
        label-position="top"
        label-width="80px"
        :model="option">
        <form-element-attr
            :name="name"
            :parent-option="parentOption"
            :option.sync="currentOption"
            :type.sync="option.type">
        </form-element-attr>
        <el-form-item label="标题">
            <el-input v-model="option.label"></el-input>
        </el-form-item>
        <el-form-item label="数据库字段">
            <el-input v-model="option.name"></el-input>
        </el-form-item>
        <el-form-item label="占位文本">
            <el-input v-model="option.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="显示类型">
            <el-select
                v-model="option.options.type"
                placeholder="请选择内容"
                @change="changeType">
                <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label || item.value"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="格式">
            <el-input
                v-model="option.options.format"
                @change="changeFormat">
            </el-input>
        </el-form-item>
        <el-form-item label="操作属性">
            <el-checkbox
                v-model="option.options.clearable">
                可清空文本
            </el-checkbox>
            <el-checkbox
                v-model="option.options.isCurrent">
                默认值设置为当前时间
            </el-checkbox>
        </el-form-item>
    </el-form>
</template>

<script>
import FormElementAttr from '../form-element-attr/FormElementAttr';

export default {
    name: 'DatePickerAttr',
    componentName: 'DatePickerAttr',
    components: {
        FormElementAttr
    },
    props: ['option', 'parentOption', 'name'],
    data() {
        return {
            types: [
                { label: '年', value: 'year' },
                { label: '月', value: 'month' },
                { label: '日期', value: 'date' },
                { label: '多个日期', value: 'dates' },
                { label: '周', value: 'week' },
                { label: '日期范围', value: 'daterange' },
                { label: '月份范围', value: 'monthrange' }
            ]
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
        changeType(type) {
            const typeArr1 = ['year', 'month', 'date', 'dates', 'week'];
            const typeArr2 = ['daterange', 'monthrange'];
            const { parentOption, option } = this;
            if (typeArr1.indexOf(type) > -1 && Array.isArray(parentOption.models[option.name])) {
                this.$set(parentOption.models, option.name, null);
            }
            if (typeArr2.indexOf(type) > -1 && !Array.isArray(parentOption.models[option.name])) {
                this.$set(parentOption.models, option.name, []);
            }
        },
        changeFormat() {
            this.option.options.valueFormat = this.option.options.format;
        }
    },
    watch: {},
    beforeCreate() {},
    created() {}
};
</script>
