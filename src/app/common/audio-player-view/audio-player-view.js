require('./audio-player-view.html');

let AudioPlayerDirective = ($log, $document) => {
	return {
		restrict: 'E',
		templateUrl: 'audio-player-view.html',
		scope: {
			audioPlayer: '=audioPlayObject'
		},
		link: function(scope, element) {
			scope.audioPlayer.pause();
			let $speakerG = angular.element($document[0].querySelector('.default-state'));
			let $wavesG = angular.element($document[0].querySelector('.playing-state'));
			let $wave = angular.element($document[0].querySelectorAll('.audioWave'));
			let tlPlaying = new TimelineLite();
			tlPlaying.staggerTo($wave,0.3,{
				ease: Power1.easeInOut,
				transformOrigin:'center center',
				scaleY:0.2,
				repeat: -1,
				yoyo:true
			},0.1).pause();
			TweenLite.set($speakerG,{transformOrigin:'center center',scale:1});
			TweenLite.set($wavesG,{transformOrigin:'center center',scale:0});
			scope.audioPlayer.onended = () => stopAudio();
			element.bind('click', function() {
				if(!scope.audioPlayer.error){
					if (element.hasClass('playing')) {
						stopAudio();
					} else{
						playAudio();
					}
				}
			});
			let playAudio = () => {
				element.addClass('playing');
				scope.audioPlayer.play();
				tlPlaying.play();
				TweenLite.to($speakerG,0.2,{transformOrigin:'center center',scale:0});
				TweenLite.to($wavesG,0.2,{transformOrigin:'center center',scale:1});
			};

			let stopAudio = () => {
				element.removeClass('playing');
				scope.audioPlayer.pause();
				scope.audioPlayer.currentTime = 0;
				TweenLite.to($speakerG,0.2,{transformOrigin:'center center',scale:1});
				TweenLite.to($wavesG,0.2,{transformOrigin:'center center',scale:0});
				tlPlaying.pause();
			};
			playAudio();
		}
	};
};
AudioPlayerDirective.$inject = ['$log', '$document'];

export { AudioPlayerDirective };
