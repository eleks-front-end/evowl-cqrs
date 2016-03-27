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
        this._ready = null;
        this._logger = config.logger;
        this._localLogger = this._logger.getInterface(this.constructor.name);
    }

    /**
     * Promise that will be resolved when application ready
     * @returns {null|Promise.<RabbitMQConnector>|*}
     */
    get ready () {
        return this._ready;
    }

    /**
     * Initialize our application
     * Here is all bootstraping are going on
     * @returns {Promise} Ready promise
     */
    init () {
        this._localLogger.info('Start app initialization', null, 'init');

        const runtime = this.runtime;
        const config = this._config;

        const eventBus = runtime.eventBus = new config.eventBus();
        runtime.eventStoreAdapter = new config.eventStoreAdapter(eventBus);
        const aggregateRepository = runtime.aggregateRepository = new config.aggregateRepository(runtime.eventStoreAdapter);
        const viewRepository = runtime.viewRepository = new config.viewRepository();
        const rabbitMQConnector = new config.rabbitMQConnector({host: config.rabbitMQHost});


        const commandFactory = runtime.commandFactory = new CommandFactory();
        const queryFactory = runtime.queryFactory = new QueryFactory();
        let commandBus;
        let queryBus;

        this._ready = rabbitMQConnector.connect().then(() => {
            commandBus = runtime.commandBus = new config.commandBus(
                this._logger,
                rabbitMQConnector,
                config.commandBusExchange,
                commandFactory
            );
            return commandBus.ready;
        }).then(() => {
            queryBus = runtime.queryBus = new config.queryBus();

            config.features.forEach(
                feature => {
                    this._localLogger.info(`Loading feature ${feature.name}`, {version: feature.version}, 'init');

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
        }).then(
            () => this._localLogger.info('App initialization finished, App ready to use', null, 'init')
        ).catch(
            error => {
                this._localLogger.emerg('App initialization failed', error, 'init');
                throw error;
            }
        );

        return this._ready;
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
