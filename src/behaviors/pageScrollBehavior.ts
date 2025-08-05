import { isUnDef } from '@utils/is';
import { getCurrentPage } from '@utils/util';

type Scroller = (this: WechatMiniprogram.Component.TrivialInstance, event?: WechatMiniprogram.Page.IPageScrollOption) => void;

function onPageScroll(event?: WechatMiniprogram.Page.IPageScrollOption) {
    const { vxPageScroller = [] } = getCurrentPage<{
        vxPageScroller: Scroller[];
    }>();

    vxPageScroller.forEach((scroller: Scroller) => {
        if (typeof scroller === 'function') {
            // @ts-ignore
            scroller(event);
        }
    });
}

const pageScrollBehavior = (scroller: Scroller) =>
    Behavior({
        attached() {
            const page = getCurrentPage<{ vxPageScroller: Scroller[] }>();

            if (isUnDef(page as { vxPageScroller: Scroller[] })) {
                return;
            }

            if (Array.isArray(page.vxPageScroller)) {
                page.vxPageScroller.push(scroller.bind(this));
            } else {
                page.vxPageScroller =
                    typeof page.onPageScroll === 'function' ? [page.onPageScroll.bind(page), scroller.bind(this)] : [scroller.bind(this)];
            }

            page.onPageScroll = onPageScroll;
        },

        detached() {
            const page = getCurrentPage<{ vxPageScroller: Scroller[] }>();
            if (!isUnDef(page as { vxPageScroller: Scroller[] })) {
                page.vxPageScroller = page.vxPageScroller?.filter((item) => item !== scroller) || [];
            }
        }
    });

export default pageScrollBehavior;
