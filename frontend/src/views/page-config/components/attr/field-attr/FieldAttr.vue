<template>
    <div
        class="field-attr"
        v-if="field"
        v-show="currentVisible"
        v-clickoutside="close">
        <el-form
            label-width="80px"
            label-position="top">
            <el-form-item label="标题">
                <el-input v-model="field.label"></el-input>
            </el-form-item>
            <el-form-item label="数据字段">
                <el-input v-model="field.name"></el-input>
            </el-form-item>
            <el-form-item label="宽度">
                <el-input v-model="field.width"></el-input>
            </el-form-item>
            <el-form-item label="对齐方式">
                <el-radio-group v-model="field.align">
                    <el-radio-button label="left">居左</el-radio-button>
                    <el-radio-button label="center">居中</el-radio-button>
                    <el-radio-button label="right">居右</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="列固定">
                <el-radio-group v-model="field.fixed">
                    <el-radio-button :label="false">无</el-radio-button>
                    <el-radio-button label="left">左</el-radio-button>
                    <el-radio-button label="right">右</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分组标题">
                <el-input v-model="field.groupLabel"></el-input>
            </el-form-item>
            <el-form-item label="显示排序">
                <el-switch v-model="field.sortable"></el-switch>
            </el-form-item>
            <el-form-item label="列宽调整">
                <el-switch v-model="field.resizable"></el-switch>
            </el-form-item>
            <el-form-item label="标题定制渲染">
                <el-button
                    type="info"
                    v-model="field.renderHeaderStr">
                    绑定动作
                </el-button>
            </el-form-item>
            <el-form-item label="内容定制渲染">
                <el-button
                    type="info"
                    v-model="field.renderCell">
                    绑定动作
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';

export default {
    name: 'FieldAttr',
    componentName: 'FieldAttr',
    components: {
    },
    directives: { Clickoutside },
    props: ['field', 'visible'],
    data() {
        return {
            currentVisible: this.visible
        };
    },
    computed: {
    },
    methods: {
        close() {
            this.currentVisible = false;
            this.$emit('update:visible', this.currentVisible);
        }
    },
    watch: {
        visible() {
            this.currentVisible = this.visible;
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
