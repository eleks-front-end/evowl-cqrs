/**
 * Error should be used when we getting event and we don't know how to process it
 */
export class UnsupportedCqrsEvent extends Error {
    constructor (eventName, aggregateName) {
        super(`Event '${eventName}' is not supported by ${aggregateName}`);
    }

}