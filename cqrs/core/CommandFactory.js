/**
 * Part of application public interface to allow command creation
 */
export class CommandFactory {

    constructor () {
        this._commandsDict = {};
    }

    /**
     * Create new command object
     * @param {string} cmd
     * @param {object} data
     * @returns {AbstractCqrsCommand}
     */
    create (cmd, data) {
        if (!this.isCommand(cmd)) {
            // TODO: write custom error
            throw new Error(`Command ${cmd} not registered in this node`);
        }
        return this._commandsDict[cmd].create(data);
    }

    /**
     * Check if command with specific cmd registered in factory
     * @param {string} cmd
     * @returns {boolean}
     */
    isCommand (cmd) {
        return this._commandsDict[cmd] ? true : false;
    }

    /**
     * Register new command class (constructor) in command factory
     * @param {AbstractCqrsCommand} commandCtor
     */
    registerCommand (commandCtor) {
        this._commandsDict[commandCtor.cmd] = commandCtor;
    }

    restore (serializedCmd) {
        return this.create(serializedCmd.cmd, serializedCmd.data);
    }
}