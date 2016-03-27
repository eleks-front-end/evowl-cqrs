/**
 * Abstract class defines interface of log writer
 */
export class AbstractLogWriter {

    /**
     * Save log record
     * @abstract
     * @param {string} item
     */
    save (item) {
        throw new Error('Method save of AbstractLogWriter not implemented');
    }
}