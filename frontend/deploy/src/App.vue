<template>
    <div id="app">
        <router-view></router-view>
        <!-- <button @click="clickx">测试error</button> -->
    </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
    },
    data() {
        return {
            a: 1
        };
    },
    methods: {
        clickx() {
            console.log('xxxxx');
            // let a = b + c;
            // console.log(a);
            this.$router.push({ name: 'test' });
        }
    }
};
</script>
