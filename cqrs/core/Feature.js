/**
 * This object contains information about certain feature
 */
export class Feature {

    /**
     *
     * @param {string} name
     * @param {string} version
     */
    constructor (name, version) {
        this._name = name;
        this._version = version;

        this._aggregates = [];
        this._commandHandlers = [];
        this._commands = [];
        this._events = [];
    }

    /**
     *
     * @returns {string}
     */
    get name () {
        return this._name;
    }

    /**
     *
     * @returns {string}
     */
    get version () {
        return this._version;
    }

    /**
     * Add aggregator class (constructor) to feature
     * @param {AbstractAggregator} aggregateCtor
     */
    addAggregate (aggregateCtor) {
        this._aggregates.push(aggregateCtor);
        return this;
    }

    /**
     * Add command handler class (constructor) to feature
     * @param {AbstractCommandHandler} commandHandlerCtor
     */
    addCommandHandler (commandHandlerCtor) {
        this._commandHandlers.push(commandHandlerCtor);
        return this;
    }

    /**
     * Returns list of command handlers
     * @returns {Array.<AbstractCommandHandler>}
     */
    get commandHandlers () {
        return this._commandHandlers;
    }

    /**
     * Add command class (constructor) to feature
     * @param {AbstractCommand} commandCtor
     */
    addCommand (commandCtor) {
        this._commands.push(commandCtor);
        return this;
    }

    get commands () {
        return this._commands;
    }

    /**
     * Add event class (constructor) to feature
     * @param eventCtor
     */
    addEvent (eventCtor) {
        this._events.push(eventCtor);
        return this;
    }

}