import {AbstractQueryHandler} from '../../../core/abstraction/AbstractQueryHandler';
import {TempQueryResult} from '../../../core/temp-implementation/TempQueryResult';
import {TempQuerySuccess} from '../../../core/temp-implementation/TempQuerySuccess';
import {TempQueryError} from '../../../core/temp-implementation/TempQueryError';
import {PingPongView} from '../views/PingPongView';

export class CheckPongQueryHandler extends AbstractQueryHandler {

    /**
     * @param {AbstractViewRepository} aggregateRepository
     */
    constructor (viewRepository) {
        super(viewRepository, 'foo/check-pong');
    }

    /**
     * Execute query async and return view
     *
     * @param {AbstractQuery} query
     * @returns {Promise}
     */
    execute (query) {
        if (!this.match(query)) {
            // TODO: define apropriate error
            throw new Error('Query not supported');
        }
        return this._getPong(query);
    }

    /**
     * Get PingPong view from repository
     * @param query
     * @returns {Promise.<T>}
     * @private
     */
    _getPong (query) {
        return this._vr.get(query.requestID, PingPongView).then(
            (// successfully retrieve view
                view => new TempQueryResult(query, new TempQuerySuccess(view))
            ),
            (// error during view retrieving
                error => Promise.reject(new TempQueryResult(query, new TempQueryError(error)))
            )
        );

    }
}