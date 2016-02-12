import {NodeConfig} from './NodeConfig';
import {TypeMismatchError} from './errors/TypeMismatchError';
/**
 * Is a basic container for some CQRS node, that could contain full list of nodes or just some part of them
 */
export class Application {

    /**
     *
     * @param {NodeConfig} config
     */
    constructor (config) {
        if (!(config instanceof NodeConfig)) {
            throw new TypeMismatchError('AbstractAggregateRepository', config);
        }
        this._config = config;
        this.runtime = {};
    }

    init () {
        const runtime = this.runtime;
        const config = this._config;
        runtime.aggregateRepository = new config.aggregateRepository(config.eventStoreAdapter);
        runtime.commandBus = new config.commandBus();
    }

    registerFeature () {

    }


}
