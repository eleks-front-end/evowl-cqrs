import {AbstractCqrsCommand} from '../../../core/abstraction/AbstractCqrsCommand';

/**
 * Ping command class
 */
export class PingCommand extends AbstractCqrsCommand {

    /**
     *
     * @returns {string}
     */
    static get name () {
        return 'foo.ping';
    }

    /**
     * Simple factory that return new instance of the Ping command
     * @param {{requestID:string, targetID:uuid, byWho:string}} data
     * @returns {PingCommand}
     */
    static create (data) {
        //TODO: rewrite to destructuring assignment (configurate bablejs appropreately)
        return new PingCommand(data.requestID, data.targetID, data.byWho);
    }

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
    get name () {
        return PingCommand.name;
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
     * Return object that contains all data related to command
     * @returns {{name: string, targetID: uuid, byWho: string}}
     */
    get data () {
        return {
            requestID: this.requestID,
            name: this.name,
            targetID: this.targetID,
            byWho: this.byWho
        }
    }
}