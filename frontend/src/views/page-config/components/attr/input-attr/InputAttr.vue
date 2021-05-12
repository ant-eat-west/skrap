<template>
    <el-form
        v-if="option.type == 'input'"
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
        <el-form-item label="文本框类型">
            <el-select
                v-model="option.options.type"
                placeholder="请选择类型">
                <el-option
                    label="文本"
                    value="text">
                </el-option>
                <el-option
                    label="文本域"
                    value="textarea">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="操作属性">
            <el-checkbox v-model="option.options.clearable">可清空文本</el-checkbox>
            <el-checkbox v-model="option.options.showPassword">显示密码</el-checkbox>
        </el-form-item>
        <form-valid-attr
            :name="name"
            :parent-option="parentOption"
            :option.sync="currentOption"
            :type.sync="option.type">
        </form-valid-attr>
    </el-form>
</template>

<script>
import FormElementAttr from '../form-element-attr/FormElementAttr';
import FormValidAttr from '../form-valid-attr/FormValidAttr';

export default {
    name: 'InputAttr',
    componentName: 'InputAttr',
    components: {
        FormElementAttr,
        FormValidAttr
    },
    props: ['option', 'parentOption', 'name'],
    data() {
        return {
        };
    },
    computed: {
        currentOption: {
            get() {
                console.log('change-option', this.option.rules);
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
