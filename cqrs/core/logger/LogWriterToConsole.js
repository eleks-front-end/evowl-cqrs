import {AbstractLogWriter} from './AbstractLogWriter';

/**
 * Writes logs to console
 * @extends AbstractLogWriter
 */
export class LogWriterToConsole extends AbstractLogWriter {
    constructor () {
        super();
    }

    /**
     * Save log record
     * @param {string} item
     */
    save (item) {
        console.log(item);
    }
}