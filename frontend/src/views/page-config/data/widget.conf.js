export function Graph(id, name, label) {
    return {
        id,
        name,
        label: label || '图形',
        icon: 'uex-icon-pie-chart',
        type: 'graph',
        children: [],
        options: {
            type: 'line',
            data: [],
            fields: [],
            ds: null
        }
    };
}

export function Table(id, name, label) {
    return {
        id,
        name,
        label: label || '表格',
        icon: 'uex-icon-table',
        type: 'table',
        options: {
            data: [],
            fields: [],
            actions: [],
            actionColumnOption: {
                label: '操作',
                width: '100px',
                fixed: false
            },
            ds: null
        }
    };
}

export function Field(name, label) {
    return {
        name,
        label,
        currentName: name,
        width: null,
        align: 'left',
        fixed: false,
        groupLabel: null,
        sortable: false,
        resizable: true,
        renderHeaderStr: null,
        renderCell: null
    };
}

export function Action(id, label) {
    return {
        id,
        label,
        type: null,
        showType: null,
        form: null,
        method: null
    };
}

export function Form(id, name, label) {
    return {
        id,
        name,
        label: label || '表单',
        icon: 'uex-icon-task',
        type: 'form',
        options: {
            type: 'block',
            layout: '100%',
            labelWidth: '80px',
            labelPosition: 'right',
            ds: null
        },
        models: {},
        children: []
    };
}

export function Input(id, name, label) {
    return {
        id,
        name,
        label: label || '输入框',
        icon: 'uex-icon-multiline-text',
        type: 'input',
        dependent: 'form',
        options: {
            defaultValue: null,
            type: 'text',
            placeholder: '请输入文本',
            rows: 2,
            clearable: false,
            showPassword: false
        },
        rules: []
    };
}

export function Select(id, name, label) {
    return {
        id,
        name,
        label: label || '选择器',
        icon: 'uex-icon-dropdown',
        type: 'select',
        dependent: 'form',
        options: {
            defaultValue: null,
            placeholder: '请选择内容',
            clearable: true,
            multiple: false,
            options: [{
                VALUE: 'option1'
            }, {
                VALUE: 'option2'
            }, {
                VALUE: 'option3'
            }],
            optionsType: 'static',
            dynamicType: 'sql',
            optionsMethod: '',
            subdivision: false,
            subdivisionVal: false,
            subdivisionSql: ''
        },
        rules: []
    };
}

export function Radio(id, name, label) {
    return {
        id,
        name,
        label: label || '单选按钮器',
        icon: 'uex-icon-radio',
        type: 'radio',
        dependent: 'form',
        options: {
            defaultValue: null,
            placeholder: '请选择内容',
            clearable: true,
            multiple: false,
            options: [{
                VALUE: 'option1'
            }, {
                VALUE: 'option2'
            }, {
                VALUE: 'option3'
            }],
            optionsType: 'static',
            dynamicType: 'sql',
            optionsMethod: '',
            subdivision: false,
            subdivisionVal: false,
            subdivisionSql: ''
        },
        rules: []
    };
}

export function Checkbox(id, name, label) {
    return {
        id,
        name,
        label: label || '多选框组',
        icon: 'uex-icon-chexkbox',
        type: 'checkbox',
        dependent: 'form',
        options: {
            defaultValue: [],
            type: 'group',
            label: '',
            options: [{
                VALUE: 'option1'
            }, {
                VALUE: 'option2'
            }, {
                VALUE: 'option3'
            }],
            optionsType: 'static',
            dynamicType: 'sql',
            optionsMethod: ''
        },
        rules: []
    };
}

export function Datepicker(id, name, label) {
    return {
        id,
        name,
        label: label || '日期选择器',
        icon: 'uex-icon-calendar',
        type: 'date-picker',
        dependent: 'form',
        options: {
            defaultValue: null,
            type: 'date',
            placeholder: '请选择日期',
            clearable: true,
            isCurrent: false,
            editable: false,
            startPlaceholder: '请选择日期',
            endPlaceholder: '请选择日期',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            align: 'left',
            popperClass: '',
            pickerOptions: {},
            rangeSeparator: '-',
            defaultTime: null,
            prefixIcon: 'el-icon-date',
            clearIcon: 'el-icon-circle-close'
        },
        rules: []
    };
}

