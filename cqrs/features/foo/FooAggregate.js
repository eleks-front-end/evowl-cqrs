import {AbstractAggregate} from '../../core/abstraction/AbstractAggregate';

class FooAggregate extends AbstractAggregate {
    static create () {
        return new FooAggregate();
    }

    constructor () {
        super();
    }



}