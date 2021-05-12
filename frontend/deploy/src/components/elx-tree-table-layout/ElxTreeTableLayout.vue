<template>
    <div class="elx-tree-table-layout page-view">
        <elx-col-resize-layout
            @resize="colResize"
            :default-left="200"
            :width.sync="fullWidth"
            :max-width="maxWidth"
            :left-visible="leftVisible"
            :split-visible="leftVisible"
            @drag-start="dragStart"
            @drag-end="dragEnd">
            <div class="lay-left" slot="left">
                <slot name="tree"></slot>
            </div>
            <div class="lay-right" slot="right">
                <slot name="table"></slot>
            </div>
        </elx-col-resize-layout>
    </div>
</template>

<script>
export default {
    name: 'ElxTreeTableLayout',
    componentName: 'ElxTreeTableLayout',
    components: {
    },
    props: {
        leftVisible: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            fullWidth: 761,
            maxWidth: 761,
            drag: false
        };
    },

    computed: {
    },

    methods: {
        resize() {
            this.$nextTick(() => {
                this.fullWidth = this.$el.offsetWidth;
                this.$nextTick(() => {
                    this.$emit('resize');
                    this.tableLayoutResize();
                });
            });
        },
        dragStart() {
            this.drag = true;
        },
        dragEnd() {
            this.drag = false;
        },
        tableLayoutResize() {
            this.$nextTick(() => {
                try {
                    const tags = ['elx-table-layout'];
                    const resizeLayout = function (component) {
                        if (tags.indexOf(component.$options._componentTag) > -1) {
                            component.resize();
                        } else {
                            component.$children.forEach((child) => {
                                resizeLayout(child);
                            });
                        }
                    };
                    resizeLayout(this.$slots.table[0].componentInstance);
                } catch (e) {
                    console.log(e);
                }
            });
        },
        colResize() {
            this.$emit('resize');
            this.tableLayoutResize();
        }
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        this.resize();
        window.addEventListener('resize', this.resize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    },
    destroyed() {
    }
};
</script>

<style>
    @import './styles/index.scss';
</style>
