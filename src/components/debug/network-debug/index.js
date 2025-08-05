import globalStore from '@modules/globalStore';

Component({
    properties: {
        visibleNetwork: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        activeName: [],
        networkData: [],
    },
    observers: {
        visibleNetwork: function (value) {
            if (value) {
                this.modifyNetworkData();
            } else {
                this.setData({
                    activeName: [],
                });
            }
        },
    },
    methods: {
        /**
         * JSON格式化
         * @param {*} event
         */
        handleFormatText(event) {
            const currentData = event.currentTarget.dataset.requestlist;
            const { networkData } = this.data;
            const currentIndexData = networkData[currentData.parentIndex];
            // 对一个key生成一个isFormat来判断是否格式化了
            currentIndexData[`isFormat${currentData.currentKey}`] = !currentIndexData[
                `isFormat${currentData.currentKey}`
            ];
            if (!currentIndexData[`format${currentData.currentKey}`]) {
                // 将格式化的数据单独存储
                currentIndexData[`format${currentData.currentKey}`] = JSON.stringify(currentData.data, null, '\t');
            }
            this.setData({
                [`networkData[${currentData.parentIndex}]`]: currentIndexData,
            });
        },
        /**
         * 复制数据
         * @param {*} stringData
         */
        copyRequestData(stringData) {
            wx.setClipboardData({
                data: stringData,
            });
        },
        /**
         * 复制某一项的某一条数据(未JSON格式化)
         * @param {*} event
         */
        handleRequestDataCopy(event) {
            this.copyRequestData(JSON.stringify(event.currentTarget.dataset.requestlist));
        },
        /**
         * 隐藏network面板
         */
        handleHideNetwork() {
            this.setData({
                visibleNetwork: false,
            });
        },
        /**
         * 根据全局的network数据修改data里的network
         */
        modifyNetworkData() {
            let networkData = JSON.parse(JSON.stringify(globalStore.get('network')));
            if (networkData) {
                if (networkData.length > 50) {
                    networkData.splice(0, networkData.length - 50);
                }
                networkData = networkData.reverse();
            }
            this.setData({
                networkData,
            });
        },
        /**
         * 复制当前这一条请求的全部数据
         */
        handleAllRequestDataCopy(event) {
            const allRequestData = event.currentTarget.dataset.allrequestdata;
            const allRequestDataFilter = {
                params: allRequestData.data,
                header: allRequestData.header,
                url: allRequestData.url,
                response: allRequestData.response,
            };
            this.copyRequestData(JSON.stringify(allRequestDataFilter));
        },
        /**
         * 清空network数据
         */
        handleClearAllData() {
            globalStore.clear('network');
            this.modifyNetworkData();
        },
    },
});
