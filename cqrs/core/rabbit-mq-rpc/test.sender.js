import {RabbitMQConnector} from './RabbitMQConnector';
import {OperationSender} from './OperationSender';

const commandName = 'foo.ping';
const EXCHANGE = 'test2';
const connector = new RabbitMQConnector({host: 'amqp://localhost'});
connector.connect();
const sender = new OperationSender(connector, EXCHANGE);
sender.ready.then(
    () => sender.execute(commandName, JSON.stringify({test: 'me'}))
).then(
    result => {
        console.log('Operation processed, result: ', result);
    }
);
