import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class to define CommandBus interface
 */
export class AbstractCommandBus {
    /**
     * Execute command, return promise that will be resolved with execution result.
     * @param {AbstractCqrsCommand} command
     * @returns {Promise.<AbstractCommandExecutionResult>}
     */
    execute (command) {
        throw new NotImplementedError('execute', 'CommandBus');
    }

    /**
     * Register command handler in command bus, so command bus will be able to route command
     * @param {AbstractCommandHandler} commandHandler
     */
    registerCommandHandler (commandHandler) {
        throw new NotImplementedError('registerCommandHandler', 'CommandBus');
    }
}
