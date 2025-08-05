import system from '@modules/system';

const defaultSafeArea = {
    top: false,
    bottom: false,
};

const setSafeArea = (params: boolean | string ) => {
    if (typeof params === 'boolean') {
        return Object.assign({}, defaultSafeArea, {
            top: params,
            bottom: params,
        });
    } else if (params !== null && typeof params === 'object') {
        return Object.assign({}, defaultSafeArea);
    } else if (typeof params === 'string') {
        return Object.assign({}, defaultSafeArea, {
            [params]: true,
        });
    }
    return defaultSafeArea;
};

export default Behavior({
    properties: {
        safeArea: {
            // @ts-ignore
            type: [Boolean, String, Object],
            value: false,
        },
    },
    observers: {
        safeArea(newVal) {
            this.setData({ safeAreaConfig: setSafeArea(newVal) });
        },
    },
    definitionFilter(defFields) {
        const { statusBarHeight, isIPhoneX } = system.info;

        Object.assign(defFields.data = (defFields.data || {}), {
            safeAreaConfig: defaultSafeArea,
            safeAreaInset: {
                top: 88, // StatusBar & NavBar
                left: 0,
                right: 0,
                bottom: 34, // Home Indicator
            },
            statusBarHeight,
            isIPhoneX,
        });
    },
});
