<template>
    <el-form-item
        class="generate-form-item"
        :class="widget.class"
        :label="widget.label"
        :label-width="widget.labelWidth"
        :rules="widget.rules"
        :prop="widget.name"
    >
        <template v-if="widget.type == 'input'">
            <el-input
                v-model="dataModel"
                :type="widget.options.type"
                :rows="widget.options.rows"
                :placeholder="widget.options.placeholder"
                :clearable="widget.options.clearable"
                :show-password="widget.options.showPassword"
            ></el-input>
        </template>
        <template v-if="widget.type == 'select'">
            <el-select
                v-model="dataModel"
                :class="{
                    multiple: widget.options.multiple
                }"
                :key="widget.options.multiple"
                :multiple="widget.options.multiple"
                :clearable="widget.options.clearable"
                :placeholder="widget.options.placeholder"
                collapse-tags
            >
                <el-option
                    v-for="item in widget.options.options"
                    :key="item.VALUE"
                    :label="item.LABEL || item.VALUE"
                    :value="item.VALUE"
                ></el-option>
            </el-select>
            <el-checkbox v-if="widget.options.subdivision" v-model="widget.options.subdivisionVal">
                细分
            </el-checkbox>
        </template>
        <template v-if="widget.type == 'date-picker'">
            <el-date-picker
                v-model="dataModel"
                :key="widget.options.type"
                :type="widget.options.type"
                :placeholder="widget.options.placeholder"
                :clearable="widget.options.clearable"
                :editable="widget.options.editable"
                :start-placeholder="widget.options.startPlaceholder"
                :end-placeholder="widget.options.endPlaceholder"
                :format="widget.options.format"
                :value-format="widget.options.valueFormat"
                :align="widget.options.align"
                :popper-class="widget.options.popperClass"
                :picker-options="widget.options.pickerOptions"
                :range-separator="widget.options.rangeSeparator"
                :default-value="widget.options.defaultValue"
                :default-time="widget.options.defaultTime"
                :prefix-icon="widget.options.prefixIcon"
                :clear-icon="widget.options.clearIcon"
            ></el-date-picker>
        </template>
        <template v-if="widget.type == 'checkbox'">
            <el-checkbox
                v-if="widget.options.type == 'single'"
                v-model="dataModel">
                {{ widget.options.label }}
            </el-checkbox>
            <el-checkbox-group
                v-if="widget.options.type == 'group'"
                v-model="dataModel">
                <el-checkbox
                    v-for="item in widget.options.options"
                    :key="item.VALUE"
                    :label="item.LABEL || item.VALUE"
                    :value="item.VALUE"
                ></el-checkbox>
            </el-checkbox-group>
        </template>
        <template v-if="widget.type == 'radio'">
            <el-radio-group
                v-model="dataModel">
                <el-radio
                    v-for="item in widget.options.options"
                    :key="item.VALUE"
                    :label="item.VALUE">
                    {{item.LABEL || item.VALUE}}
                </el-radio>
            </el-radio-group>
        </template>
        <template v-if="widget.type == 'input-number'">
            <el-input-number
                v-model="dataModel"
                :min="widget.options.min"
                :max="widget.options.max"
                :step="widget.options.step"
                :placeholder="widget.options.placeholder">
            </el-input-number>
        </template>
        <template v-if="widget.type == 'cascader'">
            <el-cascader
                v-model="dataModel"
                :options="widget.options.options"
                :props="widget.options.props"
                :placeholder="widget.options.placeholder"
                :showAllLevels="widget.options.showAllLevels"
                :clearable="widget.options.clearable"
                :filterable="widget.options.filterable">
            </el-cascader>
        </template>
        <template v-if="widget.type == 'switch'">
            <el-switch
                v-model="dataModel"
                :active-color="widget.options.activeColor"
                :inactive-color="widget.options.inactiveColor">
            </el-switch>
        </template>
        <template v-if="widget.type == 'slider'">
            <el-slider
                v-model="dataModel"
                :show-input="widget.options.showInput"
                :min="widget.options.min"
                :max="widget.options.max"
                :step="widget.options.step">
            </el-slider>
        </template>
        <template v-if="widget.type == 'rate'">
            <el-rate
                v-model="dataModel">
            </el-rate>
        </template>
        <template v-if="widget.type == 'color-picker'">
            <el-color-picker
                v-model="dataModel">
            </el-color-picker>
        </template>
        <template v-if="widget.type == 'button'">
            <el-button @click="handleEvent('click', widget)">
                {{ widget.label }}
            </el-button>
        </template>
    </el-form-item>
