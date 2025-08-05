import baseComponent from '@base/baseComponent';
import classNames from '@utils/classNames';
import wxapi from '@utils/wxapi';

baseComponent({
    useSafeArea: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-tabbar'
        },
        // 背景色
        backgroundColor: {
            type: String,
            value: ''
        },
        // 当前选中索引
        selectedIndex: {
            type: Number,
            value: 0
        },
        // 购物车数量
        cartCount: {
            type: String,
            value: ''
        },
        // 文字选中颜色
        textSelectedColor: {
            type: String,
            value: '#DB0227'
        },
        // 文字未选中颜色
        textColor: {
            type: String,
            value: '#2D3034'
        }
    },

    data: {
        count: 0,
        // 当前选中项索引
        selectedIndex: 0,
        list: [
            {
                text: '首页',
                key: 'ShopIndex',
                pagePath: '/pages/shop/index/index',
                iconPath: 'https://cdn.weipaitang.com/static/2021020390618721-58de-872158de-6439-001a8c8997a1-W96H96',
                selectedIconPath: 'https://cdn.weipaitang.com/static/202106224bb3bdc9-ddb1-bdc9ddb1-69a3-cd3c75b31db7-W48H48'
            },
            {
                text: '会员',
                key: 'VipIndex',
                pagePath: '/pages/vip/index/index',
                iconPath: 'https://cdn.weipaitang.com/static/2021062225230513-39d0-051339d0-fe90-fbec918c6453-W48H48',
                selectedIconPath: 'https://cdn.weipaitang.com/static/202106226f8f8a3f-bb95-8a3fbb95-e233-1fb980c29540-W48H48'
            },
            {
                text: '会员码',
                key: 'VipPayCode',
                pagePath: '/pages/vip/paymentCode/index',
                iconPath: 'https://cdn.weipaitang.com/static/20210622184b90c0-e45d-90c0e45d-3348-a5ae82944192-W48H48',
                selectedIconPath: 'https://cdn.weipaitang.com/static/2021062277079c99-e316-9c99e316-c87b-3d4c9feef092-W48H48'
            },
            {
                text: '购物车',
                key: 'ShopCart',
                pagePath: '/pages/shop/cart/index',
                iconPath: 'https://cdn.weipaitang.com/static/20210930bab0f258-d476-f258d476-1e8b-876853fee35e-W48H48',
                selectedIconPath: 'https://cdn.weipaitang.com/static/2021093087f1d54f-63df-d54f63df-6f7b-e4d197ec52b1-W48H48'
            },
            {
                text: '我的',
                key: 'MineIndex',
                pagePath: '/pages/mine/index',
                iconPath: 'https://cdn.weipaitang.com/static/202106223e611b4e-f155-1b4ef155-d2f9-90036c7aca0b-W48H48',
                selectedIconPath: 'https://cdn.weipaitang.com/static/20210622b5c1ade0-7578-ade07578-4fd5-0b66a595a0d9-W48H48'
            }
        ]
    },

    pageLifetimes: {
        show() {
            // 切换 tab 选中项
            this.parseCurrentPage();
        }
    },

    computed: {
        ss: [
            'prefixCls, safeAreaConfig, isIPhoneX',
            function (prefixCls, safeAreaConfig, isIPhoneX) {
                const wrap = classNames(prefixCls, {
                    [`${prefixCls}--is-iphonex`]: safeAreaConfig.bottom && isIPhoneX
                });

                return {
                    wrap
                };
            }
        ],
        tabList: [
            'list',
            function (list) {
                const tabList = [...list];
                return tabList;
            }
        ]
    },

    methods: {
        /**
         * 根据当前页 path，切换 tab 选中项
         */
        parseCurrentPage() {
            const currentPagePath = '/' + getCurrentPages()[0].route;
            const list = this.data.tabList;

            let index;
            for (let i = 0; i < list.length; i++) {
                if (list[i].pagePath === currentPagePath) {
                    index = i;
                    break;
                }
            }

            if (index === undefined) {
                return;
            }

            this.setData({
                selectedIndex: index
            });

            // 触发事件
            const item = this.data.tabList[index];
            this.triggerEvent('change', { index, item });
        },

        /**
         * 事件：点击 tab 项
         */
        onTapItem(e) {
            const currentPagePath = '/' + getCurrentPages()[0].route;
            const index = e.currentTarget.dataset.index;
            const url = this.data.tabList[index].pagePath;
            const key = this.data.tabList[index].key;

            if (key === 'VipPayCode' || currentPagePath === url) {
                return;
            }

            this.triggerEvent('click', { index, item: this.data.tabList[index] });

            if (!url) {
                return;
            }
            // 切换路由
            wxapi.reLaunch(url);
        },
        handleUserProfile() {
            wxapi.navigateTo('/pages/vip/paymentCode/index');

            // 组件内不好判断是否会员，交给外部处理
            // this.triggerEvent('click', { index: 2, item: this.data.list[2] });
        },
    }
});
