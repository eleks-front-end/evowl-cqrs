import {AbstractEventHandler} from '../abstraction/AbstractEventHandler';


/**
 * Temporary implementation of Event Handler
 */
export class TempEventHandler extends AbstractEventHandler {

    /**
     *
     * @param {AbstractEvent} eventCtor
     * @param {Function} executionScenario
     */
    constructor (eventCtor, executionScenario) {
        super();
        this._eventCtor = eventCtor;
        this._executionScenario = executionScenario;
    }

    /**
     * Check if event handler can handle passed event
     * @param {AbstractEvent} event
     * @returns {boolean}
     */
    match (event) {
        return event instanceof this._eventCtor;
    }

    /**
     * Process event
     * @param {AbstractEvent} event
     */
    handle (event) {
        this._executionScenario.call(null, event);
    }

}