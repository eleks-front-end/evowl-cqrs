import {AbstractAggregate} from '../../../core/abstraction/AbstractAggregate';
import {FooPingedEvent} from './../events/FooPingedEvent';
import {FooPongAnsweredEvent} from './../events/FooPongAnsweredEvent';

/**
 * The only one Aggregate of Foo feature
 * It can be pinged
 */
export class FooAggregate extends AbstractAggregate {
    static create (uuid) {
        return new FooAggregate(uuid);
    }

    /**
     *
     * @param {uuid} uuid
     */
    constructor (uuid) {
        super('foo', uuid);
    }

    /**
     * Ping our Foo object
     * @param {uuid} requestID
     * @param {string} byWho
     */
    ping (requestID, byWho) {
        const fooPinged = new FooPingedEvent(this.uuid, requestID, byWho);
        this.rise(fooPinged);
    }

    /**
     * Apply 'foo_pinged' event
     * @param {FooPingedEvent} event
     */
    apply_foo_pinged (event) {
        const fooPongAnswered = new FooPongAnsweredEvent(this.uuid, event.requestID, event.byWho);
        this.rise(fooPongAnswered);
    }

    /**
     * Apply 'foo_pong_answered' event - doing nothing
     * @param {FooPongAnsweredEvent} event
     */
    apply_foo_pong_answered (event) {
        // doing nothing
    }

}