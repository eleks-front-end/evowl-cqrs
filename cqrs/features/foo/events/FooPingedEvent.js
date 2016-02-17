import {AbstractCqrsEvent}  from '../../../core/abstraction/AbstractCqrsEvent';

/**
 * Foo Pinged event class
 */
export class FooPingedEvent extends AbstractCqrsEvent {

    /**
     *
     * @param {uuid} aggregateID
     * @param {uuid} requestID
     * @param {string} byWho
     */
    constructor (aggregateID, requestID, byWho) {
        super('foo_pinged');
        this._aggregateID = aggregateID;
        this._requestID = requestID;
        this._byWho = byWho;
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
    get byWho () {
        return this._byWho;
    }

    /**
     *
     * @returns {{aggregateID: uuid, requestID: uuid, byWho: string}}
     */
    toJSON () {
        return {
            aggregateID: this.aggregateID,
            requestID: this.requestID,
            byWho: this.byWho
        }
    }
}