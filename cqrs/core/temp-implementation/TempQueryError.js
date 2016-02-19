/**
 * Represents error of query
 */
export class TempQueryError {

    /**
     *
     * @param {Error} error
     */
    constructor (error) {
        this._error = error;
    }

    /**
     *
     * @returns {Error}
     */
    get error () {
        return this._error;
    }

    /**
     * Always return null because error doesn't have result
     * @returns {null}
     */
    get result () {
        return null;
    }

}