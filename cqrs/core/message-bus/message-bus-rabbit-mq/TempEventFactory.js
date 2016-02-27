import {EventObj} from './EventObj';

export class TempEventFactory {

	restore (serializedEvent) {
		let [eventName, eventObj] = serializedEvent.split('|');

		let evnt = JSON.parse(eventObj);

		switch(eventName) {
			case 'event_1': return new EventObj(evnt._name, evnt._data);
			case 'event_2': return new EventObj(evnt._name, evnt._data);
		}
	}
}
