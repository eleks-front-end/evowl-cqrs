import {AbstractCqrsEventHandler} from './abstraction/AbstractCqrsEventHandler';


/**
 *
 */
class CqrsEventHandler {

    /**
     *
     * @param {AbstractCqrsEvent} eventCtor Concrete class of Cqrs Event
     * @param {string} pattern Pattern to bind a quer in message bus
     * @param {Function} handler Function that process event
     */
    constructor (eventCtor, pattern, handler) {
        this._eventCtor = eventCtor;
        this._pattern = pattern;
        this._handler = handler;
    }

    /**
     *
     * @returns {string}
     */
    get pattern () {
        return this._pattern;
    }

    /**
     *
     * @returns {Function}
     */
    get handler () {
        return this._handler;
    }

    /**
     * Return instance of concrete Cqrs Event restoring it from string
     * @param {string} serializedEvent
     * @returns {AbstractCqrsEvent}
     */
    restoreEvent (serializedEvent) {
        return this._eventCtor.restore(serializedEvent);
    }
}