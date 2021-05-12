<template>
    <el-form
        v-if="option.type == 'switch'"
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
        <el-form-item label="switch 打开时的背景色">
            <el-color-picker v-model="option.options.activeColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="switch 关闭时的背景色">
            <el-color-picker v-model="option.options.inactiveColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="默认值">
            <el-switch
                v-model="option.options.defaultValue">
            </el-switch>
        </el-form-item>
    </el-form>
</template>

<script>
import FormElementAttr from '../form-element-attr/FormElementAttr';

export default {
    name: 'SwitchAttr',
    componentName: 'SwitchAttr',
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
