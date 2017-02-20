require('./score-bar-view.html');

let ScoreBarDirective = () => {
	return {
		restrict: 'E',
		templateUrl: 'score-bar-view.html',

		link: function(scope, element) {
			let totalWidth = element.children('.score-bar-container')[0].clientWidth;
			let numberOfQuestions = scope.vm.introData.questions.question.length ;
			let progressWidth = totalWidth / numberOfQuestions;
			let leftOffset = progressWidth / 2;
			scope.left = leftOffset  + (scope.vm.introData.currentQuestionIndex * progressWidth) + 'px';
		}
	};
};
export { ScoreBarDirective };
