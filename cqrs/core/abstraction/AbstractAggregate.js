import {AbstractCqrsEvent} from './AbstractCqrsEvent';
import {TypeMismatchError} from '../errors/TypeMismatchError';
import {UnsupportedCqrsEvent} from '../errors/UnsupportedCqrsEvent';

/**
 * Abstract class that describes interface of Aggregate
 */
export class AbstractAggregate {

    /**
     *
     * @param {string} aggregateName
     */
    constuctor (aggregateName) {
        this._aggregateName = aggregateName;
        this.version = 0;
        this._uncommittedEvents = [];
    }

    /**
     * @returns {string}
     */
    get aggregateName () {
        return this._aggregateName;
    }

    /**
     * @returns {Array(AbstractEvents)}
     */
    get uncommittedEvents () {
        return this._uncommittedEvents;
    }

    /**
     * Clear list of uncommited events
     */
    clearUncommittedEvents () {
        this._uncommittedEvents = [];
    }

    /**
     * Rise new event
     * @param {AbstractCqrsEvent} event
     */
    rise (event) {
        try {
            this.applyEvent(event);
        }
        catch (e) {
            switch (true) {
                case (e instanceof UnsupportedCqrsEvent):
                    throw e;
                    break;
                default:
                    throw e;
            }
        }
        this._uncommittedEvents.push(event);
    }

    /**
     * Apply event to aggregate
     * @param {AbstractCqrsEvent} event
     */
    applyEvent (event) {
        if (!(event instanceof AbstractCqrsEvent)) {
            throw new TypeMismatchError('AbstractCqrsEvent', event);
        }
        const handlerName = 'on_'+event.name;
        if (typeof this[handlerName] !== 'function') {
            throw new UnsupportedCqrsEvent(event.name, this.aggregateName);
        }
    }
}