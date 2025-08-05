import { IAnyObject } from '@typings';

class GlobalStore {
    store: IAnyObject = {};
    /**
     * 用来设置全局的 store
     * @param {string} key - store 的 key
     * @param {any} value - store 里对应 key 的 value
     */
    set(key: string, value: any) {
        this.store[key] = value;
    }
    /**
     * 获取存储 key 的内容
     * @param {string} key 字段名
     */
    get(key: string) {
        return this.store[key]; 
    }
    /**
     * 清除数据存储 key 的内容
     * @param {string} key 字段名
     */
    clear(key: string) {
        if (this.store[key]) {
            this.store[key] = null;
        }
    }
    /**
     * 如果某一个 store 需要以数组的形式存储就用 push
     * @param {string} key - store 的 key
     * @param {any} value - 当前需要添加的 value
     */
    push(key: string, value: any) {
        this.store[key] = this.store[key] || [];
        this.store[key].push(value);
    }
}
const globalStore = new GlobalStore();
export default globalStore;
