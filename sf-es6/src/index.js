import SegmentFault from './SegmentFault';

const segmentFault = new SegmentFault();
segmentFault.registerViewModel('vm', new ViewModel());
// segmentFault.registerViewModel('vm', {
//     message: 'hello, SegmentFault',
//     clickHandler: function () {
//         this.message = 'clicked:' + this.message;
//     }
// });
segmentFault.init();

// 定义 viewModel
function ViewModel() {
    this.message = 'Hello, SegmentFalut';
}