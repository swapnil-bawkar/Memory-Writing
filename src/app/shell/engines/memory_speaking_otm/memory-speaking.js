import angularSanitize from 'angular-sanitize';
import { MemorySpeakingController } from './memory-speaking-controller';
import { MemorySpeakingModel } from './memory-speaking-model';
import { QuestionController } from './engine/question-controller';
import { ScoreBarController } from './score-bar-controller';


require('./engine/memory-question-view.html');

let MemorySpeakingData = (memorySpeakingModel) => {
	return memorySpeakingModel.initData().then((data) => {
		return data;
	});
};
MemorySpeakingData.$inject = ['MemorySpeakingModel'];

let StateConfig = ($stateProvider) => {

	$stateProvider
		.state('shell.memory_speaking_otm_intro', {
			url: '/memory-speaking_otm_intro',
			template: '<intro-view-directive flex layout="column"></intro-view-directive>',
			controller: 'MemorySpeakingController as vm',
			resolve: {
				sentenceScrambleData: MemorySpeakingData
			}
		})
		.state('shell.memory_speaking_otm', {
			url: '/memory-speaking_otm/:questionNo',
			views: {
				'' : {
					templateUrl: 'memory-question-view.html',
					controller: 'QuestionController as vm'
				},
				'header@' : {
					template: '<score-bar-directive layout-padding></score-bar-directive>',
					controller: 'ScoreBarController as vm'
				}
			}
		})
		.state('shell.memory_speaking_otm_result', {
			url: '/memory_speaking_otm_result',
			views: {
				'' : {
					controller: 'MemorySpeakingController as vm',
					template: '<result-view-directive result-data="vm.resultData" on-try-again="vm.tryAgainClicked()" on-quit="vm.quitClicked()"></result-view-directive>',
					resolve: {
						sentenceScrambleData: MemorySpeakingData
					}
				}
			}
		});
};
StateConfig.$inject = ['$stateProvider'];

let MemorySpeakingOtm = angular.module('smart-choice.shell.memory_speaking_otm', ['templates', angularSanitize])
	.config(StateConfig)
	.service('MemorySpeakingModel', MemorySpeakingModel)
	.controller('MemorySpeakingController', MemorySpeakingController)
	.controller('QuestionController', QuestionController)
	.controller('ScoreBarController', ScoreBarController)
	.name;
export { MemorySpeakingOtm };
