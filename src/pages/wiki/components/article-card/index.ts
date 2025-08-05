import baseComponent from '@base/baseComponent';

baseComponent({
    properties: {
        img: {
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
