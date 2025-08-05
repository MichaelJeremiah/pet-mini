import basePage from '@base/basePage';

basePage({
    data: {
        navbar: {
            virtual: true,
            background: 'transparent',
            title: ''
        }
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
    }
});
