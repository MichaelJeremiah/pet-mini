import basePage from '@base/basePage';

basePage({
    data: {
        imgs: []
    },
    onChooseImage() {
        const imgs = this.data.imgs;
        wx.chooseMedia({
            count: 9 - imgs.length,
            mediaType: ['image'],
            success: (res) => {
                const newImgs = res.tempFiles.map(({ tempFilePath }) => tempFilePath);
                this.setData({
                    imgs: [...imgs, ...newImgs]
                });
            }
        });
    }
});
