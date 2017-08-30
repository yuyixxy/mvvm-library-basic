import { BoundItem } from './BoundIttem';

export class Scanner {
    private prefix = 'sf-'; // 库的前缀
    private viewModelPool;
    constructor(viewModelPool) {
        this.viewModelPool = viewModelPool;
    }
    /**
     * 找出attribute中带`sf-`，且等号右边表达式中含有viewModel的alias的Element，并返回一个view与viewModel的map
     * 
     * @returns {object} 
     * @memberof Scanner
     */
    public scanBindDOM(): object {
        let boundMap = {};
        let boundElements = this.getAllBoundElement(this.prefix);
        boundElements.forEach(element => {
            for (let i = 0; i < element.attributes.length; i++) {
                let attr = element.attributes[i];
                let attributeName = attr.nodeName; // attr.name 属性名称
                if (attributeName.search(this.prefix) > -1) {
                    let expression = element.getAttribute(attributeName); // 带有`sf-`前缀属性的属性值
                    for (let alias in this.viewModelPool) {
                        if (expression.search(alias + '.') !== -1) {
                            let boundItem = new BoundItem(this.viewModelPool[alias], element, expression, attributeName);
                            if (!boundMap[alias]) {
                                boundMap[alias] = [boundItem];
                            } else {
                                boundMap[alias].push(boundItem);
                            }
                        }
                    }
                }
            }
        });
        return boundMap;
    }
    /**
     * 判断某一HTMLElement是否包含前缀`sf-`
     * 
     * @private
     * @param {HTMLElement} HTMLElement 
     * @param {string} 前缀`sf-` 
     * @returns {HTMLElement} 
     * @memberof Scanner
     */
    private fuzzyFind(element: HTMLElement, text: string): HTMLElement {
        if (element && element.attributes) {
            for (let i = 0; i < element.attributes.length; i++) {
                let attr = element.attributes[i];
                // attr.nodeName 获取元素的属性名称，在DOM4中不能用，为了未来代码安全，应改为 attr.name
                if (attr.nodeName.search(text) > -1) {
                    return element;
                }
            }
        }
        return null;
    }
    /**
     * 获取所有绑定了库的前缀`sf-`的元素
     * 
     * @private
     * @param {string} prefix 
     * @returns {Array<HTMLElement>} 
     * @memberof Scanner
     */
    private getAllBoundElement(prefix): Array<HTMLElement> {
        let elements = [];
        let allChildren = document.querySelectorAll('*');
        for (let i = 0; i < allChildren.length; i++) {
            let child: HTMLElement = allChildren[i] as HTMLElement;
            let matchElement = this.fuzzyFind(child, prefix);
            if (matchElement) {
                elements.push(matchElement);
            }
        }
        return elements;
    }
}