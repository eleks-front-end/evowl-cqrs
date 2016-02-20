/**
 * Part of application public interface to allow command creation
 */
export class CommandFactory {

    constructor () {
        this._queries = {};
    }

    /**
     * Register new command class (constructor) in command factory
     * @param {AbstractCommand} commandCtor
     */
    registerCommand (commandCtor) {
        this._queries[commandCtor.name] = commandCtor;
    }

    /**
     * Check if command with specific name registered in factory
     * @param {string} name
     * @returns {boolean}
     */
    isCommand (name) {
        return this._queries[name] ? true : false;
    }

    /**
     * Create new command object
     * @param {string} name
     * @param {object} data
     * @returns {AbstractCommand}
     */
    create (name, data) {
        if (!this.isCommand(name)) {
            // TODO: write custom error
            throw new Error(`Command ${name} not registered in this node`);
        }
        return this._queries[name].create(data);
    }
}