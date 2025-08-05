import baseComponent from '@base/baseComponent';
import pageScrollBehavior from '@behaviors/pageScrollBehavior';
import cx from '@utils/classNames';
import { isDef } from '@utils/is';
import { getRect } from '@utils/util';

const ROOT_ELEMENT = '.vx-sticky';

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'vx-sticky'
        },
        zIndex: {
            type: Number,
            value: 99,
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: 'onScroll',
        },
        disabled: {
            type: Boolean,
            observer: 'onScroll',
        },
        container: {
            type: null,
            observer: 'onScroll',
        },
        scrollTop: {
            type: null,
            observer(val: number) {
                // @ts-ignore
                this.onScroll({ scrollTop: val });
            },
        },
    },
    data: {
        height: 0,
        fixed: false,
        transform: 0,
    },
    behaviors: [
        pageScrollBehavior(function (event) {
            if (this.data.scrollTop !== null) {
                return;
            }
            this.onScroll(event);
        })
    ],
    computed: {
        ss: [
            'prefixCls, fixed',
            function (prefixCls: string, fixed: boolean) {
                const container = prefixCls;
                const wrap = cx(`${prefixCls}-wrap`, {
                    [`${prefixCls}-wrap--fixed`]: fixed,
                });

                return {
                    container,
                    wrap
                };
            }
        ]
    },
    methods: {
        onScroll({ scrollTop }: { scrollTop?: number } = {}) {
            const { container, offsetTop, disabled } = this.data;
    
            if (disabled) {
                this.setDataAfterDiff({
                    fixed: false,
                    transform: 0,
                });
                return;
            }
    
            this.scrollTop = scrollTop || this.scrollTop;
    
            if (typeof container === 'function') {
                Promise.all([
                    getRect(this, ROOT_ELEMENT),
                    this.getContainerRect(),
                ]).then(([root, container]) => {
                    if (offsetTop + root.height > container.height + container.top) {
                        this.setDataAfterDiff({
                            fixed: false,
                            transform: container.height - root.height,
                        });
                    } else if (offsetTop >= root.top) {
                        this.setDataAfterDiff({
                            fixed: true,
                            height: root.height,
                            transform: 0,
                        });
                    } else {
                        this.setDataAfterDiff({ fixed: false, transform: 0 });
                    }
                });
    
                return;
            }
    
            getRect(this, ROOT_ELEMENT).then((root: any) => {
                if (!isDef(root)) {
                    return;
                }
                if (offsetTop >= root.top) {
                    this.setDataAfterDiff({ fixed: true, height: root.height });
                    this.transform = 0;
                } else {
                    this.setDataAfterDiff({ fixed: false });
                }
            });
        },
    
        setDataAfterDiff(data: Record<string, any>) {
            wx.nextTick(() => {
                const diff = Object.keys(data).reduce((prev, key) => {
                    if (data[key] !== this.data[key]) {
                        // @ts-ignore
                        prev[key] = data[key];
                    }
    
                    return prev;
                }, {});
    
                if (Object.keys(diff).length > 0) {
                    this.setData(diff);
                }
    
                this.triggerEvent('scroll', {
                    scrollTop: this.scrollTop,
                    isFixed: data.fixed || this.data.fixed,
                });
            });
        },
    
        getContainerRect() {
            const nodesRef: WechatMiniprogram.NodesRef = this.data.container();
    
            return new Promise<WechatMiniprogram.BoundingClientRectCallbackResult>(
                (resolve) => nodesRef.boundingClientRect(resolve).exec()
            );
        },
    },
});
