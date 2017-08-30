import SegmentFault from './SegmentFault';

const segmentFault = new SegmentFault();
segmentFault.registerViewModel('vm', new ViewModel());
segmentFault.init();

// 定义 viewModel
function ViewModel() {
    this.message = 'Hello, SegmentFalut';
}