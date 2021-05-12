<template>
    <div class="table">
        <div class="title"> {{element.label}} </div>
        <elx-config-table-page
            ref="elxConfigTablePage"
            :name="name"
            :table-config="element.options"
            :ds="getDs(element.options.ds)"
            :filter="getFilter(element.options.ds)">
        </elx-config-table-page>
    </div>
</template>

<script>
import ElxConfigTablePage from 'deploy/src/components/elx-config-table-page/ElxConfigTablePage';

export default {
    name: 'TableElement',
    componentName: 'TableElement',
    components: {
        ElxConfigTablePage
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
        },
        getFilter(id) {
            const ds = this.config.datasources.find(item => {
                return item.id === id;
            });
            if (ds) {
                const form = this.config.children.find(item => {
                    return item.name === ds.filterName;
                });
                if (form) {
                    return form;
                }
            }
            return null;
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
