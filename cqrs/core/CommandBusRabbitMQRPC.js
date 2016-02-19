import {OperationReceiver, OperationSender} from './rabbit-mq-rpc/';
import {AbstractCommandBus} from './abstraction/AbstractCommandBus';
import {CommandExecutionResult} from './CommandExecutionResult';

/**
 * Command bus implementation based on RabbitMQ
 */
export class  CommandBusRabbitMQRPC extends AbstractCommandBus {

    /**
     *
     * @param {RabbitMQConnector} connector
     * @param {string} exchangeName
     * @param {CommandFactory} commandFactory
     */
    constructor (connector, exchangeName, commandFactory) {
        super();
        this._receiver = new OperationReceiver(connector, exchangeName);
        this._sender = new OperationSender(connector, exchangeName);
        this._commandFactory = commandFactory;
    }

    /**
     * Promise that will be resolved when CommandBus ready to use
     * @type {Promise}
     */
    get ready () {
        return Promise.all([
            this._receiver.ready,
            this._sender.ready
        ]);
    }

    /**
     * Execute command, return promise that will be resolved with execution result.
     * @param {AbstractCqrsCommand} command
     * @returns {Promise.<AbstractCommandExecutionResult>}
     */
    execute (command) {
        return this._sender.execute(command.name, command.toString()).then(
            result => new CommandExecutionResult(command, result),
            error => Promise.reject(new CommandExecutionResult(command, null, error))
        );
    }

    /**
     * Register command handler in command bus, so command bus will be able to route command
     * @param {AbstractCommandHandler} commandHandler
     */
    registerCommandHandler (commandHandler) {
        this._receiver.registerHandler(commandHandler.pattern, msg => {
            return commandHandler.execute(this._commandFactory.restore(msg))
        });
    }
}