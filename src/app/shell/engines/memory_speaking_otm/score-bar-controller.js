let vm = null;
class ScoreBarController {
	constructor(MemorySpeakingModel) {
		vm = this;
		vm.imageDone = false;
		vm.introData = MemorySpeakingModel.getMemorySpeakingModel();
	}
}
ScoreBarController.$inject = ['MemorySpeakingModel'];
export { ScoreBarController };