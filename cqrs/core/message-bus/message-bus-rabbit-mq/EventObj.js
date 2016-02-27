export class EventObj {

	constructor (name, data) {
		this._name = name;
		this._data = data;
	}

	get name () {
		return this._name;
	}

	serialize () {
		return this._name + '|' + JSON.stringify(this);
	}
}
