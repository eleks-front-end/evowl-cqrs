import {joinLocation, mergeTags,
    LOG_EMERGENCY, LOG_ALERT, LOG_CRITICAL, LOG_ERROR, LOG_WARNING, LOG_NOTICE, LOG_INFORMATIONAL, LOG_DEBUG} from './LogUtils';

/**
 * Represents log record
 */
export class LogRecord {

    /**
     *
     * @param {Array.<string>} tags List of base tag
     * @param {string} loc Base location
     * @para, {string} message Record message
     * @param {Function} applyLogFunc Function to be called to save log record
     */
    constructor (tags, loc, message, applyLogFunc) {
        this._dt = new Date();
        this._tags = tags.slice();
        this._location = loc;
        this._applyLogFunc = applyLogFunc;
        this._message = message;
        this._data = null;
    }

    /**
     *
     * @type {Array.<string>}
     */
    get tags () {
        return this._tags.slice();
    }

    /**
     * Attach data related to the log record
     * @param {*} value
     * @returns {LogRecord}
     */
    data (value) {
        this._data = value;
        return this;
    }

    /**
     * Attach tag to log record
     * @param {Array.<string>|string} value
     * @returns {LogRecord}
     */
    tag (value) {
        mergeTags(this._tags, value);
        return this;
    }

    /**
     * Specify location of a log record
     * @param {string} value
     * @returns {LogRecord}
     */
    loc (value) {
        this.location = joinLocation(this.location, value);
        return this;
    }

    /**
     * Add Emergency tag
     */
    emerg () {
        mergeTags(this._tags, LOG_EMERGENCY);
        return this;
    }

    /**
     * Add Alert tag
     */
    alert () {
        mergeTags(this._tags, LOG_ALERT);
        return this;
    }

    /**
     * Add Critical tag
     */
    crit () {
        mergeTags(this._tags, LOG_CRITICAL);
        return this;
    }

    /**
     * Add Error tag
     */
    error () {
        mergeTags(this._tags, LOG_ERROR);
        return this;
    }

    /**
     * Add Warning tag
     */
    warning () {
        mergeTags(this._tags, LOG_WARNING);
        return this;
    }

    /**
     * Add Notice tag
     */
    notice () {
        mergeTags(this._tags, LOG_NOTICE);
        return this;
    }

    /**
     * Add Info tag
     */
    info () {
        mergeTags(this._tags, LOG_INFORMATIONAL);
        return this;
    }

    /**
     * Add Debug tag
     */
    debug () {
        mergeTags(this._tags, LOG_DEBUG);
        return this;
    }

    /**
     * Serialize log record to simple object
     * @returns {{dt: (Date|*), uid: (null|string|*), msg: *, data: (null|*), tag: (Array.<string>|*), location: (string|*)}}
     */
    toObject () {
        return {
            dt: this._dt,
            uid: this._uid,
            message: this._message,
            data: this._data,
            tags: this._tags,
            location: this._location
        }
    }

    /**
     * Save log record and erase log record
     */
    log () {
        this._applyLogFunc(this);
        this.erase();
    }

    /**
     * Erase all data of the log record, to prevent memory leaks
     */
    erase () {
        this._dt = null;
        this._tags = null;
        this._location = null;
        this._applyLogFunc = null;
        this._message = null;
        this._data = null;
        this._uid = null;
    }
}
