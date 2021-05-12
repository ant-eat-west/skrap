<template>
    <div>
        <slot v-if="visible"></slot>
    </div>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';

export default {
    name: 'ELxTableFilterItem',
    componentName: 'ElxTableFilterItem',
    mixins: [emitter],
    components: {
    },
    props: {
        label: String,
        prop: String,
        visible: Boolean

    },
    data() {
        return {
            renderFunc() { return ''; }
        };
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        this.renderFunc = this.$scopedSlots.default;
        this.dispatch('ElxTableFilter', 'filter.add', [this]);
    },
    beforeDestroy() {
        this.dispatch('ElxTableFilter', 'filter.remove', [this]);
    }
};
</script>

<style>
    @import './styles/index.scss';
</style>
