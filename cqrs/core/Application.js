import {NodeConfig} from './NodeConfig';
import {TypeMismatchError} from './errors/TypeMismatchError';
import {CommandFactory} from './CommandFactory';

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
        this.runtime = {};
    }

    /**
     * Initialize our application
     */
    init () {
        const runtime = this.runtime;
        const config = this._config;
        runtime.eventStoreAdapter = new config.eventStoreAdapter();
        runtime.aggregateRepository = new config.aggregateRepository(runtime.eventStoreAdapter);
        const commandBus = runtime.commandBus = new config.commandBus(runtime.aggregateRepository);
        const commandFactory = runtime.commandFactory = new CommandFactory();
        config.features.forEach(
            feature => {
                feature.commandHandlers.forEach(ch => commandBus.registerCommandHandler(ch));
                feature.commands.forEach(cmd => commandFactory.registerCommand(cmd));
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
            commandFactory: this.runtime.commandFactory
        }
    }

}
