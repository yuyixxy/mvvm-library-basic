export class Watcher {
    private sf;
    // 构造函数中传入一个sf对象，便于确定callback调用时的作用域
    constructor(sf) {
        this.sf = sf;
    }
    /**
     * 监听viewModel数据的更改，执行相应的回调函数
     * 
     * @param {any} viewModel 
     * @param {any} callback 
     * @memberof Watcher
     */
    public observe(viewModel, callback) {
        let host = this.sf;
        for (let key in viewModel) {
            let defaultValue = viewModel[key];
            (function (key, defaultValue) {
                if (key !== '_alias') {
                    Object.defineProperty(viewModel, key, {
                        get: function () {
                            return defaultValue;
                        },
                        set: function (value) {
                            defaultValue = value;
                            console.log('do something after set a new value, the new value is:', value);
                            callback.call(host, viewModel, key);
                        }
                    });
                }
            })(key, defaultValue);
        }
    }
}