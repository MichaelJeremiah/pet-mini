import baseComponent from '@base/baseComponent';
import system from '@modules/system';

baseComponent({
    properties: {
        visible: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        systemInfo: []
    },

    observers: {
        visible: function (value) {
            if (value) {
                this.showSystemInfo();
            } else {
                this.setData({
                    systemInfo: [],
                });
            }
        },
    },
    methods: {
        hideSystemInfo() {
            this.setData({
                visible: false,
            });
        },
        /**
         * 查看系统信息
         */
        showSystemInfo() {
            const {
                version,
                system: systemText,
                SDKVersion,
                platform,
                model,
                brand,
                benchmarkLevel,
                networkType,
                scene,
            } = system.info;

            const systemInfo = [
                {
                    name: '微信版本',
                    value: version,
                },
                {
                    name: '操作系统',
                    value: systemText,
                },
                {
                    name: '基础库版本',
                    value: SDKVersion,
                },
                {
                    name: '平台',
                    value: platform,
                },
                {
                    name: '设备型号',
                    value: model,
                },
                {
                    name: '设备品牌',
                    value: brand,
                },
                {
                    name: '设备性能',
                    value: benchmarkLevel,
                },
                {
                    name: '网络类型',
                    value: networkType
                },
                {
                    name: '场景',
                    value: scene,
                },
            ];

            this.setData({
                systemInfo,
            });
        },
    }
});