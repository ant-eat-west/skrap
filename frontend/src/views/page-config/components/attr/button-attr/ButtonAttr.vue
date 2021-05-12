<template>
    <el-form
        label-position="top"
        label-width="80px"
        :model="option">
        <el-form-item label="控件名称">
            <el-input v-model="option.label"></el-input>
        </el-form-item>
        <el-form-item label="按钮类型">
            <el-select
                v-model="option.options.type"
                placeholder="请选择类型">
                <el-option
                    label="提交按钮"
                    value="submit">
                </el-option>
                <el-option
                    label="查询按钮"
                    value="query">
                </el-option>
                <el-option
                    label="下载按钮"
                    value="download">
                </el-option>
                <el-option
                    label="自定义"
                    value="custom">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="服务">
            <el-input v-model="option.options.url"></el-input>
        </el-form-item>
        <el-form-item label="执行成功提示消息">
            <el-input v-model="option.options.successMsg"></el-input>
        </el-form-item>
        <el-form-item label="执行失败提示消息">
            <el-input v-model="option.options.errorMsg"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                @click="testClick">
                测试点击
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'ButtonAttr',
    componentName: 'ButtonAttr',
    components: {
    },
    props: ['option', 'parentOption', 'name'],
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        testClick() {
            this.$emit(this.option.options.type, this.parentOption, this.option);
        },
        evil(fn) {
            if (typeof fn === 'string' && fn.indexOf('function') > -1) {
                const Fn = Function;
                const newFn = fn.replace(/[\r\n]/g, ' ');
                return new Fn(`return ${newFn}`)();
            } else {
                return null;
            }
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
