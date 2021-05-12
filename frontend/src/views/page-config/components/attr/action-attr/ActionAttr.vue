<template>
    <div
        class="action-attr"
        v-if="action"
        v-show="currentVisible"
        v-clickoutside="close">
        <el-form
            label-width="80px"
            label-position="top">
            <el-form-item label="类型">
                <el-select v-model="action.type" placeholder="请选择类型">
                    <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="绑定表单">
                <el-select v-model="action.form" placeholder="请选择表单">
                    <el-option
                        v-for="item in forms"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="模型动作">
                <el-select v-model="action.showType" placeholder="请选择类型">
                    <el-option
                        v-for="item in actionShowTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';

export default {
    name: 'ActionAttr',
    componentName: 'ActionAttr',
    components: {
    },
    directives: { Clickoutside },
    props: ['action', 'visible'],
    data() {
        return {
            currentVisible: this.visible,
            typeOptions: [
                { value: 'edit', label: '编辑' },
                { value: 'delete', label: '删除' },
                { value: 'custom', label: '自定义' }
            ],
            forms: [],
            actionShowTypes: [
                { value: 'dialog', label: '对话框' },
                { value: 'drawer', label: '抽屉' }
            ]
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
