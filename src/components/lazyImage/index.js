import baseComponent from '@base/baseComponent';

const getRandomKey = () => {
    return Math.random().toString(36).substring(2);
};

/**
 * 检查图片链接是否合法，存在、是字符串类型且不包含`undefined`字符串或路径
 * @param src 图片路径
 * @return {boolean} 是否合法
 */
const validateSrc = (src) => !!src && typeof src === 'string' && src !== 'undefined' && !/\/undefined\//.test(src);

/**
 * 获取paddingTop，让图片按照自己的宽高显示
 * @param src 图片路径
 * @returns {object}
 */
const getImgStyle = (src) => {
    if (!validateSrc(src)) return null;

    const [, w, h] = src.match(/-W(\d+)H(\d+)/) || [];
    let paddingTop = '100%';
    if (w && h) {
        paddingTop = `${Math.floor((h / w) * 100)}%`;
        if (+h === 1) {
            paddingTop = '1rpx';
        }
    }
    return { paddingTop };
};

baseComponent({
    properties: {
        src: {
            type: String,
            value: '',
            observer: 'init'
        },
        mode: {
            type: String,
            value: 'aspectFill'
        },
        original: {
            type: Boolean,
            value: false
        },
        lazy: {
            type: Boolean,
            value: true
        },
        color: {
            type: String,
            value: ''
        },
        observerOptions: {
            // 自定义createIntersectionObserver配置
            type: Object,
            value: {}
        },
        autoHeight: {
            type: Boolean,
            value: false
        }
    },
    data: {
        imgSrc: '',
        showImg: false,
        readerImg: false,
        classKey: 'lazy-img'
    },
    methods: {
        init() {
            const classKey = getRandomKey();
            this.setData({
                classKey,
                showImg: false,
                readerImg: false
            });
            let imgSrc = this.data.src;
            let imgMode = this.data.mode;
            const autoHeight = this.data.autoHeight;
            if (autoHeight) {
                let { paddingTop } = getImgStyle(imgSrc);
                this.setData({
                    paddingTop
                });
            }
            // 如果是cdn资源，缩放一下
            if (!this.data.original && imgSrc && imgSrc.indexOf('cdn.weipaitang.com') > -1) {
                const vales = this.data.src.match(/-W(\d+)H(\d+)/);
                if (vales[1] > 750) {
                    imgSrc = this.data.src + '/w/640';
                }
                this.setData({
                    imgSrc: imgSrc,
                    imgMode: imgMode,
                    showImg: !this.data.lazy
                });
            } else {
                this.setData({
                    imgSrc: imgSrc,
                    imgMode: imgMode,
                    showImg: !this.data.lazy
                });
            }
            //真正的图片懒加载
            const { observerOptions } = this.data;
            let IntersectionObserver = this.createIntersectionObserver(observerOptions);
            IntersectionObserver.relativeToViewport().observe(`.img-${classKey}`, (res) => {
                if (res.intersectionRatio > 0) {
                    this.setData(
                        {
                            showImg: true
                        },
                        () => {
                            IntersectionObserver.disconnect();
                        }
                    );
                }
            });
        },
        bindload(e) {
            this.setData({
                readerImg: true
            });
            this.triggerEvent('bindload', e);
        },
        binderror(e) {
            this.triggerEvent('binderror', e);
        }
    }
});
