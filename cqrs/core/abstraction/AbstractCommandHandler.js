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
     * Return pattern to match command that this CommandHandler can execute
     * Usually it is exact command name
     * @type {string}
     */
    get pattern () {
        return this._commandName;
    }

    /**
     * Check if command can be executed by this command handler.
     * This method is used by CommandBus during command routing
     *
     * @param {AbstractCqrsCommand} command
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
     * @param {AbstractCqrsCommand} command
     * @returns {Promise<AbstractCommandExecutionResult>}
     */
    execute (command) {
        throw new NotImplementedError('execute', 'CommandHandler');
    }
}