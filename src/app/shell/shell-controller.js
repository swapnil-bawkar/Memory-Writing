/**
 * Created by sbawkar on 10/2/2015.
 */

class ShellController {
	constructor($mdDialog, ShellModel, $state) {
		if (!ShellModel.getEngine() || !ShellModel.getDocument()) {
			this.showAlert($mdDialog);
			return false;
		}
		this.shellModel = ShellModel;
		this.$state = $state;
		this.loadEngine();
	}

	showAlert($mdDialog) {
		let alert = $mdDialog.alert({
			title: 'Attention',
			content: 'This is an example of how easy dialogs can be!',
			ok: 'Close'
		});
		$mdDialog
			.show(alert)
			.finally(function () {
				alert = undefined;
			});
	}

	loadEngine() {
		let engine = this.shellModel.getEngine();
		let document = this.shellModel.getDocument();
		this.$state.go(`shell.${engine}_intro`, {document: document});
	}
}

ShellController.$inject = ['$mdDialog', 'ShellModel', '$state'];
export { ShellController };