import basePage from '@base/basePage';

basePage({
    data: {
        caches: ['巴哥犬', '狗狗', '拉布拉多', '牧羊犬']
    },
    onCleanCache() {
        this.setData({
            caches: []
        });
    },
    onSearch() {},
    onConfirm() {},
    onBlur() {}
});
