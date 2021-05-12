import * as Widget from './widget.conf.js';

export default {
    layouts: [{
        id: 1,
        label: '栅格布局',
        icon: 'uex-icon-layout-column',
        type: 'grid-layout',
        options: {
            gutter: 5,
            height: '200px'
        },
        children: []
    }],
    widgets: [
        new Widget.Form(1),
        new Widget.Table(2),
        new Widget.Graph(3)
    ],
    formItems: [
        new Widget.Input(1),
        new Widget.Select(2),
        new Widget.Radio(3),
        new Widget.Checkbox(4),
        new Widget.Datepicker(5),
        new Widget.Button(6),
        new Widget.InputNumber(7),
        new Widget.Cascader(8),
        new Widget.Switch(9),
        new Widget.Slider(10),
        new Widget.Transfer(11),
        new Widget.RemoteTransfer(12),
        new Widget.Codemirror(13),
        new Widget.Cron(14),
        new Widget.Upload(15),
        new Widget.Rate(16),
        new Widget.ColorPicker(17)
    ]
};
