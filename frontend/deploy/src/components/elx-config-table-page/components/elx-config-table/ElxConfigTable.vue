<template>
    <div class="elx-config-table">
        <!--<ul>
            <li
                v-for="colConfig in config.fields">
                {{colConfig.label}}
            </li>
        </ul> -->
        <el-table
            :data="config.data"
            :height="config.height || '100%'"
            :max-height="config.maxHeight"
            :stripe="config.stripe"
            :border="config.border"
            :size="config.size"
            :fit="config.fit"
            :show-header="config.showHeader"
            :highlight-current-row="config.highlightCurrentRow"
            :current-row-key="config.currentRowKey"
            :row-class-name="config.rowClassName"
            :row-style="config.rowStyle"
            :cell-class-name="config.cellClassName"
            :cell-style="config.cellStyle"
            :header-row-class-name="config.headerRowClassName"
            :header-row-style="config.headerRowStyle"
            :header-cell-class-name="config.headerCellClassName"
            :header-cell-style="config.headerCellStyle"
            :row-key="config.rowKey"
            :empty-text="config.emptyText"
            :default-expand-all="config.defaultExpandAll"
            :expand-row-keys="config.expandRowKeys"
            :default-sort="config.defaultSort"
            :tooltip-effect="config.tooltipEffect"
            :show-summary="config.showSummary"
            :sum-text="config.sumText"
            :summary-method="config.summaryMethod"
            :span-method="config.spanMethod"
            :select-on-indeterminate="config.selectOnIndeterminate"
            :indent="config.indent"
            :lazy="config.lazy"
            :load="config.load"
            :tree-props="config.treeProps"
            @select="config.select || emptyMethod"
            @select-all="config.selectAll || emptyMethod"
            @selection-change="config.selectChange || emptyMethod"
            @cell-mouse-enter="config.cellMouseEnter || emptyMethod"
            @cell-mouse-leave="config.cellMouseLeave || emptyMethod"
            @cell-click="config.cellClick || emptyMethod"
            @cell-dblclick="config.cellDblclick || emptyMethod"
            @row-click="config.rowClick || emptyMethod"
            @row-contextmenu="config.rowContextmenu || emptyMethod"
            @row-dblclick="config.rowDblclick || emptyMethod"
            @header-click="config.headerClick || emptyMethod"
            @header-contextmenu="config.headerContextmenu || emptyMethod"
            @sort-change="config.sortChange || emptyMethod"
            @filter-change="config.filterChange || emptyMethod"
            @current-change="config.currentChange || emptyMethod"
            @header-dragend="config.headerDragend || emptyMethod"
            @expand-change="config.expandChange || emptyMethod"
        >
            <template v-for="(colConfig, index) in config.fields">
                <el-table-column
                    :key="index"
                    v-if="columns.indexOf(colConfig.name) > -1"
                    :type="colConfig.type"
                    :index="colConfig.index"
                    :column-key="colConfig.columnKey"
                    :label="colConfig.label || colConfig.name"
                    :prop="colConfig.name"
                    :width="colConfig.width"
                    :min-width="colConfig.minWidth"
                    :fixed="colConfig.fixed"
                    :render-header="colConfig.renderHeader"
                    :sortable="colConfig.sortable"
                    :sort-method="colConfig.sortMethod"
                    :sort-by="colConfig.sortBy"
                    :sort-orders="colConfig.sortOrders"
                    :resizable="colConfig.resizable"
                    :formatter="evil(colConfig.formatter)"
                    :show-overflow-tooltip="formatAttr(colConfig.showOverflowTooltip, true)"
                    :align="colConfig.align"
                    :header-align="colConfig.headerAlign"
                    :class-name="colConfig.className"
                    :label-class-name="colConfig.labelClassName"
                    :selectable="colConfig.selectable"
                    :reserve-selection="colConfig.reserveSelection"
                    :filters="colConfig.filters"
                    :filter-placement="colConfig.filterPlacement"
                    :filter-multiple="colConfig.filterMultiple"
                    :filter-method="colConfig.filterMethod"
                    :filtered-value="colConfig.filteredValue"
                ></el-table-column>
            </template>
            <el-table-column
                v-if="config.actions && config.actions.length > 0"
                :label="config.actionColumnOption.label"
                :width="config.actionColumnOption.width"
                :fixed="config.actionColumnOption.fixed">
                <template>
                    <el-button
                        v-for="action in config.actions"
                        :key="action.name"
                        type="text"
                        size="small">
                        {{action.label}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'ElxConfigTable',
    componentName: 'ElxConfigTable',
    components: {},
    props: {
        config: {
            type: Object,
            default() {
                return {};
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        emptyMethod() {},
        formatAttr(val, defaultVal) {
            if (val === undefined) {
                return defaultVal;
            }
            return val;
        },
        evil(fn) {
            if (typeof fn === 'string' && fn.indexOf('function') > -1) {
                const Fn = Function;
                const newFn = fn.replace(/[\r\n]/g, ' ');
                return new Fn(`return ${newFn}`)();
            } else {
                return null;
            }
        }
    },
    watch: {},
    beforeCreate() {},
    created() {},
    mounted() {}
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
