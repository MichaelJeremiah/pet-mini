import baseComponent from '@base/baseComponent';

baseComponent({
    properties: {
        visible: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        tabItems: ['Network', 'Storage', 'Store', 'Console'],
        currentIndex: 0,
        initClearIndex: -1,
        currentAllChildComponent: null,
        visibleNetwork: true
    },
    methods: {
        handleHideLog() {
            this.setData({
                visible: false,
            });
        },
        handleChangeTab(event) {
            const { index } = event.currentTarget.dataset;
            this.setData({
                currentIndex: index,
            });
        },
        handleClearReport() {
            if (!this.currentAllChildComponent) {
                this.currentAllChildComponent = this.selectAllComponents('.collapse-debug');
            }
            const currentComponent = this.currentAllChildComponent[this.data.currentIndex];
            currentComponent.handleClearAllData && currentComponent.handleClearAllData();
        },
    },
});
