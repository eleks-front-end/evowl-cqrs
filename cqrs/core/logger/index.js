import {Logger} from './Logger';
import {LoggingInterface} from './LoggingInterface';
import {LogRecord} from './LogRecord';
import {LogFilterAny} from './LogFilterAny';
import {LogFormatterConfigurableLine} from './LogFormatterConfigurableLine';
import {LogWriterToConsole} from './LogWriterToConsole';
import {LogWriterToFile} from './LogWriterToFile';
import {LogWriterNone} from './LogWriterNone';


export {Logger, LoggingInterface, LogRecord,
            // Filters
            LogFilterAny,

            // Formatters
            LogFormatterConfigurableLine,

            // Writers
            LogWriterToConsole, LogWriterToFile};


/**
 * Factory that return instances of filter, formatter or logger by it's type (string).
 * Can be useful to work with configuration files.
 */
export const LogFactory = {
    /**
     * Get new instance of filter by it's type
     * @param {string} type
     * @returns {AbstractLogFilter}
     */
    filter (type) {
        switch (type) {
            case 'LogFilterAny': return new LogFilterAny();
            default: throw new Error(`Undefined filter name '${type}'`);
        }
    },

    /**
     * Get new instance of formatter by it's type
     * @param {string} type
     * @returns {AbstractLogFormatter}
     */
    formatter (type) {
        switch (type) {
            case 'LogFormatterConfigurableLine': return new LogFormatterConfigurableLine();
            default: throw new Error(`Undefined formatter name '${type}'`);
        }
    },

    /**
     * Get new instance of writer by it's type
     * @param {string} type
     * @param {Object} options
     * @returns {AbstractLogWriter}
     */
    writer (type, options) {
        switch (type) {
            case 'LogWriterToConsole': return new LogWriterToConsole();
            case 'LogWriterToFile': return new LogWriterToFile(options);
            case 'LogWriterNone': return new LogWriterNone();
            default: throw new Error(`Undefined writer name '${type}'`);
        }
    }
}
