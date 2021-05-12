<template>
    <div class="page-config">
        <div class="left-panel">
            <div class="list-title">布局</div>
            <draggable
                class="dragArea list-group"
                :list="layouts"
                :group="{
                    name: 'layout-list',
                    pull: 'clone',
                    put: false,
                    move: false
                }"
                :sort="false"
                :clone="cloneLayout"
            >
                <div class="list-group-item" v-for="element in layouts" :key="element.id">
                    <span class="icon" :class="element.icon || 'uex-icon-image'"></span>
                    {{ element.label }}
                </div>
            </draggable>
            <div class="list-title">组件</div>
            <draggable
                class="dragArea list-group"
                :list="widgets"
                :group="{
                    name: 'region-list',
                    pull: 'clone',
                    put: false,
                    move: false
                }"
                :sort="false"
                :clone="cloneRegion"
            >
                <div class="list-group-item" v-for="element in widgets" :key="element.id">
                    <span class="icon" :class="element.icon || 'uex-icon-image'"></span>
                    {{ element.label }}
                </div>
            </draggable>
            <div class="list-title">表单元素</div>
            <draggable
                class="dragArea list-group"
                :list="formItems"
                :group="{
                    name: 'form-elements',
                    pull: 'clone',
                    put: false,
                    move: false
                }"
                :sort="false"
                :clone="cloneFormElement"
            >
                <div class="list-group-item" v-for="element in formItems" :key="element.id">
                    <span class="icon" :class="element.icon || 'uex-icon-image'"></span>
                    {{ element.label }}
                </div>
            </draggable>
        </div>

        <div class="middle-panel">
            <div class="panel-header">
                <div class="pos-left">
                    <el-button
                        type="text"
                        icon="uex-icon-download-cloud">
                        导入
                    </el-button>
                    <el-button
                        type="text"
                        icon="uex-icon-delete">
                        清空
                    </el-button>
                </div>
                <div class="pos-right">
                    <el-button
                        type="text"
                        icon="uex-icon-view"
                        @click.native="preview">
                        预览
                    </el-button>
                    <el-button
                        class="save"
                        type="text"
                        icon="uex-icon-save"
                        @click.native="saveConfig">
                        保存
                    </el-button>
                </div>
            </div>
            <div class="page config-widget" :class="config.options.type" @click.stop.prevent="selectWidget(config)">
                <div class="title">页面</div>
                <draggable
                    class="dragArea list-group form container"
                    :list="config.children"
                    :group="{
                        name: 'page',
                        pull: false,
                        put: pagePutFilter
                    }"
                    :ghost-class="ghost"
                    handle=".draggable"
                    @change="change"
                >
                    <div
                        class="region config-widget drag-widget"
                        v-for="element in config.children"
                        :key="element.id"
                        @click.stop.prevent="selectWidget(element)"
                        :class="{
                            'attr-active': attrModel ? attrModel.name == element.name : false,
                            form: element.type == 'form',
                            table: element.type == 'table',
                            'grid-layout': element.type == 'grid-layout',
                            'graph-layout': element.type == 'graph-layout'
                        }"
                        :style="{
                            'flex-shrink': element.type == 'form' && element.options && element.options.type == 'inline' ? 0 : 1,
                            flex: element.type == 'form' && element.options && element.options.type == 'inline' ? '0 1 auto' : 1
                        }"
                    >
                        <div class="oper-button-group">
                            <span class="oper-button uex-icon-move draggable"></span>
                            <span
                                class="oper-button oper uex-icon-delete"
                                @click="deleteWidget(config.children, element)"
                            ></span>
                            <span
                                class="oper-button oper uex-icon-copy"
                                @click="copyWidget(config.children, element)"
                            ></span>
                        </div>
                        <template v-if="element.type == 'form'">
                            <form-element
                                :ref="element.name"
                                :name="name"
                                :element="element"
                                :config="config"
                                :attr-field-model="attrFieldModel"
                                @select-widget="selectWidget"
                                @delete-widget="deleteWidget"
                                @copy-widget="copyWidget"
                                @query-by-sql="getData"
                                @submit="formSubmit"
                                @custom="formCustom"
                            ></form-element>
                        </template>
                        <template v-if="element.type == 'table'">
                            <table-element
                                :ref="element.name"
                                :name="name"
                                :element="element"
                                :config="config"
                            ></table-element>
                        </template>
                        <template v-if="element.type == 'graph'">
                            <graph-element
                                :ref="element.name"
                                :name="name"
                                :element="element"
                                :config="config"
                            ></graph-element>
                        </template>
                        <template v-if="element.type == 'grid-layout'">
                            <el-row
                                :gutter="element.options.gutter"
                                :style="{
                                    height: element.options.height
                                }"
                            >
                                <el-col v-for="item in element.children" :key="item.id" :span="item.span">
                                    <div
                                        class="grid-content"
                                        @click.prevent.stop="selectWidget(element, item)"
                                        :class="{
                                            'attr-active': attrFieldModel ? attrFieldModel.name == item.name : false
                                        }"
                                    >
                                        <draggable
                                            class="dragArea list-group form container"
                                            :list="item.children"
                                            :group="{
                                                name: 'page',
                                                pull: false,
                                                put: gridPutFilter
                                            }"
                                            :ghost-class="ghost"
                                            handle=".draggable"
                                            @change="change"
                                        >
                                            <div
                                                class="region config-widget drag-widget"
                                                v-for="child in item.children"
                                                :key="child.id"
                                                @click.stop.prevent="selectWidget(child)"
                                                :class="{
                                                    'attr-active': attrModel ? attrModel.name == child.name : false,
                                                    form: child.type == 'form',
                                                    table: child.type == 'table',
                                                    'grid-layout': child.type == 'grid-layout',
                                                    'graph-layout': child.type == 'graph-layout'
                                                }"
                                                :style="{
                                                    'flex-shrink': child.type == 'form' && child.options && child.options.type == 'inline' ? 0 : 1,
                                                    flex: child.type == 'form' && child.options && child.options.type == 'inline' ? '0 1 auto' : 1
                                                }"
                                            >
                                                <div class="oper-button-group">
                                                    <span class="oper-button uex-icon-move draggable"></span>
                                                    <span
                                                        class="oper-button oper uex-icon-delete"
                                                        @click="deleteWidget(item.children, child)"
                                                    ></span>
                                                    <span
                                                        class="oper-button oper uex-icon-copy"
                                                        @click="copyWidget(item.children, child)"
                                                    ></span>
                                                </div>
                                                <template v-if="child.type == 'form'">
                                                    <form-element
                                                        :ref="child.name"
                                                        :name="name"
                                                        :element="child"
                                                        :config="config"
                                                        :attr-field-model="attrFieldModel"
                                                        @select-widget="selectWidget"
                                                        @delete-widget="deleteWidget"
                                                        @copy-widget="copyWidget"
                                                        @query-by-sql="getData"
                                                        @submit="formSubmit"
                                                        @custom="formCustom"
                                                    ></form-element>
                                                </template>
                                                <template v-if="child.type == 'table'">
                                                    <table-element
                                                        :ref="child.name"
                                                        :name="name"
                                                        :element="child"
                                                        :config="config"
                                                    ></table-element>
                                                </template>
                                            </div>
                                        </draggable>
                                    </div>
                                </el-col>
                            </el-row>
                        </template>
                    </div>
                </draggable>
            </div>
        </div>
        <div class="right-panel">
            <el-tabs
                v-model="tableActiveName">
                <el-tab-pane
                    v-if="attrModel.type == 'page'"
                    label="页面属性"
                    name="column">
                    <page-attr
                        :name="name"
                        :option="attrModel">
                    </page-attr>
                </el-tab-pane>
                <el-tab-pane
                    v-if="attrModel.type == 'grid-layout'"
                    label="布局属性"
                    name="column">
                    <grid-layout-attr
                        :name="name"
                        :option="attrModel">
                    </grid-layout-attr>
                </el-tab-pane>
                <el-tab-pane
                    v-if="attrModel.type == 'form'"
                    label="字段属性"
                    name="column">
                    <template v-if="attrFieldModel">
                        <component
                            :is="attrFieldModel.type + '-attr'"
                            :name="name"
                            :parent-option="attrModel"
                            :option.sync="attrFieldModel"
                            @query="query"
                            @submit="formSubmit"
                            @custom="formCustom"
                        ></component>
                    </template>
                </el-tab-pane>
                <el-tab-pane
                    v-if="attrModel.type == 'form'"
                    label="表单属性"
                    name="table">
                    <form-attr
                        :name="name"
                        :parent-option="attrModel"
                        :option="attrFieldModel"
                        :config="config">
                    </form-attr>
                </el-tab-pane>
                <el-tab-pane
                    v-if="attrModel.type == 'table'"
                    label="字段属性"
                    name="column"
                    class="field-list">
                    <field-list-attr
                        :name="name"
                        :option="attrModel"
                        :config="config"
                        @edit-field="editField">
                    </field-list-attr>
                </el-tab-pane>
                <el-tab-pane
                    v-if="attrModel.type == 'table'"
                    label="表格属性"
                    name="table">
                    <table-attr
                        :name="name"
                        :option="attrModel"
                        :config="config"
                        @test-sql="testSql"
                        @edit-action="editAction">
                    </table-attr>
                </el-tab-pane>
                <el-tab-pane
                    v-if="attrModel.type == 'graph'"
                    label="图形属性"
                    name="graph">
                    <graph-attr
                        :name="name"
                        :option="attrModel"
                        :config="config"
                        @test-sql="testGraphSql">
                    </graph-attr>
                </el-tab-pane>
                <el-tab-pane
                    label="数据源"
                    name="datasource">
                    <datasource-attr
                        :datasources="config.datasources"
                        :config="config">
                    </datasource-attr>
                </el-tab-pane>
            </el-tabs>
            <field-attr
                :field="currentField"
                :visible.sync="fieldAttrVisible">
            </field-attr>
            <action-attr
                :action="currentAction"
                :visible.sync="actionAttrVisible">
            </action-attr>
        </div>
    </div>
