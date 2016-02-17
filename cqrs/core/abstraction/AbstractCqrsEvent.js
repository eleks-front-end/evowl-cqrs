import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class that describes interface of CqrsEvent
 * @interface AbstractCqrsEvent
 */
export class AbstractCqrsEvent {

    constructor (name, data) {
        this._name = name;
        this._data = data;
    }

    /**
     * serialize event to json object
     */
    toJSON () {
        throw new NotImplementedError('toJSON', 'AbstractCqrsEvent');
    }
}