/**
 * Created by sbawkar on 10/3/2015.
 */
require('./result-view.html');

const animationSpeed = 1;
class ResultViewDirective {
	constructor($log, $document, $window, $timeout) {
		this.restrict = 'E';
		this.replace = true;
		this.scope = {
			resultData: '=',
			tryAgainClicked: '&onTryAgain',
			quitClicked: '&onQuit'
		};
		this.templateUrl = 'result-view.html';
		this.$document = $document;
		this.$window = $window;
		this.$timeout = $timeout;
		this.$log = $log;
		this.link = (scope, element) => {
			scope.showAnswer = false;
			scope.hideContainer = 'hide-container';
			this.linkFunction(scope, element);
		};
	}

	linkFunction(scope, element) {
		this.element = element;
		this.scope = scope;

		this.pageW = this.$window.innerWidth;
		this.pageH = this.$window.innerHeight;

		this.showResultAnimation();
		scope.showAnswerClicked = () => {
			this.showAnswerClicked();
		};
	}

	showResultAnimation() {
		let resultViewDirective = this;
		const $circle = this.$document[0].querySelector('.circle');
		const $highScore = this.$document[0].querySelector('.high-score-message');
		const $award = this.$document[0].querySelector('.award');
		const $score = this.$document[0].querySelector('.score');
		const $scoreArea = this.$document[0].querySelector('.score-area');
		const $pageContent = this.$document[0].querySelector('.score-region');

		const animate = new TimelineMax();
		const pageMax = Math.max(this.pageW, this.pageH);
		const circleSize = pageMax * 1.41;
		const circleLeft = (this.pageW - circleSize) / 2;
		const circleTop = (this.pageH - circleSize) / 2;
		const circleFofW = this.pageW / circleSize;
		const existCircleSize = $circle.clientWidth;
		const shrinkCircle = (circleSize - existCircleSize) / 2;
		const animateEls = {
			$resultsCircle: this.$document[0].querySelector('.resultsCircle'),
			$resultsCircleScore: this.$document[0].querySelector('.resultsCircleScore')
		};

		const scoreZero = {
			score: 0
		};
		let showMainContainer = () => {
			resultViewDirective.scope.hideContainer = 'none';
		};
		let destroyTransitionCircle = () => {
			animateEls.$resultsCircle.remove();
		};

		let updateScore = () => {
			resultViewDirective.$document[0].querySelector('.high-score-span').innerHTML = scoreZero.score;
		};
		function addAwardClass() {
			resultViewDirective.$document[0].querySelector('.high-score-span').style.color = resultViewDirective.scope.resultData.activityScoreRank.fillColor;
		}
		animate
			.timeScale(animationSpeed)
			.set(animateEls.$resultsCircle, {
				width: circleSize,
				height: circleSize,
				transformOrigin: 'center center',
				scale: circleFofW,
				top: circleTop,
				left: circleLeft,
				yPercent: 50
			})
			.set($highScore, {
				opacity: 0,
				scale: 0
			})
			.set($award, {
				opacity: 0,
				scale: 0,
				yPercent: '-400',
				transformOrigin: 'center center'
			})
			.set($score, {
				opacity: 0,
				fontSize: '20vw'
			})
			.to(animateEls.$resultsCircle, 1, {
				transformOrigin: 'center center',
				yPercent: 0
			})
			.to(animateEls.$resultsCircle, 0.5, {
				transformOrigin: 'center center',
				scale: 1,
				onComplete: showMainContainer
			}, 0.1)
			.set($circle, {
				boxShadow: '0 0 0 ' + shrinkCircle + 'px #fff'
			})
			.set($scoreArea, {
				overflow: 'visible'
			})
			.set($pageContent, {
				overflow: 'visible'
			})
			.set(animateEls.$resultsCircle, {
				opacity: 0,
				onComplete: destroyTransitionCircle
			})
			.to($score, 0.25, {
				opacity: 1
			})
			.to(scoreZero, 1, {
				score: this.scope.resultData.highScore,
				roundProps: 'score',
				onUpdate: updateScore
			})
			.to($award, 0.7, {
				ease: Elastic.easeOut,
				opacity: 1,
				scale: 1,
				yPercent: '-40'
			}, '=+0.2')
			.to($score, 0.5, {
				color: this.scope.resultData.activityScoreRank.fillColor,
				onComplete: addAwardClass
			}, '=-0.4')
			.to($circle, 0.5, {
				boxShadow: '0 0 0 0px #fff'
			}, 'shrinky =+0.5')
			.to($score, 0.5, {
				fontSize: '4rem'
			}, 'shrinky =+0.5')
			.to($award, 0.5, {
				yPercent: 0
			}, 'shrinky =+0.5')
			.to($highScore, 0.5, {
				scale: 1,
				opacity: 1
			}, '=+0.15')
			.set($circle, {
				clearProps: 'all'
			})
			.set($highScore, {
				clearProps: 'all'
			})
			.set($award, {
				clearProps: 'all'
			})
			.set($score, {
				clearProps: 'all'
			})
			.set($scoreArea, {
				clearProps: 'all'
			})
			.set($pageContent, {
				clearProps: 'all'
			});
	}

