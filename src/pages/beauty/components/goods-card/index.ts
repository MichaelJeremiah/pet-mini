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
        desc: {
            type: String,
            value: ''
        },
        price: {
            type: String,
            value: ''
        }
    },
    methods: {
        onTap() {
            this.triggerEvent('click');
        }
    }
});
