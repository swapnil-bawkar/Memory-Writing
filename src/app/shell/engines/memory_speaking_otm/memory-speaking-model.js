import xml2json from '../../../common/jsonxml/xml2json';
import { BaseEngineModel } from '../../model/base-engine-model';

let memorySpeakingOtm = {};
class MemorySpeakingModel extends BaseEngineModel {

	constructor($log, $http, $q, ShellModel) {
		super($log, $http, $q, ShellModel);
	}

	resetData() {
		memorySpeakingOtm.questions = null;
	}

	initData() {
		let memorySpeakingModel = this;
		let score = localStorage.getItem('high-score');
		let currentHighScore = score ? parseInt(score) : 0;
		localStorage.setItem('high-score', currentHighScore);
		return memorySpeakingOtm.questions ? this.$q.when(memorySpeakingOtm).then(() => {
			this._calculateHighScore();
			this._calculateActivityScore();
		}): this.fetchXml().then((xml) => {
			let json = xml2json(xml, '');
			if (json) {
				memorySpeakingOtm = angular.fromJson(json)['memory-speaking'];
				this.removeEmptyQuestion();
				this._checkRandomization(memorySpeakingOtm);
				memorySpeakingOtm.currentQuestionIndex = 0;
				memorySpeakingOtm.scoreCount = 0;
				memorySpeakingOtm.highScore = currentHighScore;
				this._calculateHighScore();
				this._calculateActivityScore();
			}
			memorySpeakingModel.$log.debug(memorySpeakingOtm);
			return memorySpeakingOtm;
		});
	}

	removeEmptyQuestion() {
		var questions = memorySpeakingOtm.questions.question.filter((question) => {
			if(question.answer) {
				let lastChar = question.answer.charAt(question.answer.length - 1);
				if(lastChar === '.' || lastChar === '?' || lastChar === '!') {
					question.answer = question.answer.substr(0, question.answer.length - 1);
				}
			}
			if (question.Audio) {
				question.Audio = `${this.shellModel.getAudioMediaFolderPath()}/${question.Audio}`;
				return question;
			} else if (question.Image) {
				question.Image = `${this.shellModel.getImageMediaFolderPath()}/${question.Image}`;
				return question;
			} else if (question.text) {
				question.characters = question.characters.split(',');
				let chars = question.characters.map((char) => {
					return {
						text: char
					};
				});
				question.characters = this.shuffleArray(chars);
				return question;
			}
		}, this);
		memorySpeakingOtm.questions.question = questions;
	}

	_calculateActivityScore() {
		let percentage = memorySpeakingOtm.scoreCount / this.getTotalQuestions() * 100;
		memorySpeakingOtm.activityScoreRank = this._getScoreRank(percentage);
	}

	_calculateHighScore() {
		let percentage = memorySpeakingOtm.highScore / this.getTotalQuestions() * 100;
		memorySpeakingOtm.highScoreRank = this._getScoreRank(percentage);
	}

	getMemorySpeakingModel() {
		return memorySpeakingOtm;
	}

	getCurrentQuestionIndex() {
		return memorySpeakingOtm.currentQuestionIndex;
	}

	getCurrentQuestion() {
		return memorySpeakingOtm.questions.question[this.getCurrentQuestionIndex()];
	}

	getResultQuestions() {
		return this.getAllQuestions();
	}

	incrementScoreCount() {
		memorySpeakingOtm.scoreCount += 1;
	}

	getNextQuestionIndex() {
		return memorySpeakingOtm.currentQuestionIndex < memorySpeakingOtm.questions.question.length ?
			++memorySpeakingOtm.currentQuestionIndex : memorySpeakingOtm.currentQuestionIndex;
	}

	isEndOfQuestionList() {
		return memorySpeakingOtm.currentQuestionIndex === memorySpeakingOtm.questions.question.length - 1;
	}

	getQuestionByIndex(index) {
		return memorySpeakingOtm.questions.question[index];
	}

	getAllQuestions() {
		return memorySpeakingOtm.questions.question;
	}

	isHighScore() {
		let highScore = false;
		let score = parseInt(localStorage.getItem('high-score'));
		if (score < memorySpeakingOtm.scoreCount) {
			localStorage.setItem('high-score', memorySpeakingOtm.scoreCount);
			memorySpeakingOtm.highScore = memorySpeakingOtm.scoreCount;
			highScore = true;
		}
		return highScore;
	}

	getHighScore() {
		return memorySpeakingOtm.scoreCount;
	}

	getActivityScoreRank() {
		return memorySpeakingOtm.activityScoreRank;
	}

	getActivityTitle() {
		return memorySpeakingOtm.activityTitle;
	}

	getTotalQuestions() {
		return memorySpeakingOtm.questions.question.length;
	}

	getCorrectQuestionCount() {
		let question = this.getAllQuestions().filter((question) => {
			if (question.correct) {
				return question;
			}
		});
		return question.length;
	}

	getRandomizeQues() {
		return memorySpeakingOtm.randomizeQuestions['@value'];
	}
}

MemorySpeakingModel.$inject = ['$log', '$http', '$q', 'ShellModel'];
export { MemorySpeakingModel };
