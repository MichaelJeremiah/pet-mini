import baseComponent from '@base/baseComponent';
import classNames from '@utils/classNames';

baseComponent({
    relations: {
        '../accordion/index': {
            type: 'child',
            observer() {
                this.debounce(this.updated);
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-accordion-group',
        },
        defaultCurrent: {
            type: Array,
            value: [],
        },
        current: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal);
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        accordion: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
    },
    data: {
        activeKey: '',
        keys: [],
    },

    computed: {
        ss: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls);
            const hd = `${prefixCls}__hd`;
            const bd = `${prefixCls}__bd`;

            return {
                wrap,
                hd,
                bd
            };
        }],
    },
    methods: {
        updated(activeKey = this.data.activeKey) {
            if (this.data.activeKey !== activeKey) {
                this.setData({ activeKey });
            }

            this.changeCurrent(activeKey);
        },
        changeCurrent(activeKey) {
            const elements = this.getRelationNodes('../accordion/index');

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    const key = element.data.key || String(index);
                    const current = this.data.accordion ? activeKey[0] === key : activeKey.indexOf(key) !== -1;

                    element.changeCurrent(current, key);
                });
            }

            if (this.data.keys.length !== elements.length) {
                this.setData({
                    keys: elements.map((element) => element.data),
                });
            }
        },
        emitEvent(key) {
            this.triggerEvent('change', {
                key,
                keys: this.data.keys,
            });
        },
        setActiveKey(activeKey) {
            if (!this.data.controlled) {
                this.updated(activeKey);
            }

            this.emitEvent(this.data.accordion ? activeKey[0] : activeKey);
        },
        onClickItem(key) {
            let activeKey = [...this.data.activeKey];

            if (this.data.accordion) {
                activeKey = activeKey[0] === key ? [] : [key];
            } else {
                activeKey = activeKey.indexOf(key) !== -1 ? activeKey.filter((n) => n !== key) : [...activeKey, key];
            }

            this.setActiveKey(activeKey);
        },
    },
    ready() {
        const { defaultCurrent, current, controlled } = this.data;
        const activeKey = controlled ? current : defaultCurrent;

        this.updated(activeKey);
    },
});
