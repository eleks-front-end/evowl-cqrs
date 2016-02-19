/**
 * Temporary implementation
 * Represents success result of query
 */
export class TempQuerySuccess {

    /**
     *
     * @param {*} result
     */
    constructor (result) {
        this._result = result;
    }

    /**
     *
     * @returns {*}
     */
    get result () {
        return this._result;
    }

    /**
     * Always return null because success doesn't have errors
     * @returns {null}
     */
    get error () {
        return null;
    }
}
