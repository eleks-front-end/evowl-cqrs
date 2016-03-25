/**
 * Abstract class describes Query interface
 */
export class AbstractQuery {

    /**
     *
     * @param {string} name
     */
    constructor (name) {
        this._name = name;
    }

    /**
     * Returns cmd of the query
     * @returns {string}
     */
    get name () {
        return this._name
    }
}