<template>
    <div class="graph">
        <div class="title"> {{element.label}} </div>
        <component
            ref="chart"
            class="chart"
            :element="element"
            :ds="getDs(element.options.ds)"
            :is="element.options.type + '-chart'">
        </component>
    </div>
</template>

<script>
import LineChart from '../chart/line-chart/LineChart';
import BarChart from '../chart/bar-chart/BarChart';
import PieChart from '../chart/pie-chart/PieChart';

export default {
    name: 'GraphElement',
    componentName: 'GraphElement',
    components: {
        LineChart,
        BarChart,
        PieChart
    },
    props: ['element', 'config', 'name'],
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        getDs(id) {
            return this.config.datasources.find(ds => {
                return ds.id === id;
            });
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