</template>

<script>
import TableElement from './components/table-element/TableElement';
import GraphElement from './components/graph-element/GraphElement';
import FormElement from './components/form-element/FormElement';
import GenerateFormItem from './components/generate-form-item/GenerateFormItem';
import ElxConfigTablePage from 'deploy/src/components/elx-config-table-page/ElxConfigTablePage';

import PageAttr from './components/attr/page-attr/PageAttr';
import GridLayoutAttr from './components/attr/grid-layout-attr/GridLayoutAttr';
import DatasourceAttr from './components/attr/datasource-attr/DatasourceAttr';
import FormAttr from './components/attr/form-attr/FormAttr';
import GraphAttr from './components/attr/graph-attr/GraphAttr';

import TableAttr from './components/attr/table-attr/TableAttr';
import FieldListAttr from './components/attr/field-list-attr/FieldListAttr';
import FieldAttr from './components/attr/field-attr/FieldAttr';
import ActionAttr from './components/attr/action-attr/ActionAttr';

import ButtonAttr from './components/attr/button-attr/ButtonAttr';
import InputAttr from './components/attr/input-attr/InputAttr';
import SelectAttr from './components/attr/select-attr/SelectAttr';
import CheckboxAttr from './components/attr/checkbox-attr/checkboxAttr';
import RadioAttr from './components/attr/radio-attr/radioAttr';
import DatePickerAttr from './components/attr/date-picker-attr/DatePickerAttr';
import InputNumberAttr from './components/attr/input-number-attr/InputNumberAttr';
import CascaderAttr from './components/attr/cascader-attr/CascaderAttr';
import SwitchAttr from './components/attr/switch-attr/SwitchAttr';
import SliderAttr from './components/attr/slider-attr/SliderAttr';

