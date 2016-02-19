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
        this._queries = [];
        this._events = [];
        this._queries = [];
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
        this._queries.push(commandCtor);
        return this;
    }

    /**
     *
     * @returns {Array.<AbstractCommand>}
     */
    get commands () {
        return this._queries;
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
        this._queries.push(query);
        return this;
    }

    /**
     *
     * @returns {Array.<AbstractQuery>}
     */
    get queries () {
        return this._queries;
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