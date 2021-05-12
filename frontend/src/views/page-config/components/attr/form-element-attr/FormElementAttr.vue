<template>
    <div>
        <el-form-item label="表单元素类型">
            <el-select
                v-model="currentType"
                placeholder="请选择类型">
                <el-option
                    label="输入框"
                    value="input">
                </el-option>
                <el-option
                    label="选择器"
                    value="select">
                </el-option>
                <el-option
                    label="单选按钮器"
                    value="radio">
                </el-option>
                <el-option
                    label="多选框组"
                    value="checkbox">
                </el-option>
                <el-option
                    label="日期选择器"
                    value="date-picker">
                </el-option>
            </el-select>
        </el-form-item>
    </div>
</template>

<script>
import * as Widget from '../../../data/widget.conf.js';

export default {
    name: 'FormElementAttr',
    componentName: 'FormElementAttr',
    components: {
    },
    props: ['type', 'option', 'parentOption', 'name'],
    data() {
        return {
        };
    },
    computed: {
        currentType: {
            get() {
                return this.type;
            },
            set(val) {
                let type = val.split('-').join('');
                type = type.substring(0, 1).toUpperCase() + type.substring(1);
                const { children } = this.parentOption;
                const { option } = this;
                const widget = new Widget[type](option.id, option.name, option.label);
                children.splice(children.indexOf(option), 1, widget);
                this.$emit('update:option', widget);
                this.$set(this.parentOption.models, widget.name, widget.options.defaultValue);
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

<style scoped>
@import './styles/index.scss';
</style>
