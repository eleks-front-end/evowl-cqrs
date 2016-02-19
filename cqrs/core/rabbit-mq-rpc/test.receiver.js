import {RabbitMQConnector} from './RabbitMQConnector';
import {OperationReceiver} from './OperationReceiver';


const handler = function (msg) {
    console.log('===> Operation recieved');
    console.log(msg);
    return Promise.resolve(JSON.stringify({status: 'done'}));
}
const commandName = 'foo.ping';
const EXCHANGE = 'test2';
const connector = new RabbitMQConnector({host: 'amqp://localhost'});
connector.connect();
const receiver = new OperationReceiver(connector, EXCHANGE);

receiver.ready
    .then(r => r.registerHandler(commandName, handler))
    .then(registrationResult => console.log(registrationResult));