export function Button(id, name, label) {
    return {
        id,
        name,
        label: label || '按钮',
        icon: 'uex-icon-calendar',
        type: 'button',
        dependent: 'form',
        class: 'form-button',
        labelWidth: '0px',
        options: {
            type: 'submit',
            url: '',
            successMsg: '',
            errorMsg: ''
        },
        rules: []
    };
}

export function InputNumber(id, name, label) {
    return {
        id,
        name,
        label: label || '计数器',
        type: 'input-number',
        dependent: 'form',
        icon: 'uex-icon-number',
        options: {
            min: 0,
            max: 9,
            step: 1,
            defaultValue: 0,
            placeholder: null
        },
        rules: []
    };
}

export function Cascader(id, name, label) {
    return {
        id,
        name,
        label: label || '级联选择器',
        type: 'cascader',
        dependent: 'form',
        icon: 'uex-icon-node-tree',
        options: {
            defaultValue: [],
            options: [{
                VALUE: 'option1',
                LABEL: '选项一',
                children: [
                    {
                        VALUE: 'option11',
                        LABEL: '选项1-1'
                    }
                ]
            }, {
                VALUE: 'option2',
                LABEL: '选项二'
            }, {
                VALUE: 'option3',
                LABEL: '选项三'
            }],
            props: {
                value: 'VALUE',
                label: 'LABEL'
            },
            placeholder: '请选择',
            showAllLevels: true,
            clearable: false,
            filterable: false,
            optionsType: 'static',
            dynamicType: 'sql',
            optionsMethod: ''
        },
        rules: []
    };
}

export function Switch(id, name, label) {
    return {
        id,
        name,
        label: label || '开关',
        type: 'switch',
        dependent: 'form',
        icon: 'uex-icon-toggle',
        options: {
            defaultValue: false,
            activeColor: '#409EFF',
            inactiveColor: '#C0CCDA'
        },
        rules: []
    };
}

export function Slider(id, name, label) {
    return {
        id,
        name,
        label: label || '滑块',
        type: 'slider',
        dependent: 'form',
        icon: 'uex-icon-configuration-mat',
        options: {
            defaultValue: 0,
            showInput: false,
            min: 0,
            max: 100,
            step: 1
        },
        rules: []
    };
}

export function Transfer(id, name, label) {
    return {
        id,
        name,
        label: label || '穿梭框',
        type: 'transfer',
        dependent: 'form',
        icon: 'ri-file-transfer-fill',
        options: {
        },
        rules: []
    };
}

export function RemoteTransfer(id, name, label) {
    return {
        id,
        name,
        label: label || '远程穿梭框',
        type: 'remote-transfer',
        dependent: 'form',
        icon: 'ri-file-transfer-fill',
        options: {
        },
        rules: []
    };
}

export function Codemirror(id, name, label) {
    return {
        id,
        name,
        label: label || '代码编辑器',
        type: 'codemirror',
        dependent: 'form',
        icon: 'uex-icon-data-developed',
        options: {
        },
        rules: []
    };
}

export function Cron(id, name, label) {
    return {
        id,
        name,
        label: label || 'cron表达式',
        type: 'cron',
        dependent: 'form',
        icon: 'uex-icon-data-mining1',
        options: {
        },
        rules: []
    };
}

export function Upload(id, name, label) {
    return {
        id,
        name,
        label: label || '上传',
        type: 'upload',
        dependent: 'form',
        icon: 'uex-icon-upload-cloud',
        options: {
        },
        rules: []
    };
}

export function Rate(id, name, label) {
    return {
        id,
        name,
        label: label || '评分',
        type: 'rate',
        dependent: 'form',
        icon: 'uex-icon-star-on',
        options: {
        },
        rules: []
    };
}

export function ColorPicker(id, name, label) {
    return {
        id,
        name,
        label: label || '颜色选择器',
        type: 'color-picker',
        dependent: 'form',
        icon: 'uex-icon-palette',
        options: {
        },
        rules: []
    };
}

