import baseComponent from '@base/baseComponent';
import classNames from '@utils/classNames';

export enum Type {
    Default = 'default',
    Cart = 'cart',
    Search = 'search',
    Coupon = 'coupon',
    Goods = 'goods'
}
baseComponent({
    properties: {
        image: {
            type: String,
            value: ''
        },
        type: {
            type: String,
            value: Type.Default
        },
        tip: {
            type: String
        },
        size: {
            type: String,
            value: 'default'
        }
    },
    computed: {
        ss: [
            'size',
            function (size: string) {
                const wrap = classNames('vx-empty', {
                    [`vx-empty--${size}`]: size
                });

                return {
                    wrap
                };
            }
        ]
    },
    data: {
        images: {
            [Type.Default]: 'https://cdn.weipaitang.com/static/202110142d4cd6ad-81c0-d6ad81c0-d528-884777dd3583-W110H110',
            [Type.Cart]: 'https://cdn.weipaitang.com/static/20211014c65dd69e-a3fc-d69ea3fc-1b88-fecce31cd03d-W110H110',
            [Type.Search]: 'https://cdn.weipaitang.com/static/20211014a4fdbbc7-dcb1-bbc7dcb1-93a3-6d81adae6a78-W110H110',
            [Type.Coupon]: 'https://cdn.weipaitang.com/static/20211014f0edf82b-8a3c-f82b8a3c-f2ad-b235e949bc24-W110H110',
            [Type.Goods]: 'https://cdn.weipaitang.com/static/20211014d3cb8eb0-b5a7-8eb0b5a7-ae03-5449b8d41288-W110H110'
        },
        tips: {
            [Type.Default]: '暂无数据',
            [Type.Cart]: '购物车还是空的～',
            [Type.Search]: '暂无结果',
            [Type.Coupon]: '暂无优惠券',
            [Type.Goods]: '暂无商品'
        }
    },
    methods: {}
});
