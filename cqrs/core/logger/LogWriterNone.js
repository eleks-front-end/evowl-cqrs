import {AbstractLogWriter} from './AbstractLogWriter';


/**
 * Writer that doesn't writes logs, it just ignores them
 */
export class LogWriterNone extends AbstractLogWriter {
    /**
     * Doing nothing on save
     */
    save () {}
}