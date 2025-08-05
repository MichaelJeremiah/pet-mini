import baseComponent from '@base/baseComponent';
import wxapi from '@utils/wxapi';

baseComponent({
    properties: {
        title: {
            type: String,
            value: ''
        },
        moreText: {
            type: String,
            value: ''
        },
        moreLink: {
            type: String,
            value: ''
        },
        openType: {
            type: String,
            value: 'navigate'
        }
    },
    methods: {
        onMoreClick() {
            const { moreLink, openType } = this.data;
            if (moreLink) {
                switch (openType) {
                case 'switchTab':
                    wxapi.switchTab(moreLink);
                    return;
                case 'redirect':
                    wxapi.redirectTo(moreLink);
                    return;
                default:
                    wxapi.navigateTo(moreLink);
                    return;
                }
            }
            this.triggerEvent('click');
        }
    }
});
