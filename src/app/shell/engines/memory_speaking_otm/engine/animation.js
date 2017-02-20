/**
 * Created by sbawkar on 11/30/2015.
 */
const UserAnswerAnimation = () => {
	return {
		enter(element, done) {
			var tl = new TimelineLite({
				onComplete: done
			});
			tl.timeScale(1);
			tl.from(element, 0.4, {
				opacity: 0,
				scale: 0,
				ease: Elastic.easeOut
			}, 'start')
			.from(element, 1.2, {background: 'rgba(255, 196, 0, 1)'}, 'start');
		},
		leave(element, done) {
			var $placeholder = '<span class=\'placeholder\'></span>';
			element[0].insertAdjacentHTML('beforebegin', $placeholder);
			$placeholder = element[0].parentNode.querySelectorAll('.placeholder');
			var oldPlace = {};
			oldPlace.width = element[0].offsetWidth;
			oldPlace.height = element[0].offsetHeight;
			oldPlace.top = element[0].offsetTop;
			oldPlace.left = element[0].offsetLeft;
			var tl = new TimelineLite({
				onComplete: done
			});
			tl.timeScale(1);
			tl.set($placeholder, {
				display: 'block',
				float: 'left',
				width: oldPlace.width,
				height: oldPlace.height
			})
			.set(element, {
				position: 'absolute',
				left: oldPlace.left,
				top: oldPlace.top,
				margin: 0
			}, 'start')
			.to(element, 0.20, {
				opacity: 0,
				scale: 1.4
			})
			.to($placeholder, 0.20, {
				width: 0,
				onComplete: function () {
					$placeholder[0].parentNode.removeChild($placeholder[0]);
				}
			}, '=-0.1');
		}
	};
};

const FeedBackAnimation = (element, className, done, markColor,SentenceScrambleModel) => {
	let tl = new TimelineMax({
		onComplete: done
	});
	tl.timeScale(1);

	let $feedbackCard = element[0].querySelectorAll('.feedback-container');
	let $answerCard = element[0].querySelectorAll('.wrap-container');
	let $wordOptionsContainer = element[0].querySelectorAll('.user-answer-option-container');
	let $userWords = element[0].querySelectorAll('.user-answer-container');
	let $feedbackContainer = element[0].querySelectorAll('.feedback-container');
	let flexGrowValue = 6;

	if(SentenceScrambleModel.shellModel.isIOS()){
		flexGrowValue = 4;
	}

	tl
		.set($feedbackCard, {clearProps: 'all'})
		.set($wordOptionsContainer, {clearProps: 'all'})
		.set($feedbackCard, {height: 'auto', overflow: 'auto', scale: 0.8})
		.set($wordOptionsContainer, {display: 'none'})
		.to($answerCard, 0.3, {
			flexGrow: 0,
			'-webkit-flex-grow': 0,
			backgroundColor: markColor,
			color: 'rgb(255,255,255)',
			paddingTop: '8px'
		}, 'start')
		.to($userWords[0].children, 0.3, {marginTop: 0}, 'start')
		.to($feedbackContainer, 0.3, {flexGrow: flexGrowValue, '-webkit-flex-grow': flexGrowValue, paddingTop: '16px'}, 'start')
		.to($feedbackCard, 0.4, {ease: Elastic.easeOut, opacity: 1, scale: 1});
};

const FeedBackCorrectAnimation = (SentenceScrambleModel) => {
	return {
		addClass(element, className, done) {
			FeedBackAnimation(element, className, done, '#93C70A',SentenceScrambleModel);
		}
	};
};

FeedBackCorrectAnimation.$inject = ['SentenceScrambleModel'];

const FeedBackInCorrectAnimation = (SentenceScrambleModel) => {
	return {
		addClass(element, className, done) {
			FeedBackAnimation(element, className, done, '#D63400',SentenceScrambleModel);
		}
	};
};

FeedBackInCorrectAnimation.$inject = ['SentenceScrambleModel'];

export { UserAnswerAnimation, FeedBackCorrectAnimation, FeedBackInCorrectAnimation };