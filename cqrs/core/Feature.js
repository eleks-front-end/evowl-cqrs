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
        this._queryHandlers = [];
        this._commandsDict = [];
        this._events = [];
        this._commandsDict = [];
        this._denormalizers = [];
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
     * @param {AbstractAggregate} aggregateCtor
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
     * @param {AbstractCqrsCommand} commandCtor
     */
    addCommand (commandCtor) {
        this._commandsDict.push(commandCtor);
        return this;
    }

    /**
     *
     * @returns {Array.<AbstractCqrsCommand>}
     */
    get commands () {
        return this._commandsDict;
    }

    /**
     * Add event class (constructor) to feature
     * @param eventCtor
     */
    addEvent (eventCtor) {
        this._events.push(eventCtor);
        return this;
    }

    /**
     * Add query handler class (constructor) to configuration
     * @param {AbstractQueryHandler} handlerCtor
     */
    addQueryHandler (handlerCtor) {
        this._queryHandlers.push(handlerCtor);
        return this;
    }

    /**
     *
     * @returns {Array.<AbstractQueryHandler>}
     */
    get queryHandlers () {
        return this._queryHandlers;
    }

    /**
     * Add query class (constructor) to configuration
     * @param {AbstractQuery} query
     */
    addQuery (query) {
        this._commandsDict.push(query);
        return this;
    }

    /**
     *
     * @returns {Array.<AbstractQuery>}
     */
    get queries () {
        return this._commandsDict;
    }

    /**
     * Add denormalizer class (constructor) to feature
     * @param {AbstractDenormalizer} denormalizerCtor
     */
    addDenormalizer (denormalizerCtor) {
        this._denormalizers.push(denormalizerCtor);
        return this;
    }

    /**
     *
     * @returns {Array.<AbstractDenormalizer>}
     */
    get denormalizers () {
        return this._denormalizers;
    }
}