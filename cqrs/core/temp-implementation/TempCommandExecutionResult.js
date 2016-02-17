import {AbstractCommandExecutionResult} from '../abstraction/AbstractCommandExecutionResult';
import {TempCommandExecutionError} from './TempCommandExecutionError';
import {TempCommandExecutionSuccess} from './TempCommandExecutionSuccess';

/**
 * Represent result of command execution. Can hold both success and error.
 */
export class TempCommandExecutionResult extends AbstractCommandExecutionResult {

    /**
     *
     * @param {AbstractCommand} command
     * @param {TempCommandExecutionSuccess|TempCommandExecutionError} value
     */
    constructor (command, value) {
        this._command = command;
        this._value = value;
    }

    /**
     * @returns {*}
     */
    get result () {
        return this._value.result;
    }

    /**
     * @returns {Error|null}
     */
    get error () {
        return this._value.error;
    }

    /**
     * @returns {boolean}
     */
    get isSuccess () {
        return (this._value instanceof TempCommandExecutionSuccess) ? true : false;
    }


    /**
     * @returns {boolean}
     */
    get isError () {
        return (this._value instanceof TempCommandExecutionError) ? true : false;
    }
}