</template>

<script>
import { queryBySql, queryByUrl } from '../../api/api';
import { formatDate } from 'element-ui/src/utils/date-util';

export default {
    name: 'GenerateFormItem',
    componentName: 'GenerateFormItem',
    components: {},
    props: ['widget', 'models', 'rules', 'name'],
    data() {
        return {
            dataModel: this.models[this.widget.name] || null,
            types: ['select', 'checkbox']
        };
    },
    computed: {},
    methods: {
        click() {
            console.log('click');
        },
        getOptions() {
            if (this.types.indexOf(this.widget.type) > -1) {
                const { options } = this.widget;
                if (options.optionsType === 'dynamic') {
                    if (options.dynamicType === 'sql') {
                        queryBySql({
                            initSql: options.optionsMethod,
                            command: 'query',
                            dataSource: 'defaultDB',
                            start: 0,
                            limit: 0
                        })
                            .then((res) => {
                                const { data } = res;
                                if (Array.isArray(data.root)) {
                                    options.options = data.root;
                                }
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    } else {
                        queryByUrl(options.optionsMethod)
                            .then((res) => {
                                const { data } = res;
                                if (Array.isArray(data)) {
                                    options.options = data;
                                }
                            })
                            .catch((e) => {
                                console.log(e);
                            });
                    }
                }
            }
        },
        evil(fn) {
            if (typeof fn === 'string' && fn.indexOf('function') > -1) {
                const Fn = Function;
                const newFn = fn.replace(/[\r\n]/g, ' ');
                return new Fn(`return ${newFn}`)();
            } else {
                return null;
            }
        },
        formatMethod(func) {
            // eslint-disable-next-line
            return this.evil(func.replace('${formdata}', `window.${this.name}.element.models`));
        },
        execFunc(func) {
            this.formatMethod(func)();
        },
        handleEvent(event, widget) {
            if (event === 'click') {
                this.$emit(widget.options.type, widget);
            }
        },
        setDefaultValue() {
            /* if (this.widget.name in this.models || this.widget.type === 'button') {
                return;
            } */
            const value = this.widget.options.defaultValue || null;
            this.$set(this.models, this.widget.name, value);
            this.dataModel = value;
        },
        formatRules() {
            if (!Array.isArray(this.widget.rules)) {
                return;
            }
            for (const rule of this.widget.rules) {
                if ('pattern' in rule) {
                    try {
                        const Fn = Function;
                        rule.pattern = new Fn(`return ${rule.patternStr}`)();
                    } catch (e) {
                        console.log(e);
                    }
                }
                if ('validator' in rule) {
                    rule.validator = this.formatMethod(rule.validFuncStr);
                }
            }
        }
    },
    watch: {
        dataModel() {
            const { models } = this;
            this.$set(models, this.widget.name, this.dataModel);
            this.$emit('update:models', models);
        },
        models: {
            deep: true,
            handler() {
                this.dataModel = this.models[this.widget.name];
            }
        }
    },
    beforeCreate() {},
    created() {
        this.formatRules();
        this.getOptions();
        this.setDefaultValue();
        if (this.widget.type === 'date-picker' && this.widget.options.isCurrent) {
            const { type } = this.widget.options;
            const typeArr1 = ['year', 'month', 'date', 'dates', 'week'];
            const typeArr2 = ['daterange', 'monthrange'];
            const date = formatDate(new Date(), this.widget.options.valueFormat);
            if (typeArr1.indexOf(type) > -1) {
                this.dataModel = date;
            }
            if (typeArr2.indexOf(type) > -1) {
                this.dataModel = [date, date];
            }
            this.$set(this.models, this.widget.name, this.dataModel);
        }
    }
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
