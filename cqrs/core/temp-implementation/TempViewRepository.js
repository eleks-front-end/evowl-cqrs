import {AbstractViewRepository} from '../abstraction/AbstractViewRepository';


/**
 * Temporary implementation of View Repository
 */
export class TempViewRepository extends AbstractViewRepository {

    constructor () {
        super();
        this._views = {};
    }

    /**
     * Get view by ID
     * @param viewID
     * @param {AbstractView} viewCtor
     * @returns {Promise.<*>}
     */
    get (viewID, viewCtor) {
        return Promise.resolve(viewCtor.restore(this._views[viewID]));
    }

    /**
     * Put or update view
     * @param viewID
     * @param view
     * @returns {Promise.<boolean>}
     */
    put (view) {
        this._views[view.viewID] = view.toJSON();
        return Promise.resolve(true);
    }
}