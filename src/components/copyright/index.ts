import baseComponent from '@base/baseComponent';
import classNames from '@utils/classNames';
import { setShowDebug } from '@utils/util';
import wxapi from '@utils/wxapi';

let timer: NodeJS.Timer | null = null;

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-copyright'
        },
        /**
         * 主题样式
         * @enum ['white', 'dark']
         */
        theme: {
            type: String,
            value: 'dark'
        }
    },
    data: {
        icon: {
            dark: 'https://cdn.weipaitang.com/static/20210803137114ff-af9a-14ffaf9a-3661-cfad7b23401d-W120H50',
            light: 'https://cdn.weipaitang.com/static/202108064e28c2a9-2ecf-c2a92ecf-3551-5abc63295eab-W120H50'
        }
    },
    computed: {
        ss: ['prefixCls, theme', function(prefixCls: string, theme: string) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
            });
            const logo = `${prefixCls}__logo`;
            const text = `${prefixCls}__text`;

            return {
                wrap,
                logo,
                text,
            };
        }],
    },
    methods: {
        onTap() {
            if (this.tapCount > 7) {
                return;
            }
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            if (this.tapCount === undefined) {
                this.tapCount = 0;
            }
            this.tapCount++;
            if (this.tapCount === 7) {
                setShowDebug();
                wxapi.reLaunch('/pages/index/index');
            } else {
                timer = setTimeout(() => {
                    if (timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                    this.tapCount = 0;
                }, 1000); 
            }
        }
    }
});