import {MessageBusReceiver} from './MessageBusReceiver';

//requires a RabbitMQ server to be installed and running on localhost on standard port (5672)
var receiver = new MessageBusReceiver('amqp://localhost', 'eventExchanger');

receiver._subscribe('event_1', message => {
	console.log("[x] Recieved %s with key event_1", message.content.toString());
});

receiver._subscribe('event_2', message => {
	console.log("[x] Recieved %s with key event_1", message.content.toString());
});
