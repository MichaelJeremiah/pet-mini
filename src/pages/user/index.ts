import basePage from '@base/basePage';

basePage({
    data: {
        navbar: {
            virtual: true,
            background: 'transparent',
            title: ''
        },
        postList: [
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '王小样',
                    extra: '不拉多尔-泡芙'
                }
            },
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '王小样',
                    extra: '不拉多尔-泡芙'
                }
            },
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '王小样',
                    extra: '不拉多尔-泡芙'
                }
            },
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '王小样',
                    extra: '不拉多尔-泡芙'
                }
            }
        ]
    },
    onPageScroll({ scrollTop }: WechatMiniprogram.Page.IPageScrollOption) {
        const navbar = this.data.navbar;
        if (scrollTop > 60) {
            this.setData({
                navbar: {
                    ...navbar,
                    title: '我的王泡芙',
                    background: '#ffffff'
                }
            });
        }

        if (scrollTop < 60) {
            this.setData({
                navbar: {
                    ...navbar,
                    title: '',
                    background: 'transparent'
                }
            });
        }
    }
});
