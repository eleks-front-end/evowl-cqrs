/**
 * Abstract class that describes interface of CqrsEvent
 */
export class AbstractCqrsEvent {

    constructor (name, data) {
        this._name = name;
        this._data = data;
    }
}