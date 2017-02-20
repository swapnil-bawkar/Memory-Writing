/**
 * Created by Swapnil Bawkar on 9/28/2015.
 */
import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularMaterial from 'angular-material';
import gasp from 'gsap';
import { Shell } from './shell/shell';

let ThemeConfig = ($mdThemingProvider) => {
	var customCyan = $mdThemingProvider.extendPalette('cyan', {
		'500': 'rgb(49, 183, 191)'
	});
	// Register the new color palette map with the name <code>neonRed</code>
	$mdThemingProvider.definePalette('customCyan', customCyan);
	// Use that theme for the primary intentions
	$mdThemingProvider.theme('default')
		.primaryPalette('customCyan', {
			'hue-1': '700'
		});
};
ThemeConfig.$inject = ['$mdThemingProvider'];

let SmartChoice = angular.module('smart-choice', [
	uirouter, angularMaterial, Shell
]).config(ThemeConfig).name;

export { SmartChoice };
