import {AbstractView} from '../../../core/abstraction/AbstractView';

/**
 * Represents PingPong view (DTO)
 */
export class PingPongView extends AbstractView {

    /**
     * Restore serialized view
     * @param data
     * @returns {PingPongView}
     */
    static restore (data) {
        const instance = new PingPongView(data.requestID, data.ping.targetID, data.ping.byWho);
        if (data.pong) {
            instance.setPong(data.pong.dt, data.pong.answer);
        }
        return instance;
    }

    /**
     *
     * @param {uuid} requestID
     * @param {uuid} targetID
     * @param {string} byWHo
     */
    constructor (requestID, targetID, byWHo) {
        super();
        this._requestID = requestID;
        this._ping = {
            targetID: targetID,
            byWho: byWHo
        };
        this._pong = null;
    }

    /**
     *
     * @returns {uuid}
     */
    get viewID () {
        return this._requestID;
    }

    /**
     *
     * @returns {uuid}
     */
    get requestID () {
        return this._requestID;
    }

    /**
     * Apply pong event
     * @param {timestamp} dt
     * @param {string} answer
     */
    setPong (dt, answer) {
        this._pong = {
            dt: dt,
            answer: answer
        }
    }

    /**
     * Serialize view to JSON
     * @returns {{requestID: (uuid|*), ping: {targetID: (*|uuid), byWho: *}}}
     */
    toJSON () {
        const result =  {
            requestID: this._requestID,
            ping: this._ping
        };
        if (this._pong) {
            result.pong = this._pong;
            result.status = "ok";
        } else {
            result.status = "waiting pong";
        }
        return JSON.parse(JSON.stringify(result));
    }
}