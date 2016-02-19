import {NodeConfig} from './NodeConfig';
import {TypeMismatchError} from './errors/TypeMismatchError';
import {CommandFactory} from './CommandFactory';
import {QueryFactory} from './QueryFactory';

/**
 * Is a basic container for some CQRS node, that could contain full list of nodes or just some part of them
 */
export class Application {

    /**
     *
     * @param {NodeConfig} config Configuration of certain node
     */
    constructor (config) {
        if (!(config instanceof NodeConfig)) {
            throw new TypeMismatchError('AbstractAggregateRepository', config);
        }
        this._config = config;
        this.runtime = {
            denormalizers: {}
        };
    }

    /**
     * Initialize our application
     * Here is all bootstraping are going on
     */
    init () {
        const runtime = this.runtime;
        const config = this._config;

        const eventBus = runtime.eventBus = new config.eventBus();
        runtime.eventStoreAdapter = new config.eventStoreAdapter(eventBus);
        const aggregateRepository = runtime.aggregateRepository = new config.aggregateRepository(runtime.eventStoreAdapter);
        const viewRepository = runtime.viewRepository = new config.viewRepository();
        const commandBus = runtime.commandBus = new config.commandBus();
        const queryBus = runtime.queryBus = new config.queryBus();

        const commandFactory = runtime.commandFactory = new CommandFactory();
        const queryFactory = runtime.queryFactory = new QueryFactory();
        config.features.forEach(
            feature => {
                //commands
                feature.commandHandlers.forEach(ch => commandBus.registerCommandHandler(new ch(aggregateRepository)));
                feature.commands.forEach(cmd => commandFactory.registerCommand(cmd));

                //queries
                feature.queryHandlers.forEach(qh => queryBus.register(new qh(viewRepository)));
                feature.queries.forEach(qvr => queryFactory.register(qvr));

                feature.denormalizers.forEach(dn => {
                    runtime.denormalizers[dn.name] = new dn(viewRepository);
                    runtime.denormalizers[dn.name].eventHandlers.forEach(eh => eventBus.registerEventHandler(eh))
                });
            }
        );
    }

    /**
     * Returns application public interface
     * @returns {{commandBus: (AbstractCommandBus), commandFactory: (CommandFactory)}}
     */
    getPublicInterface () {
        return {
            commandBus: this.runtime.commandBus,
            commandFactory: this.runtime.commandFactory,
            queryBus: this.runtime.queryBus,
            queryFactory: this.runtime.queryFactory
        }
    }

}
