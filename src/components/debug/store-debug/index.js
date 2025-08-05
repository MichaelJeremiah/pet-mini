import globalStore from '@modules/globalStore';

Component({
    properties: {
        visibleStore: {
            type: Boolean,
            value: false
        }
    },
    data: {
        activeName: [],
        storeData: [], // 全部的storage
        storeDataItem: {}, // 每次点击的storage
        storeDataOperatingText: ['复制', '删除'],
        modifyAfterValue: ''
    },
    observers: {
        visibleStore: function (value) {
            if (value) {
                this.getAllStorageInfo();
            } else {
                this.setData({
                    activeName: []
                });
            }
        }
    },
    methods: {
        /**
         * 修改storage
         */
        modifyStoreData(storeData) {
            this.setData({
                storeData
            });
        },
        /**
         * 获取全部的storage信息
         */
        getAllStorageInfo() {
            const storeData = [];
            Object.keys(globalStore.store)
                .filter((key) => !['network', 'console'].includes(key))
                .forEach((key, index) => {
                    const storeItemData = {};
                    storeItemData.storageKey = key;
                    storeItemData.index = index;
                    storeItemData.isFormat = false;
                    storeItemData.status = 1; // 用来显示修改(1)或者完成(2)
                    storeItemData.storageValue = globalStore.store[key];
                    storeItemData.formatStorageValue = JSON.stringify(storeItemData.storageValue, null, '\t');
                    storeData.push(storeItemData);
                });
            this.modifyStoreData(storeData);
        },
        /**
         * storage操作
         */
        handleOperatingStore(event) {
            const storeData = event.currentTarget.dataset.storage;
            this.setData({
                storeDataItem: storeData
            });
            const mapObject = {
                1: this.handleCopyStore,
                2: this.handleDeleteStore
            };
            mapObject[storeData.type].call(this);
        },
        /**
         * 复制storage
         */
        handleCopyStore() {
            wx.setClipboardData({
                data: JSON.stringify(this.data.storeDataItem.storageValue)
            });
        },
        /**
         * 点击内容完成复制storage
         */
        handleCopyStoreItem(event) {
            const { storageItem } = event.currentTarget.dataset;
            wx.setClipboardData({
                data: JSON.stringify(storageItem)
            });
        },
        /**
         * 删除storage弹窗操作
         * @param {*} callback 点击确认删除按钮的操作函数
         */
        handleDeleteStore() {
            const deleteModalContent = `你确定要删除 ${this.data.storeDataItem.storageKey} 这条 store 吗？`;
            wx.showModal({
                title: '提示',
                content: deleteModalContent,
                success: (res) => {
                    if (res.confirm) {
                        this.confirmDeleteStore();
                    }
                }
            });
        },
        /**
         * 确认删除storage
         */
        confirmDeleteStore() {
            const { storeDataItem } = this.data;
            globalStore.clear(storeDataItem.storageKey);
            const storeData = this.getNewStoreData(storeDataItem.index);
            this.modifyStoreData(storeData);
        },
        /**
         * 生成一个新的storeData
         */
        getNewStoreData(index, newData) {
            const { storeData } = this.data;
            newData ? storeData.splice(index, 1, newData) : storeData.splice(index, 1);
            return storeData;
        },
        handleFormatStore(event) {
            const { data, index } = event.currentTarget.dataset.currentstorage;
            data.isFormat = !data.isFormat;
            const storeData = this.getNewStoreData(index, data);
            this.setData({
                storeData
            });
        }
    }
});
