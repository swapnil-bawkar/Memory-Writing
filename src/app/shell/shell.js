/**
 * Created by sbawkar on 9/29/2015.
 */
import { ShellModel } from './model/shell-model';
import { ShellController } from './shell-controller';
import { MemorySpeakingOtm } from './engines/memory_speaking_otm/memory-speaking';
import { IntroViewDirective } from '../common/intro-view/intro-view-directive';
import { TextToHtml } from '../common/filters/text-to-html';
import { ScoreBarDirective } from '../common/score-bar-view/score-bar-view';
import { QuitPageViewDirective } from '../common/quit-page-view/quit-page-view';
import { ResultViewDirective } from '../common/result-view/result-view-directive';
import { AudioPlayerDirective } from '../common/audio-player-view/audio-player-view';
import { LoadMedia } from '../common/services/load-media';

let StateConfig = ($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/shell');

	$stateProvider
		.state('shell', {
			url: '/shell',
			controller: 'ShellController as vm',
			template: '<div ui-view layout="row" flex class="engine"></div>'
		})
		.state('shell.quit', {
			url: '/quit',
			template: '<quit-page-view-directive></quit-page-view-directive>'
		});
};
StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];


let Shell = angular.module('smart-choice.shell', [MemorySpeakingOtm])
	.config(StateConfig)
	.directive('introViewDirective', IntroViewDirective)
	.directive('resultViewDirective', ResultViewDirective.directiveFactory)
	.directive('quitPageViewDirective', QuitPageViewDirective)
	.directive('scoreBarDirective', ScoreBarDirective)
	.directive('audioPlayerDirective', AudioPlayerDirective)
	.service('ShellModel', ShellModel)
	.controller('ShellController', ShellController)
	.factory('LoadMedia', LoadMedia)
	.filter('textToHtml', TextToHtml)
	.name;
export { Shell };
