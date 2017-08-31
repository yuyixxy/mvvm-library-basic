var SegmentFault = require('./SegmentFault');

var segmentFault = new SegmentFault();
segmentFault.registerViewModel('vm', {
    message: 'hello, SegmentFault.',
    clickHandler: function () {
        this.message = 'clicked: ' + this.message;
    }
});
segmentFault.init();