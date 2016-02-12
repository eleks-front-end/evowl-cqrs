import {AbstractCommand} from '../../core/abstraction/AbstractCommand';

export class PingCommand extends AbstractCommand {

    /**
     *
     * @param {uuid} targetID
     * @param {string} who
     */
    constructor (targetID, who) {
        super('foo/ping');

        this._targetID = targetID;
        this._who = who;
    }

    /**
     * @returns {uuid}
     */
    get targetID () {
        return this._targetID;
    }

    /**
     * @returns {string}
     */
    get who () {
        return this._who;
    }

    /**
     *
     * @returns {{name: string, targetID: uuid, who: string}}
     */
    toJSON () {
        return {
            name: this.name,
            targetID: this.targetID,
            who: this.who
        }
    }
}