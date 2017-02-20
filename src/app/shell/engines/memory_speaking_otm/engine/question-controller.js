import { BaseEngineController } from '../../base-engine-controller';

let vm = null;
class QuestionController extends BaseEngineController {
	constructor($log, MemorySpeakingModel, $stateParams, $state) {
		super($log, MemorySpeakingModel);
		this.memorySpeakingModel = MemorySpeakingModel;
		this.$state = $state;
		this.$log = $log;
		vm = this;
		let questionNo = parseInt($stateParams.questionNo);
		this.initialize(questionNo, MemorySpeakingModel);
	}

	initialize(questionNo, MemorySpeakingModel) {
		vm.question = MemorySpeakingModel.getQuestionByIndex(questionNo);
		if(vm.question.Audio){
			vm.question.audioPlayObject = new Audio(vm.question.Audio);
		}
		vm.userAnswerArray = [];
		vm.correctListClass = 'correct-list';
		vm.question.userAnswer = [];
		vm.question.checkBtnClicked = false;
		vm.listContainerMargin = vm.question.Image ? {'margin-top': '-25px'} : {'margin-top': '0'};
		if (this.engineModel.isEndOfQuestionList()) {
			vm.cardContentAnimationClass = 'none';
		} else {
			vm.cardContentAnimationClass = 'card-content-animation';
		}
	}

	checkAudioOrTextContent() {
		return vm.question.Audio || vm.question.text;
	}

	nextBtnClicked() {
		if (vm.question.Audio && vm.question.audioPlayObject) {
			vm.question.audioPlayObject.pause();
		}
		this.showNextState();
	}

	onCharClicked(char, index) {
		if(char.opacity !== 0.2 && vm.userAnswerArray.length < vm.question.answer.length) {
			char.opacity = 0.2;
			vm.userAnswerArray.push(char);
		}
	}

	onBackBtnClicked() {
		if(vm.userAnswerArray.length > 0) {
			let char = vm.userAnswerArray.pop();
			char.opacity = 1;
		}
	}

	checkBtnClicked() {
		if (vm.userAnswerArray.length === 0) {
			return;
		}
		vm.question.userAnswer = vm.userAnswerArray.map((array) => array.text).join('');
		vm.question.checkBtnClicked = true;
		vm.question.correct = false;
		if (vm.question.userAnswer.toLocaleLowerCase() === vm.question.answer.toLocaleLowerCase()) {
			vm.question.correct = true;
			vm.question.feedback = 'Well Done!';
			this.memorySpeakingModel.incrementScoreCount();
			vm.feedBackAnimation = 'feedback-animation-correct';
			vm.feedbackClass = 'correct-answer';
		}else {
			vm.feedBackAnimation = 'feedback-animation-in-correct';
			vm.feedbackClass = 'in-correct-answer';
		}
	}

}
QuestionController.$inject = ['$log', 'MemorySpeakingModel', '$stateParams', '$state'];
export { QuestionController };
