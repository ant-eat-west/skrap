<template>
    <div class="elx-table-layout elx-row">
        <div class="filter">
            <div class="pos-left">
                <slot name="filter"></slot>
            </div>
            <div class="pos-right">
                <slot name="search"></slot>
                <ul class="switch-button-group" v-if="typeNum == 2">
                    <li :class="{active: currentType == 'table'}" @click="currentType = 'table'">
                        <i class="uex-icon-menu-list"></i>
                    </li>
                    <li :class="{active: currentType == 'card'}" @click="currentType = 'card'">
                        <i class="uex-icon-menu-card"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="split"></div>
        <elx-scroll-content
            ref="scrollContent"
            @resize="scrollContentResize"
            class="table">
            <div v-show="currentType == 'table'">
                <slot name="table" :height="height" :width="width"></slot>
            </div>
            <div v-show="currentType == 'card'">
                <slot name="card" :height="height" :width="width"></slot>
            </div>
        </elx-scroll-content>
        <div class="footer" v-if="footerVisible">
            <div class="pos-left" v-show="!currentBatchOper">
                <slot name="pagination" v-if="pagination"></slot>
            </div>
            <div class="pos-left" v-if="batch" v-show="currentBatchOper">
                <el-checkbox v-model="currentChecked"></el-checkbox>
                <span class="text">批量处理本页 {{selectedNum}} 个事项</span>
                <el-select
                    class="oper-group"
                    v-model="oper"
                    placeholder="请选择">
                    <el-option
                        v-for="item in operGroup"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="exec">
                    执行
                </el-button>
            </div>
            <div class="pos-right" v-if="batch">
                <el-button @click="switchBatchOper" :class="{active: currentBatchOper}">
                    <span class="icon uex-icon-menu-list"></span>
                    <span v-text="currentBatchOper ? '取消操作' : '批量操作'"></span>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';

export default {
    name: 'ElxTableLayout',
    componentName: 'ElxTableLayout',
    components: {
    },
    props: {
        typeNum: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: 'table'
        },
        batch: Boolean,
        pagination: {
            type: Boolean,
            default: true
        },
        batchOper: Boolean,
        moreFilter: Boolean,
        selectedNum: {
            type: Number,
            default: 0
        },
        checked: Boolean,
        operGroup: {
            default() {
                return [];
            },
            type: Array
        }
    },
    data() {
        return {
            currentChecked: this.checked,
            oper: this.operGroup.length > 0 ? this.operGroup[0].value : null,
            currentBatchOper: this.batchOper,
            currentType: this.type,
            width: 0,
            height: 0,
            ro: null
        };
    },
    computed: {
        footerVisible() {
            return this.batch || this.pagination;
        }
    },
    methods: {
        scrollContentResize(size) {
            this.$nextTick(() => {
                this.height = size.innerHeight;
                this.width = size.innerWidth;
                this.$nextTick(() => {
                    this.$emit('resize', size);
                    this.resizeContent();
                });
            });
        },
        resize() {
            this.$refs.scrollContent.resize();
            this.resizeContent();
        },
        switchBatchOper() {
            this.currentBatchOper = !this.currentBatchOper;
        },
        resizeContent() {
            const resizeLayout = function (component, tags, action) {
                if (tags.indexOf(component.$options._componentTag) > -1) {
                    component[action]();
                } else {
                    component.$children.forEach((child) => {
                        resizeLayout(child, tags, action);
                    });
                }
            };
            this.$nextTick(() => {
                if (this.type === 'table') {
                    try {
                        const tags = ['el-table'];
                        resizeLayout(this.$refs.scrollContent, tags, 'doLayout');
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        const tags = ['elx-item-list'];
                        resizeLayout(this.$refs.scrollContent, tags, 'computeNum');
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        },
        exec() {
            this.$emit('exec', {
                type: this.oper
            });
        }
    },
    watch: {
        batchOper(val) {
            this.currentBatchOper = val;
        },
        currentBatchOper(val) {
            this.$emit('change-batch-oper', val);
        },
        type(val) {
            this.currentType = val;
        },
        currentType(val) {
            this.$emit('change-type', val);
            this.resize();
            this.resizeContent();
        },
        checked(val) {
            this.currentChecked = val;
        },
        currentChecked(val) {
            this.$emit('select-all', val);
        },
        footerVisible() {
            this.$nextTick(() => {
                this.resize();
                this.resizeContent();
            });
        }
    },
    created() {
        this.$on('resize', () => {
            this.resize();
        });
    },
    mounted() {
        this.$refs.scrollContent.resize();

        this.ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                this.resize(entry);
            }
        });

        this.ro.observe(this.$el);
    },
    beforeDestroy() {
        this.ro.unobserve(this.$el);
    }
};
</script>

<style>
    @import './styles/index.scss';
</style>
