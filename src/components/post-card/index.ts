import baseComponent from '@base/baseComponent';

baseComponent({
    properties: {
        user: {
            type: Object,
            default: {}
        }
    },
    methods: {
        onTap() {
            this.triggerEvent('click');
        }
    }
});
