import baseComponent from '@base/baseComponent';
import classNames from '@utils/classNames';
import styleToCssString from '@utils/styleToCssString';

baseComponent({
    relations: {
        '../timeline/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-timeline-item',
        },
        content: {
            type: String,
            value: '',
        },
        dotStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                });
            },
        },
        custom: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        isLast: false,
        isPending: false,
        pending: false,
        className: '',
        extStyle: '',
    },
    computed: {
        ss: ['prefixCls, isLast, pending, isPending, custom', function(prefixCls, isLast, pending, isPending, custom) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--last`]: isLast,
                [`${prefixCls}--pending`]: pending,
            });
            const tail = classNames(`${prefixCls}__tail`, {
                [`${prefixCls}__tail--pending`]: isPending,
            });
            const dot = classNames(`${prefixCls}__dot`, {
                [`${prefixCls}__dot--custom`]: custom,
            });
            const content = `${prefixCls}__content`;
            const title = `${prefixCls}__title`;

            return {
                wrap,
                tail,
                dot,
                content,
                title,
            };
        }],
    },
    methods: {
        updateIsLastElement({ index, isLast, isPending, pending, position }) {
            const { prefixCls } = this.data;
            const className = position === 'alternate' ? index % 2 === 0 ? `${prefixCls}--alternate ${prefixCls}--left` : `${prefixCls}--alternate ${prefixCls}--right` : position === 'right' ? `${prefixCls}--right` : '';
            this.setData({ isLast, isPending, pending, className });
        },
    },
});