	showAnswerClicked() {
		let $circle = this.$document[0].querySelector('.circle'),
			$highScore = this.$document[0].querySelector('.high-score-message'),
			$AnswersArea = this.$document[0].querySelector('.show-answers-area'),
			$answerCards = this.element.find('md-list-item'),
			$award = this.$document[0].querySelector('.award'),
			$scoreArea = this.$document[0].querySelector('.score-area'),
			$AnswersBtn = this.$document[0].querySelector('.show-answers-area'),
			$answerMark = this.element.find('md-icon');

		const theAnimation = new TimelineMax();
		const positions = {
			hsmPos: $highScore.getBoundingClientRect(),
			hsmH: $highScore.clientHeight,
			pageW: this.pageW
		};
		theAnimation
			.timeScale(animationSpeed)
			.set($circle, {
				boxShadow: '0 0 0 0 #fff',
				marginBottom: positions.hsmH / 2
			})
			.set($highScore, {
				position: 'absolute',
				top: positions.hsmPos.top,
				left: positions.hsmPos.left
			})
			.set($award, {
				order: 1,
				marginLeft: '16px'
			})
			.set($answerCards, {
				opacity: 0,
				yPercent: '250%',
				scale: 0
			})
			.to($AnswersArea, 0.6, {
				flexGrow: 1,
				'-webkit-flex-grow': 1
			}, 'start')
			.to($scoreArea, 0.6, {
				flexGrow: 0,
				'-webkit-flex-grow': 0,
				flexShrink: 0,
				'-webkit-flex-shrink': 0
			}, 'start')
			.to($highScore, 0.4, {
				scale: 0,
				opacity: 0
			}, 'start')
			.to($AnswersBtn, 0.6, {
				opacity: 0,
				height: 0,
				padding: 0
			}, 'start')
			.to($circle, 0.5, {
				boxShadow: '0 0 0 ' + positions.pageW / 2 + 'px #fff'
			}, 'start')
			.to($circle, 0.6, {
				flexDirection: 'row'
			}, 'start')
			.to($circle, 0.6, {
				height: 'auto',
				marginBottom: 0,
				paddingBottom: '8px'
			}, 'start')
			.staggerTo($answerCards, 0.25, {
				opacity: 1,
				scale: 1,
				yPercent: '0',
			}, 0.15, 'show')
			.staggerFrom($answerMark, 0.75, {
				scale: 0
			}, 0.15, 'show')
			.set($circle, {
				clearProps: 'all'
			})
			.set($highScore, {
				clearProps: 'all'
			})
			.set($award, {
				clearProps: 'all'
			})
			.set($answerCards, {
				clearProps: 'all'
			})
			.set($AnswersArea, {
				clearProps: 'all'
			})
			.set($scoreArea, {
				clearProps: 'all'
			})
			.set($AnswersBtn, {
				clearProps: 'all'
			})
			.set($answerMark, {
				clearProps: 'all'
			});
		this.$timeout(() => {
			this.scope.showAnswer = true;
		}, 500);
	}

	static directiveFactory($log, $document, $window, $timeout){
		ResultViewDirective.instance =new ResultViewDirective($log, $document, $window, $timeout);
		return ResultViewDirective.instance;
	}
}

ResultViewDirective.directiveFactory.$inject = ['$log', '$document', '$window', '$timeout'];
export { ResultViewDirective };