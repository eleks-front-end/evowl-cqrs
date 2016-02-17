import {AbstractCommand} from '../../../core/abstraction/AbstractCommand';

export class PingCommand extends AbstractCommand {

    /**
     * @param {uuid} requestID
     * @param {uuid} targetID
     * @param {string} byWho
     */
    constructor (requestID, targetID, byWho) {
        super(PingCommand.name);

        this._requestID = requestID;
        this._targetID = targetID;
        this._byWho = byWho;
    }

    static get name () {
        return 'foo/ping';
    }

    static create ({requestID, targetID, byWho}) {
        return new PingCommand(requestID, targetID, byWho);
    }

    /**
     *
     * @returns {uuid}
     */
    get requestID () {
        return this._requestID;
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
    get byWho () {
        return this._byWho;
    }

    /**
     *
     * @returns {{name: string, targetID: uuid, byWho: string}}
     */
    toJSON () {
        return {
            name: this.name,
            targetID: this.targetID,
            byWho: this.byWho
        }
    }
}