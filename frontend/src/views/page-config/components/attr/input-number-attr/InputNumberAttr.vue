<template>
    <el-form
        v-if="option.type == 'input-number'"
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
        <el-form-item label="最小值">
            <el-input-number
                v-model="option.options.min">
            </el-input-number>
        </el-form-item>
        <el-form-item label="最大值">
            <el-input-number
                v-model="option.options.max">
            </el-input-number>
        </el-form-item>
        <el-form-item label="步长">
            <el-input-number
                v-model="option.options.step">
            </el-input-number>
        </el-form-item>
        <el-form-item label="默认值">
            <el-input-number
                v-model="option.options.defaultValue">
            </el-input-number>
        </el-form-item>
    </el-form>
</template>

<script>
import FormElementAttr from '../form-element-attr/FormElementAttr';

export default {
    name: 'InputNumberAttr',
    componentName: 'InputNumberAttr',
    components: {
        FormElementAttr
    },
    props: ['option', 'parentOption', 'name'],
    data() {
        return {
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
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {

    }
};
</script>
