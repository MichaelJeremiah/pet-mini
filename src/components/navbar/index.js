import baseComponent from '@base/baseComponent';
import system from '@modules/system';
import classNames from '@utils/classNames';
import wxapi from '@utils/wxapi';

baseComponent({
    useSafeArea: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-navbar'
        },
        title: {
            type: String,
            value: ''
        },
        color: {
            type: String,
            value: ''
        },
        background: {
            type: String,
            value: '#ffffff'
        },
        // 虚拟导航，不占空间
        virtual: {
            type: Boolean,
            value: false
        },
        // 胶囊样式
        capsule: {
            type: Boolean,
            value: false
        },
        capsuleColor: {
            type: String,
            value: 'black'
        },
        // 总是展示返回按钮
        alwaysShowBack: {
            type: Boolean,
            value: false
        }
    },
    data: {
        showBack: true,
        innerWidth: 281,
        sideWidth: 94
    },
    computed: {
        ss: [
            'prefixCls, virtual, capsuleColor',
            function (prefixCls, virtual, capsuleColor) {
                const wrap = classNames(prefixCls, {
                    [`${prefixCls}--fixed`]: true,
                    [`${prefixCls}--virtual`]: virtual
                });
                const placeholder = `${prefixCls}__placeholder`;
                const inner = `${prefixCls}__inner`;
                const left = `${prefixCls}__left`;
                const center = `${prefixCls}__center`;
                const right = `${prefixCls}__right`;
                const back = `${prefixCls}__back`;
                const capsule = classNames(`${prefixCls}-capsule`, `${prefixCls}-capsule--${capsuleColor}`);
                const capsuleBack = `${prefixCls}-capsule__back`;
                const capsuleHome = `${prefixCls}-capsule__home`;

                return {
                    wrap,
                    placeholder,
                    inner,
                    left,
                    center,
                    right,
                    back,
                    capsule,
                    capsuleBack,
                    capsuleHome
                };
            }
        ]
    },
    pageLifetimes: {
        show() {
            this.getPagesLength();
            const { left } = wx.getMenuButtonBoundingClientRect();
            const { screenWidth } = system.info;
            this.setData({
                sideWidth: screenWidth - left,
                innerWidth: left
            });
        }
    },
    methods: {
        getPagesLength() {
            const pageStack = getCurrentPages().length;
            this.setData({
                showBack: pageStack > 1
            });
        },
        handleBack() {
            wxapi.navigateBack(-1, '/pages/index/index');
        },
        handleHome() {
            wxapi.reLaunch('/pages/index/index');
        }
    }
});
