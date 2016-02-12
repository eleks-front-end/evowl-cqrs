
export class NotImplementedError extends Error {
    constructor (method, abstraction) {
        super(`Method '${method}' of abstraction '${abstraction}' isn't implemented!`);
    }
}
