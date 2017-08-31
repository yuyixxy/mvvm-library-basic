export class BoundItem {
    public viewModel: object;
    public element: Element;
    public expression: string;
    public attributeName: string;
    private interactiveDomConfig = {
        'INPUT': {
            'text': 'input',
            'password': 'input',
            'email': 'input',
            'url': 'input',
            'tel': 'input',
            'radio': 'change',
            'checkbox': 'change',
            'number': 'change',
            'range': 'change',
            'search': 'change',
            'color': 'change',
            'date': 'change',
            'month': 'change',
            'week': 'change',
            'time': 'change',
            'datetime': 'change',
            'datetime-local': 'change',
            'button': 'N/A',
            'submit': 'N/A'
        },
        'SELECT': 'change',
        'TEXTAREA': 'change'
    }
    constructor(viewModel: object, element: Element, expression: string, attributeName: string) {
        this.viewModel = viewModel;
        this.element = element;
        this.expression = expression;
        this.attributeName = attributeName;
        this.addListener(this.element, this.expression);
    }
    /**
     * 给元素绑定事件
     * 
     * @private
     * @param {any} element 
     * @param {any} expression 
     * @returns 
     * @memberof BoundItem
     */
    private addListener(element, expression) {
        let tagName = element.tagName; // 元素标签名称，大写
        let eventName = this.interactiveDomConfig[tagName];
        if (!eventName) {
            return;
        }
        if (typeof eventName === 'object') {
            let type = element.getAttribute('type');
            eventName = eventName[type];
        }
        element.addEventListener(eventName, (evt) => {
            let newValue = (element as HTMLInputElement).value;
            let cmd = expression + '=\'' + newValue + '\''; // 对 expression 表示的变量重新赋值，例如：cmd = "vm.message= 'hello, SegmentFaulta'"
            try {
                // 执行脚本语句，将触发 viewModel 中相应的 set 方法
                eval(cmd);
            } catch (error) {
                console.error(error);
            }
        });
    }
}