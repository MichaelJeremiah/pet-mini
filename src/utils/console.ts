import globalStore from '@modules/globalStore';

const debugConsole = false;

if (debugConsole) {
    console.log = (function(oriLogFunc) {
        return function(...args: any[]) {
            globalStore.push('console', {
                type: 'log',
                value: args
            });
            oriLogFunc.call(console, ...args);
        };
    })(console.log);

    console.error = (function(oriErrorFunc) {
        return function(...args: any[]) {
            globalStore.push('console', {
                type: 'error',
                value: args
            });
            oriErrorFunc.call(console, ...args);
        };
    })(console.error);


    console.warn = (function(oriWarnFunc) {
        return function(...args: any[]) {
            globalStore.push('console', {
                type: 'warn',
                value: args
            });
            oriWarnFunc.call(console, ...args);
        };
    })(console.warn);
}
