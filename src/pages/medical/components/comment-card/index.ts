import baseComponent from '@base/baseComponent';

baseComponent({
    properties: {
        user: {
            type: Object,
            value: {}
        },
        star: {
            type: Number,
            value: 0
        },
        date: {
            type: String,
            value: ''
        },
        imgs: {
            type: Array,
            value: []
        },
        content: {
            type: String,
            value: ''
        }
    },
    methods: {}
});
