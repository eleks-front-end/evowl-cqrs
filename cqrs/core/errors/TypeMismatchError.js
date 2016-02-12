/**
 * Error should be used when passed argument with wrong type
 */
export class TypeMismatchError extends Error {

    /**
     *
     * @param {string} expectedType    Type that we expecting to get
     * @param {*} givenValue    Value that was passed
     */
    constructor (expectedType, givenValue) {
        super(`Expecting instance of ${expectedType}, passed: ${Object.prototype.toString.apply(givenValue)}`);
    }
}