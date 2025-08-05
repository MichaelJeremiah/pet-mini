import baseComponent from '@base/baseComponent';

baseComponent({
    properties: {
        img: {
            type: String,
            value: ''
        },
        name: {
            type: String,
            value: ''
        },
        star: {
            type: Number,
            value: 0
        },
        address: {
            type: String,
            value: ''
        },
        distance: {
            type: String,
            value: 0
        }
    },
    methods: {
        onTap() {
            this.triggerEvent('click');
        }
    }
});
