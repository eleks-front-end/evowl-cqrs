import {MessageBusPublisher} from './MessageBusPublisher';
import {EventObj} from './EventObj';

var publisher = new MessageBusPublisher('amqp://localhost', 'eventExchanger');

var event1 = new EventObj('event_1', {
	a:'1',
	b:'2'
});

var event2 = new EventObj('event_2', {
	a:'3',
	b:'4'
});

var f = function() {
	publisher.publish(event1);
	publisher.publish(event2);
};
setTimeout(f, 500);
