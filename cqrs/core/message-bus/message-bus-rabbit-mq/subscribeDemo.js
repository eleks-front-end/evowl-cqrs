import {MessageBusReceiver} from './MessageBusReceiver';
import {DenormalizerConfig} from './DenormalizerConfig';
import {TempEventFactory} from './TempEventFactory';
import {EventHandlerMock} from './EventHandlerMock';

//requires a RabbitMQ server to be installed and running on localhost on standard port (5672)
var receiver = new MessageBusReceiver('amqp://localhost', 'eventExchanger', new TempEventFactory());

var handler1 = new EventHandlerMock('event_1');
var handler2 = new EventHandlerMock('event_2');

var denormConfig = new DenormalizerConfig('eventExchanger');
denormConfig.addEventToListen('event_1');
denormConfig.addEventToListen('event_2');
denormConfig.addHandler(handler1);
denormConfig.addHandler(handler2);

receiver.subscribe(denormConfig);
