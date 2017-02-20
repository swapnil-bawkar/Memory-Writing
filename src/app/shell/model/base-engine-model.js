/**
 * Created by sbawkar on 10/3/2015.
 */
class BaseEngineModel {
	constructor($log, $http, $q, ShellModel, $filter) {
		this.$log = $log;
		this.$http = $http;
		this.$q = $q;
		this.shellModel = ShellModel;
		this.$filter = $filter;
	}

	fetchXml() {
		let url = `${this.shellModel.getActivityPath()}
					/${this.shellModel.getEngine()}
					/${this.shellModel.getDocument()}.xml`;
		return this.$http.get(url).then((response) => {
			return response.data;
		});
	}

	getResultData() {
		return {
			engineType: this.getEngineType(),
			activityTitle: this.getActivityTitle(),
			totalQuestions: this.getTotalQuestions(),
			correctQuestionCount: this.getCorrectQuestionCount(),
			questions: this.getResultQuestions(),
			isHighScore: this.isHighScore(),
			activityScoreRank: this.getActivityScoreRank(),
			highScore: this.getHighScore()
		};
	}

	_getScoreRank(percentage) {
		let highScoreRank = {
			rank: '',
			fillColor: '#AAA',
			strokeColor: ''
		};
		if (percentage >= 30 && percentage < 59) {
			highScoreRank.rank = 'bronze';
			highScoreRank.fillColor = 'rgb(189, 137, 95)';
			highScoreRank.strokeColor = 'rgb(189, 137, 95)';
		} else if (percentage >= 60 && percentage < 79) {
			highScoreRank.rank = 'silver';
			highScoreRank.fillColor = 'rgb(214, 211, 211)';
			highScoreRank.strokeColor = 'rgb(214, 211, 211)';
		} else if (percentage >= 80 && percentage <= 99) {
			highScoreRank.rank = 'gold';
			highScoreRank.fillColor = '#fcc419';
			highScoreRank.strokeColor = 'rgb(242,168,0)';
		} else if(percentage === 100) {
			highScoreRank.rank = 'trophy';
		}
		return highScoreRank;
	}

	_checkRandomization(engineContent){
		if(this.getRandomizeQues().toLowerCase() === 'yes'){
			this.shuffleArray(engineContent.questions.question);
		}
		if (typeof this.getRandomizeAns == 'function') {
			if(this.getRandomizeAns().toLowerCase() === 'yes') {
				angular.forEach(engineContent.questions.question, (value) => {
					if (value.answers.answer !== null)
						this.shuffleArray(value.answers.answer);
				});
			}
		}
	}

	shuffleArray(arrayObj) {
		for(var j, x, i = arrayObj.length; i; j = parseInt(Math.random() * i), x = arrayObj[--i], arrayObj[i] = arrayObj[j], arrayObj[j] = x);
		return arrayObj;
	}

	getEngineType() {
		return this.shellModel.getEngine();
	}
	getAllQuestions() {}
	isHighScore() {}
	getHighScore() {}
	getActivityScoreRank() {}
	getActivityTitle() {}
	getTotalQuestions() {}
	getCorrectQuestionCount() {}
	getCurrentQuestionIndex() {}
	getResultQuestions() {}

	isEndOfQuestionList() {}

	getNextQuestionIndex() {}

	getAllImages() {
		return this.getAllQuestions().map((question) => question.Image)
				.filter((image) => {
					if(image) {
						return image;
					}
				});
	}
}

export { BaseEngineModel };