import { Scanner } from './Scanner';
import { Watcher } from './Watcher';
import { Renderer } from './Renderer';

export default class SegmentFault {
    private viewModelPool = {};
    private viewViewModelMap = {};
    private renderer = new Renderer();
    // 先注册viewModel
    public registerViewModel(alias: string, viewModel: object) {
        viewModel['_alias'] = alias;
        window[alias] = this.viewModelPool[alias] = viewModel;
    }
    // 注册viewModel之后，在调用init方法
    public init() {
        let scanner = new Scanner(this.viewModelPool);
        let watcher = new Watcher(this);
        // step 1: 暗中观察各个viewModel
        for (var key in this.viewModelPool) {
            watcher.observe(this.viewModelPool[key], this.viewModelChangedHandler);
        }
        // step 2 3: 扫描DOM Tree并返回Map
        this.viewViewModelMap = scanner.scanBindDOM();
        // step 4: 渲染DOM
        Object.keys(this.viewViewModelMap).forEach(alias => {
            this.refresh(alias);
        });
    }
    public refresh(alias: string) {
        let boundItems = this.viewViewModelMap[alias];
        boundItems.forEach(boundItem => {
            this.renderer.render(boundItem);
        });
    }
    private viewModelChangedHandler(viewModel, pool) {
        this.refresh(viewModel._alias);
    }
}