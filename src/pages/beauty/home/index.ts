import basePage from '@base/basePage';
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
        goodsList: [
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: '小型犬洗澡美容套餐',
                desc: '包含小型犬洗澡、美容服务…',
                price: 360
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: '犬类洁白洁牙',
                desc: '包含小型犬洗澡、美容服务…',
                price: 360
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: '小型犬抗菌药浴套餐',
                desc: '包含小型犬洗澡、美容服务…',
                price: 360
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/gnntqy-1670300109330-W110H90.png',
                name: '犬类洁白洁牙',
                desc: '包含小型犬洗澡、美容服务…',
                price: 360
            }
        ]
    },
    onGoodsClick() {
        wxapi.navigateTo('/pages/beauty/detail/index');
    }
});
