<template>
    <div class="generate-form">
        <el-form
            :ref="element.name"
            :inline="element.options.type == 'inline'"
            :label-width="element.options.labelWidth"
            :label-position="element.options.labelPosition"
            :model="element.models"
            status-icon>
            <generate-form-item
                v-for="(item, index) in element.children"
                :style="{
                    'width': 'calc(' + element.options.layout + ' - ' + (element.options.layout == '100%' ? '0px' : '10px') + ')'
                }"
                :key="index"
                :name="name"
                :widget="item"
                :models="element.models"
                @query="query(element)"
                @submit="submit(element, item)"
                @custom="custom(element, item)">
            </generate-form-item>
        </el-form>
        <!-- <div class="form-footer">
            <el-button
                v-for="(operate, key) in element.operate"
                @click="handleForm(key, operate, element)"
                :key="key">
                {{operate.label}}
            </el-button>
        </div> -->
    </div>
</template>

<script>
import GenerateFormItem from '../../../page-config/components/generate-form-item/GenerateFormItem';

export default {
    name: 'GenerateForm',
    componentName: 'GenerateForm',
    components: {
        GenerateFormItem
    },
    props: ['element'],
    data() {
        return {
            name: `form${new Date().getTime()}`
        };
    },
    computed: {},
    methods: {
        query(form) {
            const ds = this.config.datasources.find((item) => {
                return item.filterName === form.name;
            });
            if (ds) {
                // this.$emit('query-by-sql', ds, form);
            }
        },
        submit(form, widget) {
            console.log(widget.options.url, form);
            this.$refs[this.element.name].validate(valid => {
                if (valid) {
                    this.handleForm('submit', widget, form);
                    // this.$emit('submit', form, widget);
                }
            });
        },
        custom(form, widget) {
            this.handleForm('custom', widget, form);
            // this.$emit('custom', form, widget);
        },
        handleForm(key, widget, element) {
            this.$http.post(
                widget.options.url,
                element.models
            ).then(res => {
                console.log(res);
                this.$notify({
                    type: 'success',
                    title: '成功',
                    message: widget.options.successMsg || '成功！'
                });
            }).catch(err => {
                console.warn(err);
                this.$notify({
                    type: 'error',
                    title: '失败',
                    message: widget.options.errorMsg || '失败！'
                });
            });
        }
    },
    watch: {},
    beforeCreate() {},
    created() {
        window[this.name] = this;
    },
    mounted() {}
};
</script>
<style scoped>
@import './styles/index.scss';
</style>
