import basePage from '@base/basePage';
import system from '@modules/system';
import wxapi from '@utils/wxapi';

let leftHeight = 0;
let rightHeight = 0;

basePage({
    data: {
        navbarHeight: system.info.navBarHeight,
        current: 0,
        tabList: [
            {
                key: 0,
                title: '推荐'
            },
            {
                key: 1,
                title: '养犬宝典'
            },
            {
                key: 2,
                title: '行为运动'
            },
            {
                key: 3,
                title: '健康百科'
            },
            {
                key: 4,
                title: '养猫宝典'
            }
        ],
        articleList: [
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/2joyyy-1670337242940-W176H129.png'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/om86pz-1670338297678-W176H176.png'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/xifezo-1670338366736-W176H176.png'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/6rwjhz-1670338385814-W176H256.png'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/yc8lvs-1670339206178-W176H176.png'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/munszr-1670307705365-W375H280.png'
            },
            {
                img: 'https://s2-1257336670.cos.ap-shanghai.myqcloud.com/images/hmbx3k-1670319244977-W150H150.png'
            }
        ],
        leftList: [],
        rightList: []
    },
    onTabsChange(e: WechatMiniprogram.CustomEvent) {
        const { key } = e.detail;
        this.setData({ current: key });
    },
    onLoad() {
        this.sortData();
    },
    async sortData() {
        const { articleList, leftList, rightList } = this.data;

        for (const item of articleList) {
            //判断两边高度，来觉得添加到那边
            leftHeight <= rightHeight ? leftList.push(item) : rightList.push(item);
            await this.getBoxHeight(leftList, rightList);
        }
    },
    getBoxHeight(leftList: any[], rightList: any[]) {
        return new Promise((resolve) => {
            this.setData(
                {
                    leftList,
                    rightList
                },
                () => {
                    // @ts-ignore
                    const query = wx.createSelectorQuery().in(this);
                    query.select('#leftList').boundingClientRect();
                    query.select('#rightList').boundingClientRect();
                    query.exec((res) => {
                        if (res[0]) {
                            leftHeight = res[0].height;
                            rightHeight = res[1].height;
                        }
                        resolve(true);
                    });
                }
            );
        });
    },
    onArticleClick() {
        wxapi.navigateTo('/pages/wiki/detail/index');
    }
});
