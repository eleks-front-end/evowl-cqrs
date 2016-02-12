/**
 * Abstract class to define CommandBus interface
 */
export class AbstractCommandBus {
    /**
     * Execute command, return promise that will be resoved with executeion result.
     * (command: AbstractCommand) => Promise
     */
    execute (command) {
        throw new NotImplementedError('execute', 'CommandBus');
    }

    /**
     * Register command handler in command bus, command bust will be able to route command
     * (commandHandler: AbstractCommandHandler) => void
     */
    registerCommandHandler (commandHandler) {
        throw new NotImplementedError('registerCommandHandler', 'CommandBus');
    }
}
