/**
 * Abstract class defines log filter interface
 * @class
 */
export class AbstractLogFilter {

    /**
     * Check if log record match current filter
     * @abstract
     * @param {LogRecord} logRecord
     * @returns {boolean}
     */
    match (logRecord) {
        throw new Error('Method match of AbstractLogFilter not implemented');
    }
}