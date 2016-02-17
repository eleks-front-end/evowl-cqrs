import {AbstractCommandHandler} from '../../../core/abstraction/AbstractCommandHandler'
import {FooAggregate} from '../aggregates/FooAggregate';
import {TempCommandExecutionResult} from '../../../core/temp-implementation/TempCommandExecutionResult';
import {TempCommandExecutionSuccess} from '../../../core/temp-implementation/TempCommandExecutionSuccess';
import {TempCommandExecutionError} from '../../../core/temp-implementation/TempCommandExecutionError';

/**
 * Command handler of Ping command
 */
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
        return this._ping(command);
    }


    /**
     * Do ping
     * @param {PingCommand} command
     * @private
     */
    _ping (command) {
        return this._ar.getByID(FooAggregate, command.targetID).then(
            (// success loading
                foo => {
                    try { //errors can occur during manipulation with aggregate
                        foo.ping(command.requestID, command.byWho);
                    }
                    catch (e) {
                        // reject promise with TempCommandExecutionResult and error value
                        return Promise.reject(new TempCommandExecutionResult(
                            command,new TempCommandExecutionError(e)
                        ));
                    }
                    return this._ar.save(foo).then(
                        (// return instance of TempCommandExecutionResult with success result
                            result => new TempCommandExecutionResult(
                                command, new TempCommandExecutionSuccess(result)
                            )
                        ),
                        (// error during save
                            error => Promise.reject(new TempCommandExecutionResult(
                                command,new TempCommandExecutionError(error)
                            ))
                        )
                    );
                }
            ),
            ( // error during loading aggregate from repository
                error => Promise.reject(new TempCommandExecutionResult(
                        command,new TempCommandExecutionError(error)
                    ))
            )
        );
    }


}