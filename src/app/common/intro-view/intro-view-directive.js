/**
 * Created by sbawkar on 10/3/2015.
 */
require('./intro-view.html');

let IntroViewDirective = () => {
	return {
		restrict: 'E',
		templateUrl: 'intro-view.html'
	};
};

export { IntroViewDirective };
