import {AbstractCqrsEvent}  from '../../../core/abstraction/AbstractCqrsEvent';

/**
 * FooPongAnswered event class
 */
export class FooPongAnsweredEvent extends AbstractCqrsEvent {

    /**
     *
     * @param {timestamp} dt
     * @param {uuid} aggregateID
     * @param {uuid} requestID
     * @param {string} forWho
     */
    constructor (requestID, dt, answer) {
        super('foo_pong_answered');
        this._requestID = requestID;
        this._dt = dt;
        this._answer = answer;
    }

    /**
     *
     * @returns {timestamp}
     */
    get dt () {
        return this._dt;
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
    get answer () {
        return this._answer;
    }

    /**
     *
     * @returns {{dt: timestamp, aggregateID: uuid, requestID: uuid, forWho: string}}
     */
    toJSON () {
        return {
            dt: this.dt,
            requestID: this.requestID,
            answer: this.answer
        }
    }
}