/**
 * Created by sbawkar on 10/4/2015.
 */
class BaseEngineController {
	constructor($log, engineModel) {
		this.$log = $log;
		this.engineModel = engineModel;
	}

	showEngineState() {
		let questionNo = this.engineModel.getCurrentQuestionIndex();
		let engine = this.engineModel.shellModel.getEngine();
		this.$state.go(`shell.${engine}`, {questionNo: questionNo});
	}

	showNextState() {
		let engine = this.engineModel.shellModel.getEngine();
		if(this.engineModel.isEndOfQuestionList()) {
			this.$state.go(`shell.${engine}_result`);
		} else {
			let questionNo = this.engineModel.getNextQuestionIndex();
			this.$state.go(`shell.${engine}`, {questionNo: questionNo});
		}
	}

	gotoIntroState() {
		let engine = this.engineModel.shellModel.getEngine();
		if(this.$state.is(`shell.${engine}_intro`)) {
			return;
		}
		let document = this.engineModel.shellModel.getDocument();
		this.engineModel.resetData();
		this.$state.go(`shell.${engine}_intro`, {document: document});
	}

	gotoQuitPage() {
		this.$state.go(`shell.quit`);
	}
}
export { BaseEngineController };
