/**
 * Abstract class describes Denormalizer interface
 */
export class AbstractDenormalizer {

    /**
     *
     * @param {string} name
     * @param {AbstractViewRepository} viewRepository
     */
    constructor (name, viewRepository) {
        this._name = name;
        this._vr = viewRepository;
    }
}
