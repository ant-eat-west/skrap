<template>
    <el-form
        v-if="option.type == 'cascader'"
        class="cascader-attr"
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
        <el-form-item label="选项" class="select-options">
            <el-radio-group v-model="option.options.optionsType">
                <el-radio label="static" border>
                    静态数据
                </el-radio>
                <el-radio label="dynamic" border>
                    动态数据
                </el-radio>
            </el-radio-group>
            <template v-if="option.options.optionsType == 'static'">
                <el-tree
                    node-key="VALUE"
                    default-expand-all
                    draggable
                    :data="option.options.options"
                    :expand-on-click-node="false"
                    :render-content="renderContent">
                </el-tree>
                <el-button type="text" @click="addOptions">
                    添加选项
                </el-button>
            </template>
            <template v-if="option.options.optionsType == 'dynamic'">
                <el-radio-group class="dynamic-group" size="mini" v-model="option.options.dynamicType">
                    <el-radio label="sql">
                        SQL
                    </el-radio>
                    <el-radio label="api">
                        API
                    </el-radio>
                </el-radio-group>
                <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="option.options.optionsMethod"
                ></el-input>
            </template>
        </el-form-item>
        <el-form-item label="输入框显示文本">
            <el-checkbox v-model="option.options.showAllLevels">显示选中值的完整路径</el-checkbox>
        </el-form-item>
        <el-form-item label="操作属性">
            <el-checkbox v-model="option.options.clearable">可清空文本</el-checkbox>
            <el-checkbox v-model="option.options.filterable">可搜索选项</el-checkbox>
        </el-form-item>
    </el-form>
</template>

<script>
import FormElementAttr from '../form-element-attr/FormElementAttr';

export default {
    name: 'InputAttr',
    componentName: 'InputAttr',
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
        addOptions() {
            const option = {
                VALUE: `option${new Date().getTime()}`
            };
            option.LABEL = option.VALUE;
            this.option.options.options.push(option);
        },
        append(data) {
            const VALUE = `option${new Date().getTime()}`;
            const newChild = {
                VALUE,
                LABEL: VALUE,
                children: []
            };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },
        remove(node, data) {
            const { parent } = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        renderContent(h, { node, data }) {
            console.log(node, data);
            return (
                <span class="custom-tree-node">
                    <el-input v-model={data.VALUE}></el-input>
                    <el-input v-model={data.LABEL}></el-input>
                    <span
                        class="uex-icon-plus-fill"
                        on-click={ () => this.append(data) }>
                    </span>
                    <span
                        class="uex-icon-delete"
                        on-click={ () => this.remove(node, data) }>
                    </span>
                </span>
            );
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
