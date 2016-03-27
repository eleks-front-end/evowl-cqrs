import {AbstractDenormalizer} from '../../../core/abstraction/AbstractDenormalizer';
import {TempEventHandler} from '../../../core/temp-implementation/TempEventHandler';
import {FooPingedEvent} from '../events/FooPingedEvent';
import {FooPongAnsweredEvent} from '../events/FooPongAnsweredEvent';
import {PingPongView} from '../views/PingPongView';

export class PingPongDenormalizer extends AbstractDenormalizer {

    /**
     * Name of the denormalizer
     * @returns {string}
     */
    static get name () {
        return 'foo/ping-pong';
    }

    /**
     *
     * @param {TempViewRepository} viewRepository
     */
    constructor (viewRepository) {
        super(PingPongDenormalizer.name, viewRepository);
        this._eventHandlers = [];

        this._initEventHandlers();
    }

    /**
     * Init event handlers
     * @private
     */
    _initEventHandlers () {
        this._eventHandlers.push(new TempEventHandler(
            FooPingedEvent,
            event => this.on_Ping(event)
        ));

        this._eventHandlers.push(new TempEventHandler(
            FooPongAnsweredEvent,
            event => this.on_Pong(event)
        ));
    }

    /**
     * Process ping event
     * @param {FooPingedEvent} event
     * @private
     */
    on_Ping (event) {
        const view = new PingPongView(event.requestID, event.aggregateID, event.byWho);
        this._vr.put(view);
    }

    /**
     * Process PongAnswered event
     * @param {FooPongAnsweredEvent} event
     */
    on_Pong (event) {
        this._vr.get(event.requestID, PingPongView).then(
            (// view loaded
                view => {
                    view.setPong(event.dt, event.answer);
                    this._vr.put(view);
                }
            ),
            (// error loading view
                error => {
                    console.log('Processing event ', event);
                    console.log('Error loading view:', error);
                    console.log(error.stack);
                }
            )
        );
    }

    /**
     *
     * @returns {Array.<AbstractCqrsEventHandler>}
     */
    get eventHandlers () {
        return this._eventHandlers;
    }
}