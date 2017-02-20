/**
 * Created by sbawkar on 10/3/2015.
 */
import queryString from 'query-string';

const ACTIVITY_PATH = '../activities';
const MEDIA_PATH = '../engines/media';
let queryParams = {};
let mediaFolder = '';
class ShellModel {

	constructor() {
		queryParams = queryString.parse(location.search);
		mediaFolder = this.getDocument().split('_').splice(0,2).join('_');
	}

	isIOS() {
		return /iPad|iPhone|iPod/.test(navigator.platform);
	}

	getEngine() {
		return queryParams.eid;
	}

	getDocument() {
		return queryParams.did;
	}

	getActivityPath() {
		return ACTIVITY_PATH;
	}

	getMediaPath() {
		return MEDIA_PATH;
	}

	getAudioMediaFolderPath() {
		return `${this.getMediaPath()}/${mediaFolder}/audio`;
	}

	getImageMediaFolderPath() {
		return `${this.getMediaPath()}/${mediaFolder}/image`;
	}
}

export { ShellModel };