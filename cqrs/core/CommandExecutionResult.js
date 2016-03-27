import {AbstractCommandExecutionResult} from './abstraction/AbstractCommandExecutionResult';
import {CqrsCommand} from './CqrsCommand';
import {TypeMismatchError} from './errors/TypeMismatchError';

/**
 * Represents result of command execution
 */
export class CommandExecutionResult extends AbstractCommandExecutionResult {

    /**
     *
     * @param {CqrsCommand} command
     * @param {*} data Result of command execution
     * @param {Error|string} error
     */
    constructor (command, data, error = null) {
        if (!(command instanceof CqrsCommand)) {
            throw new TypeMismatchError(CqrsCommand.cmd, command);
        }
        if (error === null && data !== null) {
            throw new Error(`Command execution result can't have both data and error at the same time`);
        }
        this._command = command;
        this._data = data;
        this._error = error;
    }

    /**
     * Command origin
     * @type {CqrsCommand}
     */
    get command () {
        return this._command;
    }

    /**
     * Result of command execution
     * @type {*}
     */
    get data () {
        return this._data;
    }

    /**
     *
     * @type {Error|string|null}
     */
    get error () {
        return this._error;
    }

    /**
     * True if command execution was successful
     * @type {boolean}
     */
    get isSuccess () {
        return this._error !== null;
    }


    /**
     * True if command execution failed
     * @type {boolean}
     */
    get isError () {
        return this._error === null;
    }

}