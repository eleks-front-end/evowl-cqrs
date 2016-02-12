import {NotImplementedError} from '../errors/NotImplementedError';
import {TypeMismatchError} from '../errors/TypeMismatchError';
import {AbstractAggregateRepository} from './AbstractAggregateRepository';

/**
 * Abstract class to define Command Handler interface
 */
export class AbstractCommandHandler {

    /**
     * @param {AbstractAggregateRepository} aggregateRepository
     * @param {string} commandName
     */
    constructor (aggregateRepository, commandName) {
        if (!(aggregateRepository instanceof AbstractAggregateRepository)) {
            throw new TypeMismatchError('AbstractAggregateRepository', aggregateRepository);
        }
        this._ar = aggregateRepository;
        this._commandName = commandName;
    }

    /**
     * Check if command can be executed by this command handler.
     * This method is used by CommandBus during command routing
     *
     * @param {AbstractCommand} command
     * @returns {boolean}
     */
    match (command) {
        if (command.name !== this._commandName) {
            return false;
        }
        return true;
    }

    /**
     * Execute command async and return object of execution result
     *
     * @param {AbstractCommand} command
     * @returns {Promise<AbstractCommandExecutionResult>}
     */
    execute (command) {
        throw new NotImplementedError('execute', 'CommandHandler');
    }
}