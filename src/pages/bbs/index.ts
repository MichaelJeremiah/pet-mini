import basePage from '@base/basePage';
import wxapi from '@utils/wxapi';

basePage({
    data: {
        activeTab: '0',
        followList: [
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png'
            }
        ],
        recommendList: [
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                name: '王泡芙',
                intro: '知名萌宠博主'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png',
                name: '奥利奥',
                intro: '知名萌宠博主'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                name: '赖小来',
                intro: '知名萌宠博主'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png',
                name: '奥利奥',
                intro: '知名萌宠博主'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                name: '赖小来',
                intro: '知名萌宠博主'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png',
                name: '王泡芙',
                intro: '知名萌宠博主'
            }
        ],
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
    onTabClick(e: WechatMiniprogram.BaseEvent) {
        const { key } = e.currentTarget.dataset;
        this.setData({ activeTab: key });
    },
    onPostClick() {
        wxapi.navigateTo('/pages/bbs/detail/index');
    },
    onUserClick() {
        wxapi.navigateTo('/pages/user/index');
    }
});
