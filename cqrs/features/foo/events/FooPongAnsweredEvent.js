import {AbstractCqrsEvent}  from '../../../core/abstraction/AbstractCqrsEvent';

/**
 * FooPongAnswered event class
 */
export class FooPongAnsweredEvent extends AbstractCqrsEvent {

    /**
     *
     * @param {uuid} aggregateID
     * @param {uuid} requestID
     * @param {string} forWho
     */
    constructor (aggregateID, requestID, forWho) {
        super('foo_pong_answered');
        this._aggregateID = aggregateID;
        this._requestID = requestID;
        this._forWho = forWho;
    }

    /**
     *
     * @returns {uuid}
     */
    get aggregateID () {
        return this._aggregateID;
    }

    /**
     *
     * @returns {uuid}
     */
    get requestID () {
        return this._requestID;
    }

    /**
     *
     * @returns {string}
     */
    get forWho () {
        return this._forWho;
    }

    /**
     *
     * @returns {{aggregateID: uuid, requestID: uuid, forWho: string}}
     */
    toJSON () {
        return {
            aggregateID: this.aggregateID,
            requestID: this.requestID,
            forWho: this.forWho
        }
    }
}