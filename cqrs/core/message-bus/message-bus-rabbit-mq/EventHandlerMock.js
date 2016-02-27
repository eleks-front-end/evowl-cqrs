/**
 * Temporary implementation of Event Handler
 */
export class EventHandlerMock {

    /**
     *
     * @param {AbstractEvent} eventCtor
     * @param {Function} executionScenario
     */
    constructor (eventToListen) {
        this._eventToListen = eventToListen;
    }

    /**
     * Check if event handler can handle passed event
     * @param {AbstractEvent} event
     * @returns {boolean}
     */
    matchEvent (eventObj) {
        return eventObj.name == this._eventToListen;
    }

    /**
     * Process event
     * @param {AbstractEvent} event
     */
    handle (eventObj) {
        return new Promise((resolve, reject) => {
            console.log("[x] Recieved %s", eventObj);
            var f = function() {
                resolve();
            };
            setTimeout(f, 3000);
        });
    }

}
