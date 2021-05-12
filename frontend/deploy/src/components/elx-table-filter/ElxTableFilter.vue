<script>
import emitter from 'element-ui/src/mixins/emitter';
import Clickoutside from 'element-ui/src/utils/clickoutside';

export default {
    name: 'ELxTableFilter',
    componentName: 'ElxTableFilter',
    mixins: [emitter],
    directives: { Clickoutside },
    components: {
    },
    render(h) {
        return (
            <div class="elx-table-filter">
                <div
                    class="saved-filters"
                    vShow={false}>
                    <div class="button">
                        <span class="ri-filter-2-line"></span>
                    </div>
                </div>
                {this.$slots.default}
                {
                    this._l(this.currentFields, (field, index) => <div class="elx-table-filter-field">
                        <label
                            class="elx-table-filter-field-label">
                            {`${field.label}:`}
                        </label>
                        <div class="elx-table-filter-field-content">
                            { h(
                                'div',
                                field.renderFunc()
                            ) }
                        </div>
                        {
                            index > 1 ? (<span
                                class="uex-icon-error"
                                onClick={() => this.close(field)}>
                            </span>)
                                : ''
                        }
                    </div>)
                }
                <div
                    class="filter button"
                    vShow={this.fields.length > 2}
                    ref="button"
                    onMouseup={($event) => this.switchVisible($event)}>
                    <span class="ri-add-line"></span>
                    <span class="text">筛选</span>
                    <span class="ri-arrow-down-s-line"></span>
                    <transition name="el-zoom-in-top">
                        <div
                            class="drop-down"
                            v-clickoutside={this.hide}
                            onMouseup={($event) => this.preventEvent($event)}
                            vShow={this.visible}>
                            <ul>
                                <li class="search">
                                    <el-input
                                        slot="search"
                                        size="small"
                                        placeholder="搜索..."
                                        suffix-icon="uex-icon-search"
                                        vModel={this.searchVal}>
                                    </el-input>
                                </li>
                                <li
                                    class="clear"
                                    onClick={this.clearAll}>
                                    <span class="icon ri-delete-bin-5-fill"></span>
                                    <span class="text">清除已选择项</span>
                                </li>
                                {
                                    this._l(this.fields, (field, index) => (index > 1 ? (<li class="checkbox" vShow={field.label.indexOf(this.searchVal) > -1}>
                                        <el-checkbox
                                            vModel={this.propMap[field.prop]}
                                            onChange={(val) => this.change(val, field.prop, field)}
                                            key={field.label}
                                            label={field.label}>
                                        </el-checkbox>
                                    </li>)
                                        : ''))
                                }
                            </ul>
                        </div>
                    </transition>
                </div>
                <span class="ri-save-3-fill" vShow={false}>
                </span>
                <span
                    class="ri-restart-line"
                    onClick={this.reset}>
                </span>
            </div>
        );
    },
    props: {
        value: Object
    },
    data() {
        return {
            visible: false,
            searchVal: '',
            fields: [],
            currentFields: [],
            checkList: [],
            fieldMap: {},
            propMap: {},
            initialModel: {}
        };
    },
    computed: {
    },
    methods: {
        switchVisible(e) {
            e.preventDefault();
            e.stopPropagation();
            this.visible = !this.visible;
        },
        preventEvent(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        hide() {
            this.visible = false;
        },
        change(val, name, field) {
            const i = this.currentFields.indexOf(field);
            if (val) {
                this.currentFields.push(field);
            } else {
                this.spliceField(field, i);
            }
        },
        close(field) {
            const i = this.currentFields.indexOf(field);
            this.spliceField(field, i);
        },
        spliceField(field, index) {
            this.currentFields.splice(index, 1);
            this.propMap[field.prop] = false;
            const model = JSON.parse(JSON.stringify(this.value));
            let initialValue = this.initialModel[field.prop];
            if (Array.isArray(initialValue)) {
                initialValue = [].concat(initialValue);
            }
            model[field.prop] = initialValue;
            this.$emit('input', model);
        },
        clearAll() {
            for (let i = 2; i < this.currentFields.length; i++) {
                this.spliceField(this.currentFields[i], i);
                i -= 1;
            }
        },
        reset() {
            this.$emit('input', JSON.parse(JSON.stringify(this.initialModel)));
        }
    },
    watch: {
        currentFields() {
            this.$nextTick(() => {
                this.dispatch('ElxTableLayout', 'resize');
            });
        }
    },
    beforeCreate() {
    },
    created() {
        this.initialModel = JSON.parse(JSON.stringify(this.value));
        this.$on('filter.add', (field) => {
            if (field) {
                const { prop } = field;
                this.$set(this.propMap, prop, false);
                this.fields.push(field);
                if (this.currentFields.length < 2) {
                    this.currentFields.push(field);
                }
                this.fieldMap[prop] = field;
            }
        });
        this.$on('filter.remove', (field) => {
            if (field) {
                this.fields.splice(this.fields.indexOf(field), 1);
            }
        });
    },
    mounted() {
        window.testVm = this;
    }
};
</script>

<style>
    @import './styles/index.scss';
</style>
