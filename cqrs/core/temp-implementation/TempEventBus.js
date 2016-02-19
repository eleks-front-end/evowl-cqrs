import {AbstractEventBus}  from  '../abstraction/AbstractEventBus';
import {AbstractEventHandler}  from  '../abstraction/AbstractEventHandler';
import {AbstractCqrsEvent}  from  '../abstraction/AbstractCqrsEvent';
import {TypeMismatchError}  from  '../errors/TypeMismatchError';

/**
 * Temporary implementation of EventBus
 */
export class TempEventBus extends AbstractEventBus {

    constructor () {
        super();
        this._eventHandlers = [];
    }
    /**
     * Push new event to bus
     * @param {AbstractCqrsEvent} event
     */
    push (event) {
        if (!(event instanceof AbstractCqrsEvent)) {
            throw new TypeMismatchError('AbstractCqrsEvent', event);
        }
        this._eventHandlers.filter(handler => handler.match(event))
                            .map(handler => handler.handle(event));
    }

    /**
     * Register event handler in event bus
     * @param {AbstractEventHandler} eventHandler
     */
    registerEventHandler (eventHandler) {
        if (!(eventHandler instanceof AbstractEventHandler)) {
            throw new TypeMismatchError('AbstractEventHandler', eventHandler)
        }
        this._eventHandlers.push(eventHandler);
    }
}