import { BoundItem } from './BoundItem';

export class Renderer {
    /**
     * 渲染DOM
     * 
     * @param {any} boundItem 
     * @memberof Renderer
     */
    render(boundItem) {
        let value = this._getValue(boundItem.viewModel, boundItem.expression);
        let attribute = boundItem.attributeName.split('-')[1];
        if (attribute.toLowerCase() === 'bind') {
            attribute = 'innerText';
        }
        boundItem.element[attribute] = value;
    }
    /**
     * 获取修改后的值
     * 
     * @param {object} viewModel 
     * @param {string} expression 
     * @returns 
     * @memberof Renderer
     */
    _getValue(viewModel, expression) {
        return (function () {
            const alias = viewModel._alias;
            let tempScope = {};
            tempScope[alias] = viewModel;
            try {
                var pattern = new RegExp('\\b' + alias + '\\b', 'gm');
                expression = expression.replace(pattern, 'tempScope.' + alias);
                let result = eval(expression);
                tempScope = null;
                return result;
            } catch (error) {
                throw error;
            }
        })();
    }
}