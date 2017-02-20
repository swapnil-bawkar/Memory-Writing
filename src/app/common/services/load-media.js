let LoadMedia = ($log, $q) => {
	let loadAudio = (audioFile) => new Audio(audioFile);
	let loadImages = (imageFiles) => {
		let promises = [];
		let deferred = $q.defer();
		for (let i = 0; i<imageFiles.length; i++){
			let def = $q.defer();
			promises.push(def.promise);
			let img = new Image();
			img.onload = () => {
				def.resolve();
			};
			img.onerror = () => {
				def.resolve();
			};
			img.src = imageFiles[i];
		};
		$q.all(promises).then(function(){
			deferred.resolve();
		});
		return deferred.promise;
	};
	return {loadAudio, loadImages};
};

LoadMedia.$inject = ['$log','$q'];
export {LoadMedia};
