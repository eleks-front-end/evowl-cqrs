import {AbstractCqrsCommand} from './abstraction/AbstractCqrsCommand';

/**
 * Generic CqrsCommand class
 */
export class CqrsCommand extends AbstractCqrsCommand {

    /**
     *
     * @param {string} name Name of the command
     */
    constructor (name) {
        super(name);

        /**
         * Stores data related to the command
         * @type {object|null}
         * @protected
         */
        this._data = null;
    }

    /**
     *
     * @param {*} value
     */
    set data (value) {
        this._data = value;
    }

    /**
     *
     * @type {*}
     */
    get data () {
        return this._data;
    }

    /**
     * Serialize command instance to JavaScript Object
     * @returns {{commandName: string, data: *}}
     */
    toObject () {
        return {
            commandName: this.name,
            data: this.data
        }
    }

    /**
     * Serialize command instance to JSON
     * @returns {Object}
     */
    toString () {
        return JSON.stringify(this.toObject());
    }
}