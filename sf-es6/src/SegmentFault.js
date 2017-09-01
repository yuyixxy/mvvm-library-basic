import { Scanner } from './Scanner';
import { Watcher } from './Watcher';
import { Renderer } from './Renderer';

export default class SegmentFault {
    constructor() {
        this.viewModelPool = {};
        this.viewViewModelMap = {};
        this.renderer = new Renderer();
    }
    registerViewModel(alias, viewModel) {
        viewModel._alias = alias;
        window[alias] = this.viewModelPool[alias] = viewModel;
    }
    init() {
        let scanner = new Scanner(this.viewModelPool);
        let watcher = new Watcher(this);
        // step 1: watch 各个 viewModel
        for (let key in this.viewModelPool) {
            watcher.observe(this.viewModelPool[key], this._viewModelChangedHanlder);
        }
        // step 2 3: 扫描DOM Tree并返回Map
        this.viewViewModelMap = scanner.scanBindDOM();
        // step 4: 渲染DOM
        Object.keys(this.viewViewModelMap).forEach(alias => {
            this._refresh(alias);
        });
    }
    _refresh(alias) {
        let boundItems = this.viewViewModelMap[alias];
        boundItems.forEach(boundItem => {
            this.renderer.render(boundItem);
        });
    }
    _viewModelChangedHanlder(viewModel, popl) {
        this._refresh(viewModel._alias);
    }
}