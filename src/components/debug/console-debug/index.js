import globalStore from '@modules/globalStore';

Component({
    properties: {
        visibleConsole: {
            type: Boolean,
            value: false
        }
    },
    data: {
        consoleData: []
    },
    observers: {
        visibleConsole: function (value) {
            if (value) {
                this.getAllConsoleInfo();
            }
        }
    },
    methods: {
        /**
         * 获取全部的console信息
         */
        getAllConsoleInfo() {
            let consoleData = JSON.parse(JSON.stringify(globalStore.get('console')));
            if (consoleData) {
                if (consoleData.length > 50) {
                    consoleData.splice(0, consoleData.length - 50);
                }

                consoleData = consoleData.reverse().map((item, index) => {
                    return {
                        index,
                        isFormat: false,
                        type: item.type,
                        value: item.value,
                        formatValue: JSON.stringify(item.value, null, '\t')
                    };
                });
                this.setData({
                    consoleData
                });
            }
        },
        /**
         * 点击内容完成复制log
         */
        handleCopyLogItem(event) {
            const { logItem } = event.currentTarget.dataset;
            wx.setClipboardData({
                data: JSON.stringify(logItem)
            });
        },
        /**
         * 生成一个新的log
         */
        getNewConsoleData(index, newData) {
            const { consoleData } = this.data;
            newData ? consoleData.splice(index, 1, newData) : consoleData.splice(index, 1);
            return consoleData;
        },
        handleFormatLog(event) {
            const { data, index } = event.currentTarget.dataset.current;
            data.isFormat = !data.isFormat;
            const consoleData = this.getNewConsoleData(index, data);
            this.setData({
                consoleData
            });
        },
        /**
         * 清空console数据
         */
        handleClearAllData() {
            globalStore.clear('console');
            this.setData({
                consoleData: []
            });
        }
    }
});
