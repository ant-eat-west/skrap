<template>
    <div class="form"
        :class="element.options.type">
        <div class="title">{{ element.label }}</div>
        <el-form
            :ref="element.name"
            :inline="element.options.type == 'inline'"
            :label-width="element.options.labelWidth"
            :label-position="element.options.labelPosition"
            :model="element.models"
            status-icon>
            <draggable
                class="dragArea list-group form"
                :list="element.children"
                :group="{
                    name: 'form',
                    pull: false,
                    put: formPutFilter
                }"
                :ghost-class="formGhost"
                @change="change"
            >
                <div
                    class="form-drag-container"
                    v-for="item in element.children"
                    @click.prevent.stop="selectWidget(element, item)"
                    :key="item.id"
                    :class="{
                        'attr-active': attrFieldModel ? attrFieldModel.name == item.name : false,
                        'button-container': item.type == 'button'
                    }"
                    :style="{
                        'width': element.options.type != 'inline' ? 'calc(' + element.options.layout + ' - ' + (element.options.layout == '100%' ? '0px' : '10px') + ')' : 'auto'
                    }"
                >
                    <div class="oper-button-group">
                        <span class="oper-button uex-icon-move draggable"></span>
                        <span
                            class="oper-button oper uex-icon-delete"
                            @click="deleteWidget(element.children, item)"
                        ></span>
                        <span class="oper-button oper uex-icon-copy" @click="copyWidget(element.children, item)"></span>
                    </div>
                    <generate-form-item
                        :widget="item"
                        :models="element.models"
                        @query="query(element)"
                        @submit="submit(element, item)"
                        @custom="custom(element, item)"
                    ></generate-form-item>
                </div>
            </draggable>
        </el-form>
    </div>
</template>

<script>
import GenerateFormItem from '../generate-form-item/GenerateFormItem';

export default {
    name: 'FormElement',
    componentName: 'FormElement',
    components: {
        GenerateFormItem
    },
    props: ['element', 'config', 'name', 'attrFieldModel'],
    data() {
        if (!this.element.options) {
            this.$set(this.element, 'options', {
                type: 'block',
                layout: '100%',
                labelWidth: '80px',
                labelPosition: 'right',
                ds: null
            });
        }
        return {
            formGhost: 'form-ghost'
        };
    },
    computed: {},
    methods: {
        selectWidget(widget, fieldWidget) {
            this.$emit('select-widget', widget, fieldWidget);
        },
        deleteWidget(widgets, widget) {
            this.$emit('delete-widget', widgets, widget);
        },
        copyWidget(widgets, widget) {
            this.$emit('copy-widget', widgets, widget);
        },
        query(form) {
            const ds = this.config.datasources.find((item) => {
                return item.filterName === form.name;
            });
            if (ds) {
                this.$emit('query-by-sql', ds, form);
            }
        },
        submit(form, widget) {
            this.$emit('submit', form, widget);
        },
        custom(form, widget) {
            this.$emit('custom', form, widget);
        },
        formPutFilter(to, from) {
            return from.options.group.name === 'form-elements';
        },
        change() {}
    },
    watch: {},
    beforeCreate() {},
    created() {}
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
