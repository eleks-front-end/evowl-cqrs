import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class to define Command interface
 */
export class AbstractCqrsCommand {

    /**
     *
     * @param {string} name
     */
    constructor (name) {
        this._name = name;
    }

    /**
     * Returns name of the command
     * @type {string}
     */
    get name () {
        return this._name
    }

    /**
     * Return object that contains all data related to command
     * @type {Object}
     */
    get data () {
        throw new NotImplementedError('AbstractCqrsCommand', 'data');
    }

    /**
     * Serialize command to JSON
     * @returns {{name: string, data: Object}}
     */
    toJSON () {
        return {
            name: this.name,
            data: this.data
        }
    }

    /**
     * Serialize command to String
     * @returns {string}
     */
    toString () {
        return JSON.stringify(this.toJSON());
    }

}