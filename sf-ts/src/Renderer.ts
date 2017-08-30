import { BoundItem } from './BoundIttem';

export class Renderer {
    /**
     * 渲染DOM
     * 
     * @param {BoundItem} boundItem 
     * @memberof Renderer
     */
    public render(boundItem: BoundItem) {
        let value = this.getValue(boundItem.viewModel, boundItem.expression);
        let attribute = boundItem.attributeName.split('-')[1];
        if (attribute.toLowerCase() === 'innertext') {
            attribute = 'innerText';
        }
        boundItem.element[attribute] = value;
    }
    /**
     * 获取修改后的值
     * 
     * @private
     * @param {any} viewModel 
     * @param {any} expression 
     * @returns 
     * @memberof Renderer
     */
    private getValue(viewModel, expression) {
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