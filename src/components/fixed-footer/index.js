import baseComponent from '@base/baseComponent';
import classNames from '@utils/classNames';

baseComponent({
    useSafeArea: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-fixed-footer'
        },
        bottom: {
            type: Number,
            value: 0
        },
        height: {
            type: Number,
            value: 114
        }
    },
    computed: {
        ss: [
            'prefixCls, isIPhoneX',
            function (prefixCls, isIPhoneX) {
                const wrap = classNames(prefixCls, {
                    [`${prefixCls}--is-iphonex`]: isIPhoneX
                });

                const placeholder = `${prefixCls}__placeholder`;
                const inner = `${prefixCls}__inner`;
                const actions = `${prefixCls}__actions`;

                return {
                    wrap,
                    placeholder,
                    inner,
                    actions
                };
            }
        ]
    },
    methods: {}
});
