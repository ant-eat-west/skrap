<template>
    <el-form-item label="校验" class="rules">
        <el-checkbox
            v-model="vRequired.valid"
            @change="changeRequiredValid">
            <div
                class="label">
                必填
            </div>
            <el-input
                class="message"
                v-show="vRequired.valid"
                v-model="vRequired.rule.message"
                placeholder="自定义错误提示">
            </el-input>
        </el-checkbox>
        <el-checkbox
            v-model="vType.valid"
            @change="changeTypeValid">
            <el-select
                v-model="vType.rule.type"
                placeholder="请选择">
                <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-input
                class="message"
                v-show="vType.valid"
                v-model="vType.rule.message"
                placeholder="自定义错误提示">
            </el-input>
        </el-checkbox>
        <el-checkbox
            v-model="vPattern.valid"
            @change="changePatternValid">
            <el-input
                v-model="vPattern.rule.patternStr"
                placeholder="请输入正则表达式">
            </el-input>
            <el-input
                class="message"
                v-show="vPattern.valid"
                v-model="vPattern.rule.message"
                placeholder="自定义错误提示">
            </el-input>
        </el-checkbox>
        <el-checkbox
            v-model="custom.valid"
            @change="changeCustomValid">
            <el-input
                type="textarea"
                :rows="10"
                v-model="custom.rule.validFuncStr"
                placeholder="请输入验证方法">
            </el-input>
        </el-checkbox>
    </el-form-item>
</template>

<script>
export default {
    name: 'FormValidAttr',
    componentName: 'FormValidAttr',
    components: {
    },
    props: ['type', 'option', 'parentOption', 'name'],
    data() {
        return {
            types: [
                { value: 'string', label: '字符串' },
                { value: 'boolean', label: '布尔型' },
                { value: 'number', label: '数字' },
                { value: 'integer', label: '整数' },
                { value: 'float', label: '浮点数' },
                { value: 'array', label: '数组' },
                { value: 'url', label: 'URL地址' },
                { value: 'date', label: '日期' },
                { value: 'email', label: '邮箱' }
            ],
            vRequired: {
                valid: false,
                rule: {}
            },
            vType: {
                valid: false,
                rule: {}
            },
            vPattern: {
                valid: false,
                rule: {}
            },
            custom: {
                valid: false,
                rule: {}
            }
        };
    },
    computed: {
    },
    methods: {
        changeRequiredValid() {
            if (!Array.isArray(this.option.rules)) {
                this.$set(this.option, 'rules', []);
            }
            const { rules } = this.option;
            if (this.vRequired.valid) {
                rules.push(this.vRequired.rule);
            } else {
                rules.splice(rules.indexOf(this.vRequired.rule), 1);
            }
            this.$emit('update:option', this.option);
        },
        changeTypeValid() {
            if (!Array.isArray(this.option.rules)) {
                this.$set(this.option, 'rules', []);
            }
            const { rules } = this.option;
            if (this.vType.valid) {
                rules.push(this.vType.rule);
            } else {
                rules.splice(rules.indexOf(this.vType.rule), 1);
            }
            this.$emit('update:option', this.option);
        },
        changePatternValid() {
            if (!Array.isArray(this.option.rules)) {
                this.$set(this.option, 'rules', []);
            }
            const { rules } = this.option;
            if (this.vPattern.valid) {
                rules.push(this.vPattern.rule);
            } else {
                rules.splice(rules.indexOf(this.vPattern.rule), 1);
            }
            this.$emit('update:option', this.option);
        },
        changeCustomValid() {
            if (!Array.isArray(this.option.rules)) {
                this.$set(this.option, 'rules', []);
            }
            const { rules } = this.option;
            if (this.custom.valid) {
                rules.push(this.custom.rule);
            } else {
                rules.splice(rules.indexOf(this.custom.rule), 1);
            }
            this.$emit('update:option', this.option);
        },
        initRules() {
            if (!Array.isArray(this.option.rules)) {
                this.$set(this.option, 'rules', []);
            }
            const { rules } = this.option;
            this.vRequired.valid = false;
            this.vRequired.rule = {
                required: true,
                message: '',
                trigger: 'blur'
            };
            this.vPattern.valid = false;
            this.vPattern.rule = {
                pattern: null,
                patternStr: null,
                message: '',
                trigger: 'blur'
            };
            this.vType.valid = false;
            this.vType.rule = {
                type: null,
                message: '',
                trigger: 'blur'
            };
            this.custom.valid = false;
            /*
            function (rule, value, callback) {
                console.log(value, ${formdata});
                callback();
            }
            */
            /*
            function (rule, value, callback) {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== ${formdata}.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            */
            this.custom.rule = {
                validFuncStr: '',
                validator: null,
                trigger: 'blur'
            };
            for (const rule of rules) {
                if ('required' in rule) {
                    this.vRequired.valid = true;
                    this.vRequired.rule = rule;
                }
                if ('pattern' in rule) {
                    this.vPattern.valid = true;
                    this.vPattern.rule = rule;
                }
                if ('type' in rule) {
                    this.vType.valid = true;
                    this.vType.rule = rule;
                }
                if ('validator' in rule) {
                    this.custom.valid = true;
                    this.custom.rule = rule;
                }
            }
            this.$emit('update:option', this.option);
        }
    },
    watch: {
        'option.rules': function() {
            this.initRules();
        }
    },
    beforeCreate() {
    },
    created() {
        this.initRules();
    }
};
</script>

<style scoped>
@import './styles/index.scss';
</style>
