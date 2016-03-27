import {AbstractLogFilter} from './AbstractLogFilter';

/**
 * Filter that pass all log records
 * @extends AbstractLogFilter
 */
export class LogFilterAny extends AbstractLogFilter{

    /**
     * Check if log record match current filter
     * @param {LogRecord} logRecord
     * @returns {boolean}
     */
    match (logRecord) {
        return true
    }
}