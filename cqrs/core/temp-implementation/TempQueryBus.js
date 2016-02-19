import {AbstractQueryBus}  from  '../abstraction/AbstractQueryBus';

/**
 * Temporary implementation of QueryBus
 * this implementation created in order to show basic example of work of CQRS architecture
 */
export class TempQueryBus extends AbstractQueryBus {

    constructor () {
        super();
        this._commandHandlers = [];
    }

    /**
     * Execute query, return promise that will be resoved with view.
     * @param {AbstractQuery} query
     */
    execute (query) {
        const qh = this._commandHandlers.find(qh => qh.match(query));
        if (qh === undefined) {
            throw new Error("No query handlers for such query", query);
        }
        return qh.execute(query);
    }

    /**
     * Register query handler in query bus
     * @param {AbstractQueryHandler} handler
     */
    register (handler) {
        this._commandHandlers.push(handler);
    }
}