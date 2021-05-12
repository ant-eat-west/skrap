<template>
    <div class="page-view">
        <router-view :key="$route.name + $route.query.t"></router-view>
    </div>
</template>

<script>

export default {
    name: 'PageView',
    componentName: 'PageView',
    computed: {
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style>
    .page-view iframe {
        width: 100%;
        height: 100%;
        border: 0px;
    }
</style>
