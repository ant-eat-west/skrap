<template>
    <div class="elx-tab-layout">
        <div class="elx-tab-frame">
            <elx-tabs
                ref="elxTabs"
                v-model="currentValue"
                type="border-card"
                @tab-click="tabClick"
                @tab-remove="tabRemove"
                @tab-contextmenu="tabContextmenu"
                @edit="edit"
                closable
            >
                <div class="title" slot="title" @click="backPlaceholder">
                    <el-tooltip popper-class="elx-caliber-tooltip" effect="dark" placement="right">
                        <div slot="content" class="caliber-tip" v-html="caliber"></div>
                        <span v-if="caliber != ''" :class="icon + ' icon'"></span>
                    </el-tooltip>
                    <span v-if="caliber == ''" :class="icon + ' icon'"></span>
                    <span class="text" v-html="title"></span>
                </div>
                <div class="extra" v-if="showRight" slot="extra">
                    <el-button type="primary" @click.native="tabAdd">
                        <span class="uex-icon-add"></span>
                        <span class="text" v-html="newBtnLabel"></span>
                    </el-button>
                    <div class="more">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <span class="uex-icon-more-row"></span>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    v-for="item in tabData"
                                    :key="item.name"
                                    :class="{ active: item.name == currentValue }"
                                    @click.native="changeActive(item)"
                                >
                                    {{ item.label }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div v-show="currentValue == 'nothing'" class="tab-placeholder">
                    <slot name="placeholder"></slot>
                </div>
                <slot></slot>
            </elx-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ElxTabLayout',
    componentName: 'ElxTabLayout',
    components: {},
    props: {
        value: {
            type: String,
            default: 'nothing'
        },
        title: {
            type: String,
            default: '主页'
        },
        icon: {
            type: String,
            default: 'ri-function-line'
        },
        caliber: {
            type: String,
            default: ''
        },
        tabData: {
            type: Array,
            default() {
                return [];
            }
        },
        showRight: {
            type: Boolean,
            default: true
        },
        newBtnLabel: {
            type: String,
            default: '新建'
        }
    },
    data() {
        return {
            currentValue: this.value
        };
    },
    methods: {
        backPlaceholder() {
            this.currentValue = 'nothing';
            this.$emit('back-placeholder');
            this.resizeLayout();
        },
        resizeLayout() {
            this.$nextTick(() => {
                try {
                    const tags = ['elx-tree-table-layout', 'elx-table-layout'];
                    const resizeLayout = function (component) {
                        if (tags.indexOf(component.$options._componentTag) > -1) {
                            component.resize();
                        } else {
                            component.$children.forEach((child) => {
                                resizeLayout(child);
                            });
                        }
                    };
                    resizeLayout(this.$slots.placeholder[0].componentInstance);
                } catch (e) {
                    console.log(e);
                }
            });
        },
        tabAdd() {
            this.$emit('tab-add');
        },
        tabClick(tab, event) {
            this.$emit('tab-click', tab, event);
        },
        tabRemove(name) {
            this.$emit('tab-remove', name);
        },
        tabContextmenu(tab, tabName, event) {
            this.$emit('tab-contextmenu', tab, tabName, event);
        },
        edit(name, action) {
            this.$emit('edit', name, action);
        },
        changeActive(item) {
            this.currentValue = item.name;
            const { elxTabs } = this.$refs;
            if (elxTabs.$refs.nav) {
                setTimeout(() => {
                    elxTabs.$refs.nav.scrollToActiveTab();
                }, 500);
            }
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue(val) {
            this.$emit('input', val);
        }
    },
    created() {},
    mounted() {}
};
</script>

<style>
@import './styles/index.scss';
</style>
