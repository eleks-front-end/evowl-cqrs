import {LoggingInterface} from './LoggingInterface';
import {LogRecord} from './LogRecord';
import {LogHandler} from './LogHandler';

/**
 * Provides log functionality
 */
export class Logger {

    constructor () {
        /**
         * Stores registered handlers
         * @type {Array.<LogHandler>}
         * @protected
         */
        this._handlers = [];

        /**
         * Default logging interface
         * @type {LoggingInterface}
         * @protected
         */
        this._loggingInterface = new LoggingInterface({tags: [], location: ''}, record => this.save(record));
    }

    /**
     * Save log record
     * @param {LogRecord} logRecord
     */
    save (logRecord) {
        if (!(logRecord instanceof LogRecord)) {
            throw new Error('Instance of LogRecord expected');
        }

        this._handlers.forEach(
            handler => setTimeout( // execute our handlers async
                handler.handle(logRecord), 0
            )
        );
    }

    /**
     * Get interface that inherits tag and location from current one
     * @param {string} loc
     * @param {Array.<string>|string} tags
     * @returns {LoggingInterface}
     */
    getInterface (loc='', tags = []) {
        return this._loggingInterface.getInterface(loc, tags);
    }

    /**
     *
     * @param {AbstractLogFilter} filter
     * @param {AbstractLogFormatter} formatter
     * @param {AbstractLogWriter} writer
     */
    registerHandler (filter, formatter, writer) {
        this._handlers.push(new LogHandler(filter, formatter, writer));
        return this;
    }

}