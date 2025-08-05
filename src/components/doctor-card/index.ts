import baseComponent from '@base/baseComponent';

baseComponent({
    properties: {
        avatar: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: ''
        },
        workage: {
            type: String,
            default: ''
        }
    },
    methods: {
        onTap() {
            this.triggerEvent('click');
        }
    }
});
