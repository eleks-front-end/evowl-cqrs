import {NotImplementedError} from '../errors/NotImplementedError';
import {TypeMismatchError} from '../errors/TypeMismatchError';
import {AbstractViewRepository} from './AbstractViewRepository';

/**
 * Abstract class describes interface of Query Handler
 */
export class AbstractQueryHandler {
    /**
     * @param {AbstractViewRepository} viewRepository
     * @param {string} queryName
     */
    constructor (viewRepository, queryName) {
        if (!(viewRepository instanceof AbstractViewRepository)) {
            throw new TypeMismatchError('AbstractViewRepository', viewRepository);
        }
        this._vr = viewRepository;
        this._queryName = queryName;
    }

    /**
     * Check if query can be executed by this query handler.
     * This method is used by QueryBus during query routing
     *
     * @param {AbstractQuery} query
     * @returns {boolean}
     */
    match (query) {
        if (query.name !== this._queryName) {
            return false;
        }
        return true;
    }

    /**
     * Execute query async and returns result async
     *
     * @param {AbstractQuery} query
     * @returns {Promise}
     */
    execute (query) {
        throw new NotImplementedError('execute', 'AbstractQueryHandler');
    }
}