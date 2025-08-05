Component({
    properties: {
        visibleStorage: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        activeName: [],
        storageData: [], // 全部的storage
        storageDataItem: {}, // 每次点击的storage
        storageDataOperatingText: ['复制', '删除'],
        modifyAfterValue: '',
    },
    observers: {
        visibleStorage: function (value) {
            if (value) {
                this.getAllStorageInfo();
            } else {
                this.setData({
                    activeName: [],
                });
            }
        },
    },
    methods: {
        /**
         * 修改storage
         */
        modifyStorageData(storageData) {
            this.setData({
                storageData,
            });
        },
        /**
         * 清除全部storage
         */
        handleClearStorage() {
            this.handleDeleteStorage(1);
        },
        /**
         * 隐藏storage面板
         */
        handleHideStorage() {
            this.setData({
                visibleStorage: false,
            });
        },
        /**
         * 获取全部的storage信息
         */
        getAllStorageInfo() {
            const storageData = [];
            wx.getStorageInfo({
                success: (res) => {
                    const { keys } = res;
                    keys.forEach((key, index) => {
                        const storageItemData = {};
                        storageItemData.storageKey = key;
                        storageItemData.index = index;
                        storageItemData.isFormat = false;
                        storageItemData.status = 1; // 用来显示修改(1)或者完成(2)
                        storageItemData.storageValue = wx.getStorageSync(key);
                        storageItemData.formatStorageValue = JSON.stringify(storageItemData.storageValue, null, '\t');
                        storageData.push(storageItemData);
                    });
                    this.modifyStorageData(storageData);
                },
            });
        },
        /**
         * storage操作
         */
        handleOperatingStorage(event) {
            const storageData = event.currentTarget.dataset.storage;
            this.setData({
                storageDataItem: storageData,
            });
            const mapObject = {
                1: this.handleCopyStorage,
                2: this.handleDeleteStorage,
            };
            mapObject[storageData.type].call(this);
        },
        /**
         * 复制storage
         */
        handleCopyStorage() {
            wx.setClipboardData({
                data: JSON.stringify(this.data.storageDataItem.storageValue),
            });
        },
        /**
         * 点击内容完成复制storage
         */
        handleCopyStorageItem(event) {
            const { storageItem } = event.currentTarget.dataset;
            wx.setClipboardData({
                data: JSON.stringify(storageItem),
            });
        },
        /**
         * 删除storage弹窗操作
         * @param {*} type 1(全部)|2(某一条)
         * @param {*} callback 点击确认删除按钮的操作函数
         */
        handleDeleteStorage(type = 2) {
            const deleteModalContent =
                type === 1
                    ? '你确定要删除全部的 storage 吗？'
                    : `你确定要删除 ${this.data.storageDataItem.storageKey} 这条 storage 吗？`;
            wx.showModal({
                title: '提示',
                content: deleteModalContent,
                success: (res) => {
                    if (res.confirm) {
                        type === 1 ? this.confirmDeleteAllStorage() : this.confirmDeleteStorage();
                    }
                },
            });
        },
        /**
         * 确认删除全部的storage
         */
        confirmDeleteAllStorage() {
            wx.clearStorageSync();
            this.modifyStorageData([]);
        },
        /**
         * 确认删除storage
         */
        confirmDeleteStorage() {
            const { storageDataItem } = this.data;
            wx.removeStorageSync(storageDataItem.storageKey);
            const storageData = this.getNewStorageData(storageDataItem.index);
            this.modifyStorageData(storageData);
        },
        /**
         * 生成一个新的storageData
         */
        getNewStorageData(index, newData) {
            const { storageData } = this.data;
            newData ? storageData.splice(index, 1, newData) : storageData.splice(index, 1);
            return storageData;
        },
        handleFormatStorage(event) {
            const { data, index } = event.currentTarget.dataset.currentstorage;
            data.isFormat = !data.isFormat;
            const storageData = this.getNewStorageData(index, data);
            this.setData({
                storageData,
            });
        },
        handleClearAllData() {
            this.handleClearStorage();
        },
    },
});
