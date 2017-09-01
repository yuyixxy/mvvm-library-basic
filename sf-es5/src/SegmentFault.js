var Scanner = require('./Scanner');
var Watcher = require('./Watcher');
var Renderer = require('./Renderer');

function SegmentFault () {
    this.viewModelPool = {};
    this.viewViewModelMap = {};
    this.renderer = new Renderer();
}
/**
 * 注册viewModel
 * 
 * @param {string} alias
 * @param {object} viewModel
 * @returns 
 */
SegmentFault.prototype.registerViewModel = function (alias, viewModel) {
    viewModel._alias = alias;
    window[alias] = this.viewModelPool[alias] = viewModel;
};
/**
 * 初始化
 * 
 */
SegmentFault.prototype.init = function () {
    var self = this;
    var scanner = new Scanner(this.viewModelPool);
    var watcher = new Watcher(this);
    // step 1: watch 各个 viewModel
    for (var key in this.viewModelPool) {
        watcher.observe(this.viewModelPool[key], this._viewModelChangedHandler);
    }
    // step 2 3: 扫描DOM Tree并返回Map
    this.viewViewModelMap = scanner.scanBindDOM();
    // step 4: 渲染DOM
    Object.keys(this.viewViewModelMap).forEach(function (alias) {
        self._refresh(alias);
    });
};
/**
 * 刷新DOM
 * 
 * @param {string} alias  刷新的viewModel 简称(vm)
 * @returns 
 */
SegmentFault.prototype._refresh = function (alias) {
    var self = this;
    var boundItems = this.viewViewModelMap[alias];
    boundItems.forEach(function (boundItem) {
        self.renderer.render(boundItem);
    });
};
/**
 * 注册viewModel
 * 
 * @param {object} viewModel
 * @param {string} pool
 * @returns 
 */
SegmentFault.prototype._viewModelChangedHandler = function (viewModel, pool) {
    this._refresh(viewModel._alias);
};

module.exports = SegmentFault;