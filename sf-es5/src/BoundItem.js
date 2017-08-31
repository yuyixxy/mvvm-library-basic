function BoundItem (viewModel, element, expression, attributeName) {
    this.viewModel = view;
    this.element = element;
    this.expression = expression;
    this.attributeName = attributeName;
    this.interactiveDomConfig = {
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
    };
    this.addListener(this.element, this.expression);
}
BoundItem.prototype.addListener = function (element, expression) {

};