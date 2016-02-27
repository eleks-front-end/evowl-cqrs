export class DenormalizerConfig {

	constructor (exchangerName) {
		this._exchangerName = exchangerName;
		this._eventsToListen = [];
		this._handlers = [];
	}

	get exchangerName () {
		return this._exchangerName;
	}

	get eventsToListenIterator () {
		return this._eventsToListen;
	}

	get handlersIterator () {
		return this._handlers;
	}

	addEventToListen (eventName) {
		this._eventsToListen.push(eventName);
	}

	addHandler (handler) {
		this._handlers.push(handler);
	}
}
