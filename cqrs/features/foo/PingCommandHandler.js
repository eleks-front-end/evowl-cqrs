import {AbstractCommandHandler} from '../../core/abstraction/AbstractCommandHandler'
import {FooAggregate} from './foo.aggregate';

export class PingCommandHandler extends AbstractCommandHandler {

    /**
     * @param {AbstractAggregateRepository} aggregateRepository
     */
    constructor (aggregateRepository) {
        super(aggregateRepository, 'foo/ping');
    }

    /**
     * Execute command async and return object of execution result
     *
     * @param {AbstractCommand} command
     * @returns {Promise<AbstractCommandExecutionResult>}
     */
    execute (command) {
        if (!this.match(command)) {
            // TODO: define apropriate error
            throw new Error('Command not supported');
        }
        this._ping(command);
    }


    /**
     * Do ping
     * @param {PingCommand} command
     * @private
     */
    _ping (command) {
        const aggregate = this._ar.getByID(FooAggregate, command.targetID);
    }


}