/**
 * Abstract class that describes interface of event handler
 */
export class AbstractCqrsEventHandler {

    /**
     *
     * @param {string} pattern
     * @param {Function} handler
     */
    constructor (pattern, handler) {
        this._pattern = pattern;

    }
}