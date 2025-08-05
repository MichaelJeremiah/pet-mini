import basePage from '@base/basePage';
import { apiRequest, uploadImage } from '@utils/request';
import wxapi from '@utils/wxapi';

basePage({
    data: {
        banners: [
            {
                url: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/dqw5eh-1670251724289-W345H165.png',
                link: ''
            },
            {
                url: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/nkzoiy-1670252368015-W345H165.png',
                link: ''
            },
            {
                url: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qwonkd-1670252390082-W345H165.png',
                link: ''
            }
        ],
        postList: [
            {
                user: {
                    avatar: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/qpivhe-1670312222466-W120H120.png',
                    nickname: '王小样',
                    extra: '不拉多尔-泡芙'
                }
            }
        ],
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
        ]
    },
    onLoad() {},
    onPostClick() {
        wxapi.navigateTo('/pages/bbs/detail/index');
    },
    onDoctorClick() {
        wxapi.navigateTo('/pages/medical/doctor/index');
    }
});