import draggable from 'vuedraggable';
import processSql from 'deploy/src/components/elx-config-table-page/utils/processSql.js';
import { getConfig, saveConfig } from './api/api';
import widgets from './data/widget.list.js';

export default {
    name: 'GenerateFormTable',
    componentName: 'GenerateFormTable',
    components: {
        draggable,
        TableElement,
        GraphElement,
        FormElement,
        GenerateFormItem,
        ElxConfigTablePage,
        PageAttr,
        GraphAttr,
        GridLayoutAttr,
        DatasourceAttr,
        FormAttr,
        TableAttr,
        FieldListAttr,
        FieldAttr,
        ActionAttr,
        ButtonAttr,
        InputAttr,
        SelectAttr,
        RadioAttr,
        CheckboxAttr,
        DatePickerAttr,
        InputNumberAttr,
        CascaderAttr,
        SwitchAttr,
        SliderAttr
    },
    data() {
        return {
            ...widgets,
            defaultConfig: {
                id: '0',
                type: 'page',
                label: '页面',
                name: 'page',
                options: {
                    type: 'one-screen-layout'
                },
                datasources: [],
                children: []
            },
            config: null,
            pageConfig: {},
            name: `formTable${new Date().getTime()}`,
            tableActiveName: 'datasource',
            attrModel: null,
            attrFieldModel: null,
            formGhost: 'form-ghost',
            ghost: 'generate-ghost',
            currentField: null,
            fieldAttrVisible: false,
            currentAction: null,
            actionAttrVisible: false
        };
    },
    computed: {},
    methods: {
        parseWidget(data) {
            const item = JSON.parse(JSON.stringify(data));
            const key = new Date().getTime();
            item.id = item.type + key;
            item.name = item.id;
            item.label += key;
            return item;
        },
        cloneLayout(evt) {
            return this.parseWidget(evt);
        },
        cloneRegion(evt) {
            return this.parseWidget(evt);
        },
        cloneFormElement(evt) {
            const item = JSON.parse(JSON.stringify(evt));
            const key = new Date().getTime();
            item.id = `field${key}`;
            item.name = item.id;
            return item;
        },
        cloneGraphElement(evt) {
            return this.parseWidget(evt);
        },
        deleteWidget(bwidgets, widget) {
            if (this.attrModel.name === widget.name) {
                this.attrModel = this.config;
            }
            if (this.attrFieldModel && this.attrFieldModel.name === widget.name) {
                this.attrFieldModel = null;
            }
            bwidgets.splice(bwidgets.indexOf(widget), 1);
        },
        copyWidget(awidgets, widget) {
            const copyWidget = JSON.parse(JSON.stringify(widget));
            const key = new Date().getTime();
            copyWidget.id = copyWidget.type + key;
            copyWidget.name = copyWidget.id;
            copyWidget.label = copyWidget.type + key;
            awidgets.splice(awidgets.indexOf(widget) + 1, 0, copyWidget);
        },
        change() {},
        testGraphSql(model) {
            const graphDs = this.getDs(model.options.ds);
            this.$refs[model.name][0].$refs.chart.getData(model, graphDs);
        },
        testSql(model) {
            this.$refs[model.name][0].$refs.elxConfigTablePage.getData();
        },
        selectWidget(widget, fieldWidget) {
            this.attrModel = widget;
            this.attrFieldModel = fieldWidget;
        },
        getDs(id) {
            return this.config.datasources.find((ds) => {
                return ds.id === id;
            });
        },
        getFilter(id) {
            const ds = this.config.datasources.find((item) => {
                return item.id === id;
            });
            if (ds) {
                const form = this.config.children.find((item) => {
                    return item.name === ds.filterName;
                });
                if (form) {
                    return form;
                }
            }
            return null;
        },
        getData(ds, form) {
            const sql = processSql(ds, form);

            for (const widgetName of ds.widgets) {
                if (this.$refs[widgetName] && this.$refs[widgetName][0].$refs.elxConfigTablePage) {
                    this.$refs[widgetName][0].$refs.elxConfigTablePage.getDataBySql(sql);
                }
                if (this.$refs[widgetName] && this.$refs[widgetName][0].$refs.chart) {
                    const { chart } = this.$refs[widgetName][0].$refs;
                    chart.queryBySql(sql, chart.element);
                }
            }
        },
        formSubmit(form, widget) {
            console.log(form, widget);
        },
        formCustom(form, widget) {
            console.log(form, widget);
        },
        query(form) {
            const ds = this.config.datasources.find((item) => {
                return item.filterName === form.name;
            });
            console.log(ds);
            if (ds) {
                this.getData(ds, form);
            }
        },
        layoutPutFilter(to, from) {
            const groups = ['region-list'];
            return groups.indexOf(from.options.group.name) > -1;
        },
        pagePutFilter(to, from) {
            const groups = ['layout-list', 'region-list'];
            return groups.indexOf(from.options.group.name) > -1;
        },
        formPutFilter(to, from) {
            return from.options.group.name === 'form-elements';
        },
        gridPutFilter(to, from) {
            const groups = ['region-list'];
            return groups.indexOf(from.options.group.name) > -1;
        },
        getConfig() {
            getConfig(this.$route.params.id)
                .then((res) => {
                    const { data } = res;
                    this.pageConfig = data;
                    if (data.parameters) {
                        this.config = JSON.parse(data.parameters);
                        console.log(this.config);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        saveConfig(callback) {
            const config = JSON.parse(JSON.stringify(this.config));
            const parseTableConfig = (children) => {
                for (const child of children) {
                    if (child.type === 'table') {
                        child.options.data = [];
                    }
                    if (Array.isArray(child.children)) {
                        parseTableConfig(child.children);
                    }
                }
            };
            parseTableConfig(config.children);
            this.pageConfig.parameters = JSON.stringify(config);

            saveConfig(this.pageConfig)
                .then((res) => {
                    const { data } = res;
                    if (data && data.state === 'success') {
                        this.$notify({
                            type: 'success',
                            title: '成功',
                            message: '保存成功！'
                        });
                        if (typeof callback === 'function') {
                            callback();
                        }
                    } else {
                        this.$notify({
                            type: 'error',
                            title: '失败',
                            message: '保存失败！'
                        });
                    }
                })
                .catch(() => {
                    this.$notify({
                        type: 'error',
                        title: '失败',
                        message: '保存失败！'
                    });
                });
        },
        preview() {
            this.saveConfig(() => {
                window.open(`/view/report/${this.$route.params.id}`);
            });
        },
        editField(field) {
            this.currentField = field;
            this.fieldAttrVisible = true;
        },
        editAction(action) {
            this.currentAction = action;
            this.actionAttrVisible = true;
        }
    },
    watch: {
        'attrModel.type': function(val) {
            if (val === 'graph') {
                this.tableActiveName = 'graph';
            } else if (val === 'form' || val === 'table') {
                this.tableActiveName = 'table';
            } else {
                this.tableActiveName = 'datasource';
            }
        }
    },
    beforeCreate() {},
    created() {
        this.config = JSON.parse(JSON.stringify(this.defaultConfig));
        this.getConfig();
        this.attrModel = this.config;
    },
    mounted() {}
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
