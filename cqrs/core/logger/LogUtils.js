                                            // Syslog levels: https://en.wikipedia.org/wiki/Syslog
                                            //_______________________________________________________________________________________________________
                                            //| Value |   Severity	   |  Keyword  |	Description	                                                 |
                                            //|=======|================|===========|=================================================================|
export const LOG_EMERGENCY = '__emerg';     //|  0    | Emergency      | emerg     | System is unusable                                              |
export const LOG_ALERT = '__alert';         //|  1    | Alert          | alert     | Should be corrected immediately                                 |
export const LOG_CRITICAL = '__crit';       //|  2    | Critical       | crit      | Critical conditions                                             |
export const LOG_ERROR = '__err';           //|  3    | Error          | err       | Error conditions                                                |
export const LOG_WARNING = '__warning';     //|  4    | Warning        | warning   | May indicate that an error will occur if action is not taken    |
export const LOG_NOTICE = '__notice';       //|  5    | Notice         | notice    | Events that are unusual, but not error conditions               |
export const LOG_INFORMATIONAL = '__info';  //|  6    | Informational  | info      | Normal operational messages that require no action              |
export const LOG_DEBUG = '__debug';         //|  7    | Debug          | debug     | Information useful to developers for debugging the application  |
                                            //|_______|________________|___________|_________________________________________________________________|

export const LOG_INFO = LOG_INFORMATIONAL; // Alias for LOG_INFORMATIONAL

/**
 * Merge locations
 * @param {string} base
 * @param {string} addition
 * @returns {string}
 */
export function joinLocation (base, addition) {
    if (!addition) {
        return base;
    }
    return [base, addition].join('.');
}

/**
 * Modify base array adding all tag from addition
 * @param {Array.<string>} base
 * @param {Array.<string>|string} addition
 * @returns {Array.<string>}
 */
export function mergeTags (base, addition) {
    if (!Array.isArray(addition)) {
        addition = [addition];
    }
    Array.prototype.push.apply(base, addition);
    return base;
}

/**
 * Get label by syslog level tag
 * @param {string} logLevel
 * @returns {string}
 */
export function logLevelLabel (logLevel) {
    switch (logLevel) {
        case LOG_EMERGENCY: return 'emergency';
        case  LOG_ALERT: return 'alert';
        case  LOG_CRITICAL: return 'critical';
        case  LOG_ERROR: return 'error';
        case  LOG_WARNING: return 'warning';
        case  LOG_NOTICE: return 'notice';
        case LOG_INFORMATIONAL: return 'info';
        case LOG_DEBUG: return 'debug';
        default: return '';
    }
}

/**
 * Check if list of tags has log level from searchLogLevels array
 * Returns empty string if log lefel not found
 * @param {Array.<string>} tags
 * @param {Array.<string>} searchLogLevels
 * @returns {String}
 */
export function hasLogLevel (tags, searchLogLevels) {
    const logLevel = tags.find(tag => searchLogLevels.indexOf(tag) !== -1);
    return logLevel || '';
}