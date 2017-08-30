import { BoundItem } from './BoundItem';

export class Scanner {
    constructor(viewModelPool) {
        this.prefix = 'sf-';
        this.viewModelPool = viewModelPool;
    }
    /**
     * 找出attribute中带`sf-`，且等号右边表达式中含有viewModel的alias的Element，并返回一个view与viewModel的map
     * 
     * @returns 
     * @memberof Scanner
     */
    scanBindDOM() {
        let boundMap = {};
        let boundElements = this._getAllBoundElement(this.prefix);
        boundElements.forEach(element => {
            for (let i = 0; i < element.attributes.length; i++) {
                let attribute = element.attributes[i];
                let attributeName = attribute.name;
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
        });
        return boundMap;
    }
    /**
     * 判断某一HTMLElement是否包含前缀`sf-`
     * 
     * @param {HTMLElement} element 
     * @param {string} 前缀`sf-` 
     * @returns 
     * @memberof Scanner
     */
    _fuzzyFind(element, prefix) {
        if (element && element.attributes) {
            for (let i = 0; i < element.attributes.length; i++) {
                let attribute = element.attributes[i]
                if (attribute.name.search(prefix) > -1) {
                    return element;
                }
            }
        }
        return null;
    }
    /**
     * 获取所有绑定了库的前缀`sf-`的元素
     * 
     * @param {string} prefix 
     * @returns 
     * @memberof Scanner
     */
    _getAllBoundElement(prefix) {
        let elements = [];
        let allChildren = document.querySelectorAll('*');
        for (let i = 0; i < allChildren.length; i++) {
            let child = allChildren[i];
            let matchElement = this._fuzzyFind(child, prefix);
            if (matchElement) {
                elements.push(matchElement);
            }
        }
        return elements;
    }
}