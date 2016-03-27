import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class to define Command interface
 */
export class AbstractCqrsCommand {

    /**
     *
     * @param {string} cmd
     */
    constructor (cmd) {
        this._cmd = cmd;
    }

    /**
     * Returns cmd of the command
     * @type {string}
     */
    get cmd () {
        return this._cmd
    }

    /**
     * Return object that contains all data related to command
     * @type {Object}
     */
    get data () {
        throw new NotImplementedError('AbstractCqrsCommand', 'data');
    }

    /**
     * Serialize command to flat object
     * @returns {{cmd: string, data: Object}}
     */
    toObject () {
        return {
            type: this.constructor.name,
            cmd: this.cmd,
            data: this.data
        }
    }

    /**
     * Serialize command to String
     * @returns {string}
     */
    toString () {
        return JSON.stringify(this.toObject());
    }

}