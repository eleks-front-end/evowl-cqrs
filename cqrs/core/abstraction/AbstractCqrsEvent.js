import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class that describes interface of CqrsEvent
 * @interface AbstractCqrsEvent
 */
export class AbstractCqrsEvent {

    /**
     *
     * @param {string} name
     */
    constructor (name) {
        this._name = name;
    }

    /**
     *
     * @returns {string}
     */
    get name () {
        return this._name;
    }

    /**
     * serialize event to json object
     */
    toJSON () {
        throw new NotImplementedError('toJSON', 'AbstractCqrsEvent');
    }
}