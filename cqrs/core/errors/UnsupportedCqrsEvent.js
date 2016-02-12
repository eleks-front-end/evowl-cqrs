export class UnsupportedCqrsEvent extends Event {
    constructor (eventName, aggregateName) {
        super(`Event '${eventName}' is not supported by ${aggregateName}`);
    }

}