import {AbstractCommand} from '../../../core/abstraction/AbstractCommand';

/**
 * Ping command class
 */
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

    /**
     *
     * @returns {string}
     */
    static get name () {
        return 'foo/ping';
    }

    /**
     * Simple factory that return new instance of the Ping command
     * @param {string} requestID
     * @param {uuid} targetID
     * @param {string} byWho
     * @returns {PingCommand}
     */
    static create (data) {
        //TODO: rewrite to destructuring assignment (configurate bablejs appropreately)
        return new PingCommand(data.requestID, data.targetID, data.byWho);
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