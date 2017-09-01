var BoundItem = require('./BoundItem');

function Scanner (viewModelPool) {
    this.prefix = 'sf-';
    this.viewModelPool = viewModelPool;
}
/**
 * 找出attribute中带`sf-`，且等号右边表达式中含有viewModel的alias的Element，并返回一个view与viewModel的map
 * 
 * @returns 
 */
Scanner.prototype.scanBindDOM = function () {
    var boundMap = [];
    var boundElements = this._getAllBoundElement(this.prefix);
    boundElements.forEach(element => {
        for (var i = 0; i < element.attributes.length; i++) {
            var attribute = element.attributes[i];
            var attributeName = attribute.name;
            var expression = element.getAttribute(attributeName); // 带有`sf-`前缀属性的属性值
            for (var alias in this.viewModelPool) {
                // 判断是否绑定 viewModel
                if (expression.search(alias + '.') !== -1) {
                    var boundItem = new BoundItem(this.viewModelPool[alias], element, expression, attributeName);
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
};
/**
 * 判断某一HTMLElement是否包含前缀`sf-`
 * 
 * @param {HTMLElement} element 
 * @param {string} 前缀`sf-` 
 * @returns 
 */
Scanner.prototype._fuzzyFind = function (element, prefix) {
    if (element && element.attributes) {
        for (var i = 0; i < element.attributes.length; i++) {
            var attribute = element.attributes[i];
            if (attribute.name.search(prefix) > -1) {
                return element;
            }
        }
    }
    return null;
};
/**
 * 获取所有绑定了前缀`sf-`的元素
 * 
 * @param {string} prefix 
 * @returns 
 */
Scanner.prototype._getAllBoundElement = function (prefix) {
    var elements = [];
    var allChildren = document.querySelectorAll('*');
    for (var i = 0; i < allChildren.length; i++) {
        var child = allChildren[i];
        var matchElement = this._fuzzyFind(child, prefix);
        if (matchElement) {
            elements.push(matchElement);
        }
    }
    return elements;
};

module.exports = Scanner;