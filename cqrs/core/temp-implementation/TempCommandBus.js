import {AbstractCommandBus}  from  '../abstraction/AbstractCommandBus';

/**
 * Temporary implementation of CommandBus
 * this implementation created in order to show basic example of work of CQRS architecture
 */
export class TempCommandBus extends AbstractCommandBus {

    constructor () {
        super();
        this._commandHandlers = [];
    }

    /**
     * Execute command, return promise that will be resoved with executeion result.
     * @param {AbstractCqrsCommand} command
     */
    execute (command) {
        const ch = this._commandHandlers.find(ch => ch.match(command));
        if (ch === undefined) {
            throw new Error("No command handlers for such command", command);
        }
        return ch.execute(command);
    }

    /**
     * Register command handler in command bus, command bust will be able to route command
     * @param {AbstractCommandHandler} commandHandler
     */
    registerCommandHandler (commandHandler) {
        this._commandHandlers.push(commandHandler);
    }
}