/**
 * Abstract class that defines interface for log formatter
 */
export class AbstractLogFormatter {

    /**
     * Format log record
     * @param {LogRecord} logRecord
     * @returns {string}
     */
    format (logRecord) {
        throw new Error('Method format of AbstractLogFormatter not implemented');
    }
}