<template>
    <div class="elx-widget">
        <div class="header">
            <span class="title" v-text="title"></span>
            <el-tooltip class="item" effect="dark" v-if="descr" placement="right">
                <div slot="content" v-html="descr"></div>
                <span class="uex-icon-help"></span>
            </el-tooltip>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <i class="el-icon-more el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="view">查看</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                    <el-dropdown-item v-show="menuId && menuId != ''" command="detail">查看详情</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ElxWidget',
    componentName: 'ElxWidget',
    components: {},
    props: {
        title: String,
        descr: String,
        name: String,
        menuId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        handleCommand(cmd) {
            if (cmd === 'view') {
                this.$emit('view', this.name);
            } else if (cmd === 'delete') {
                this.$emit('delete', this.name);
            } else if (cmd === 'detail') {
                this.$emit('detail', this.name);
            }
        }
    },
    watch: {},
    beforeCreate() {},
    created() {},
    mounted() {}
};
</script>

<style>
@import './styles/index.scss';
</style>
