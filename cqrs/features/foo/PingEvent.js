import {AbstractCqrsEvent}  from '../../core/abstraction/AbstractCqrsEvent';

export class PingEvent extends AbstractCqrsEvent {

    constructor (data) {
        super('foo_pinged', data);
    }
}