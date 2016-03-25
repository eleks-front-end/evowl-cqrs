import {AbstractLogFilter} from './AbstractLogFilter';
import {AbstractLogFormatter} from './AbstractLogFormatter';
import {AbstractLogWriter} from './AbstractLogWriter';

/**
 * Stores pair of filter and writer and coordinate them to handle log records
 */
export class LogHandler {

    /**
     *
     * @param {AbstractLogFilter} filter
     * @param {AbstractLogFormatter} formatter
     * @param {AbstractLogWriter} writer
     */
    constructor (filter, formatter, writer) {
        if (!(filter instanceof AbstractLogFilter)) {
            throw new Error("Parameter 'filter' expected as instance with AbstractLogFilter interface");
        }
        if (!(formatter instanceof AbstractLogFormatter)) {
            throw new Error("Parameter 'formatter' expected as instance with AbstractLogFormatter interface");
        }
        if (!(writer instanceof AbstractLogWriter)) {
            throw new Error("Parameter 'writer' expected as instance with AbstractLogWriter interface");
        }
        this._filter = filter;
        this._formatter = formatter;
        this._writer = writer;
    }

    /**
     * Process log record, if it match filter than pass it to writer
     * @param {LogRecord} logRecord
     */
    handle (logRecord) {
        if (!this._filter.match(logRecord)) {
            return;
        }
        this._writer.save(this._formatter.format(logRecord));
    }
}