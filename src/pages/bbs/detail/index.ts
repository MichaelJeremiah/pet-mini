import basePage from '@base/basePage';

basePage({
    data: {
        user: {
            avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
            nickname: '王小样',
            extra: '不拉多尔-泡芙'
        },
        imgs: [
            'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png',
            'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/om86pz-1670338297678-W176H176.png',
            'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/xifezo-1670338366736-W176H176.png',
            'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/6rwjhz-1670338385814-W176H256.png',
            'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/yc8lvs-1670339206178-W176H176.png'
        ]
    },
    onPreviewImg(e: WechatMiniprogram.BaseEvent) {
        console.log(e);
        const { index } = e.currentTarget.dataset;
        wx.previewImage({
            urls: this.data.imgs,
            current: this.data.imgs[index]
        });
    }
});
