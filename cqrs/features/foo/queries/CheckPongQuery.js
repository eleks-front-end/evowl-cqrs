import {AbstractQuery} from '../../../core/abstraction/AbstractQuery';

/**
 * Query to check pong answer
 */
export class CheckPongQuery extends AbstractQuery {

    /**
     *
     * @returns {string}
     */
    static get name () {
        return 'foo/check-pong';
    }

    /**
     *
     * @param {object} data
     * @returns {CheckPongQuery}
     */
    static create (data) {
        return new CheckPongQuery(data.requestID);
    }

    /**
     *
     * @param {uuid} requestID
     */
    constructor (requestID) {
        super(CheckPongQuery.name);
        this._requestID = requestID;
    }

    /**
     *
     * @returns {uuid}
     */
    get requestID () {
        return this._requestID;
    }
}