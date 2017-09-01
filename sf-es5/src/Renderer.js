var BoundItem = require('./BoundItem');

function Renderer () {}
/**
 * 渲染DOM
 * 
 * @param {any} boundItem 
 */
Renderer.prototype.render = function (boundItem) {
    var value = this._getValue(boundItem.viewModel, boundItem.expression);
    var attribute = boundItem.attributeName.split('-')[1];
    if (attribute.toLowerCase() === 'bind') {
        attribute = 'innerText';
    }
    boundItem.element[attribute] = value;
};
/**
 * 获取修改后的值
 * 
 * @param {object} viewModel 
 * @param {string} expression 
 * @returns 
 */
Renderer.prototype._getValue = function (viewModel, expression) {
    var alias = viewModel._alias;
    var tempScope = {};
    var result;
    tempScope[alias] = viewModel;
    try {
        var pattern = new RegExp('\\b' + alias + '\\b', 'gm');
        expression = expression.replace(pattern, 'tempScope.' + alias);
        result = eval(expression);
        tempScope = null;
    } catch (error) {
        throw error;
    }
    return result;
};

module.exports = Renderer;