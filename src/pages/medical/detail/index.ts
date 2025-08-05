import basePage from '@base/basePage';
import wxapi from '@utils/wxapi';

basePage({
    data: {
        navbar: {
            virtual: true,
            background: 'transparent',
            title: '医院详情'
        },
        doctorList: [
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/cjniyt-1670315134120-W92H92.png',
                name: '朱小亮',
                position: '专家医师/经理',
                workage: '从业15年'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/cjniyt-1670315134120-W92H92.png',
                name: '高小峰',
                position: '主治医师/院长',
                workage: '从业9年'
            },
            {
                avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/cjniyt-1670315134120-W92H92.png',
                name: '朱小小',
                position: '高级医师',
                workage: '从业9年'
            }
        ],
        commentList: [
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '开心宝宝每一天'
                },
                star: 4,
                date: '2022-12-06',
                imgs: [
                    'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/zvxv77-1670314274669-W110H110.png',
                    'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/zvxv77-1670314274669-W110H110.png',
                    'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/zvxv77-1670314274669-W110H110.png'
                ],
                content: '第一次来这家店，店员小姐姐服务非常受到，非常耐心指导，泡芙一点也没闹，下次还会来这里的。'
            },
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '哈利波特'
                },
                star: 4,
                date: '2022-12-06',
                imgs: [],
                content: '环境好，服务好，没有异味，价格合理，必须好评。'
            },
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '王泡芙'
                },
                star: 4,
                date: '2022-12-06',
                imgs: [],
                content: '这家店的老客户了，家里的泡芙一直来这家店。'
            },
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: 'babe'
                },
                star: 4,
                date: '2022-12-06',
                imgs: [],
                content: '非常满意，这里的医师都很专业，超级好，非常耐心而且问任何问题都耐心解答。'
            }
        ]
    },
    onPageScroll({ scrollTop }: WechatMiniprogram.Page.IPageScrollOption) {
        const navbar = this.data.navbar;
        if (scrollTop > 60) {
            this.setData({
                navbar: {
                    ...navbar,
                    background: '#ffffff'
                }
            });
        }

        if (scrollTop < 60) {
            this.setData({
                navbar: {
                    ...navbar,
                    background: 'transparent'
                }
            });
        }
    },
    onDoctorClick() {
        wxapi.navigateTo('/pages/medical/doctor/index');
    }
});
