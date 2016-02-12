import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class to define Command interface
 */
export class AbstractCommand {

    constructor (name) {
        this._name = name;
    }

    /**
     * Returns name of the command
     * @returns {string}
     */
    get name () {
        return this._name
    }

    /**
     * Serialize command to JSON
     * @returns {Object}
     */
    toJSON () {
        throw new NotImplementedError('AbstractCommand', 'serialize');
    }

}