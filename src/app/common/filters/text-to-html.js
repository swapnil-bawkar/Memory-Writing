/**
 * Created by sbawkar on 10/13/2015.
 */

let TextToHtml = () => {
	return function(input) {
		return input ? angular.element('<div/>').html(input).text() : '';
	};
};

export { TextToHtml };