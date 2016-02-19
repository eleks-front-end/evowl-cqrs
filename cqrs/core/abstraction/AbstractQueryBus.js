import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class describes interface of Query Bus
 */
export class AbstractQueryBus {

    /**
     * Execute query, return promise that will be resoved with result.
     * @param {AbstractQuery} query
     */
    execute (query) {
        throw new NotImplementedError('execute', 'QueryBus');
    }

    /**
     * Register query handler in query bus
     * @param {AbstractQueryHandler} handler
     */
    register (handler) {
        throw new NotImplementedError('register', 'QueryBus');
    }
}