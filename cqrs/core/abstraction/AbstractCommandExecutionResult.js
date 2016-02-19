import {NotImplementedError} from '../errors/NotImplementedError';

/**
 * Abstract class define interface for command execution result
 */
export class AbstractCommandExecutionResult {

    /**
     * @returns {*}
     */
    get data () {
        throw new NotImplementedError('isSuccess', 'AbstractCommandExecutionResult');
    }

    /**
     * @returns {Error|null}
     */
    get error () {
        throw new NotImplementedError('isSuccess', 'AbstractCommandExecutionResult');
    }

    /**
     * @returns {boolean}
     */
    get isSuccess () {
        throw new NotImplementedError('isSuccess', 'AbstractCommandExecutionResult');
    }


    /**
     * @returns {boolean}
     */
    get isError () {
        throw new NotImplementedError('isError', 'AbstractCommandExecutionResult');
    }
}