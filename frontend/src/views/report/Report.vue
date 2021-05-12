<template>
    <generate-report
        v-if="config"
        :config="config"
        :title="title"
        :descr="descr">
    </generate-report>
</template>

<script>
import { getConfig } from './api/api';
import GenerateReport from './components/generate-report/GenerateReport';

export default {
    name: 'Report',
    componentName: 'Report',
    components: {
        GenerateReport
    },
    data() {
        return {
            config: null
        };
    },
    computed: {
    },
    methods: {
        getConfig() {
            getConfig(this.$route.params.id).then(res => {
                const { data } = res;
                if (data.parameters) {
                    this.config = JSON.parse(data.parameters);
                    this.title = data.name;
                    this.descr = data.descr;
                }
            }).catch(e => {
                console.log(e);
            });
        }
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
        this.getConfig();
    }
};
</script>
