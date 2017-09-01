function Watcher (sf) {
    this.sf = sf;
}
/**
 * 监听 viewModel 数据的更改，执行相应的回调函数
 * 
 * @param {any} viewModel 
 * @param {any} callback 
 */
Watcher.prototype.observe = function (viewModel, callback) {
    var host = this.sf;
    for (var key in viewModel) {
        var defaultValue = viewModel[key];
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
};

module.exports = Watcher;