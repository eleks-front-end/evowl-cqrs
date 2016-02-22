import {MessageBusPublisher} from './MessageBusPublisher';

var publisher = new MessageBusPublisher('amqp://localhost', 'eventExchanger');
publisher._publish('event_1', 'message hi');
publisher._publish('event_2', 'message hi 2');
publisher._publish('event_2', 'message hi 3');
