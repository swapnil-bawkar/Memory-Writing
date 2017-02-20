require('./quit-page-view.html');

let QuitPageController = ($scope, $state, ShellModel) => {
	let engineName = ShellModel.getEngine();
	$scope.gotoResultPage = () => $state.go(`shell.${engineName}_result`);
};

QuitPageController.$inject = ['$scope','$state', 'ShellModel'];

let QuitPageViewDirective = () => {
	return {
		restrict: 'E',
		templateUrl: 'quit-page-view.html',
		replace: true,
		controller: QuitPageController
	};
};

export { QuitPageViewDirective };
