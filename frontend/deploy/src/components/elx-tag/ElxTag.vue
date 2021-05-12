<template>
    <div class="elx-tag" :class="type">
        <span class="circle"></span>
        <span class="text">
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'ElxTag',
    componentName: 'ElxTag',
    components: {
    },
    props: {
        type: String
    },
    data() {
        return {
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
    }
};
</script>

<style>
    @import './styles/index.scss';
</style>
