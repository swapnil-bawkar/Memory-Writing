import { BaseEngineController } from '../base-engine-controller';

let vm = null;
class MemorySpeakingController extends BaseEngineController{
	constructor($log, memorySpeakingModel, $state, LoadMedia) {
		super($log, memorySpeakingModel);
		this.$state = $state;
		this.memorySpeakingModel = memorySpeakingModel;
		vm = this;
		vm.imageDone = false;
		vm.introData = memorySpeakingModel.getMemorySpeakingModel();
		let imageFiles = memorySpeakingModel.getAllImages();
		let loadImagePromise = LoadMedia.loadImages(imageFiles);
		loadImagePromise.then(() => vm.imageDone = true);
		vm.resultData = memorySpeakingModel.getResultData();
	}

	startBtnClicked() {
		this.showEngineState();
	}

	loadingBarClicked() {
		vm.imageDone = true;
	}

	tryAgainClicked() {
		this.gotoIntroState();
	}

	quitClicked() {
		this.gotoQuitPage();
	}
}

MemorySpeakingController.$inject = ['$log', 'MemorySpeakingModel', '$state', 'LoadMedia'];
export { MemorySpeakingController };
