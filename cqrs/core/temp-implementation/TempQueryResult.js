import {AbstractQueryResult} from '../abstraction/AbstractQueryResult';
import {TempQueryError} from './TempQueryError';
import {TempQuerySuccess} from './TempQuerySuccess';

/**
 * Temporary implementation.
 * Represent result of query. Can hold both success and error.
 */
export class TempQueryResult extends AbstractQueryResult {

    /**
     *
     * @param {AbstractQuery} query
     * @param {TempQuerySuccess|TempQueryError} value
     */
    constructor (query, value) {
        super();
        this._query = query;
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
        return (this._value instanceof TempQuerySuccess) ? true : false;
    }


    /**
     * @returns {boolean}
     */
    get isError () {
        return (this._value instanceof TempQueryError) ? true : false;
    }
}