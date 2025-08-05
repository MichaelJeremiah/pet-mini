import basePage from '@base/basePage';
import wxapi from '@utils/wxapi';

basePage({
    data: {
        banners: [
            {
                url: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/u7w7pd-1670307348441-W345H165.png',
                link: ''
            },
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
        storeList: [
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: '淘气联盟宠物医院',
                star: 4,
                address: '丰台长丰园和顺家园底商B23-89',
                distance: '3.55km'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: '喵喵宠物医院',
                star: 4,
                address: '丰台长丰园和顺家园底商B23-89',
                distance: '3.55km'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: 'Cream芭比堂宠物医院',
                star: 4,
                address: '丰台长丰园和顺家园底商B23-89',
                distance: '3.55km'
            }
        ]
    },
    onHospitalClick() {
        wxapi.navigateTo('/pages/medical/detail/index');
    }
});
