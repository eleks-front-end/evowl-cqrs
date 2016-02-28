import {AbstractEventStoreAdapter} from '../abstraction/AbstractEventStoreAdapter';

class MemoryAdapter extends AbstractEventStoreAdapter {

    constructor (eventBus) {
        super(eventBus);
        this._aggregates = {};
        this._events = [];
        this._eventBus = eventBus;
    }

    readAllEvents (uuid) {
        if (!this.isAggregateRegistered(uuid)) return null;
        return this._getAggregateEvents(uuid);
    }

    writeEvents (uuid, originalVersion = 0, events) {
        return new Promise ((resolve, reject) => {
            if (!this.isAggregateRegistered(uuid)) this._registerNewAggregate(uuid);

            this._getAggregate(uuid).then((aggregate) => {
                let version = aggregate.version;
                if (version !== originalVersion) throw new Error("Aggregate's version mismatch");

                events.forEach(event => {
                    version++;
                    this._updateAggregate(uuid, {version});
                    this._eventBus.push(event);
                });
                this._events.push.apply(events.map(event => {...event, ag_uuid: uuid}));
            });
            resolve(true);
        });
    }

    _registerNewAggregate () {
        this._aggregates[uuid] = {
            uuid: uuid,
            version: 0,
            events: []
        };
    }

    isAggregateRegistered (uuid) {
        return Promise.resolve(this._aggregates[uuid] ? true : false);
    }

    _getAggregateEvents (uuid) {
        return Promise.resolve(this._events.filter(event => event.ag_uuid === uuid));
    }

    _getAggregate (uuid) {
        return Promise.resolve(this._aggregates[uuid]);
    }

    _updateAggregate (uuid, {version}) {
        this._getAggregate(uuid).then(aggregate => {
            this._aggregates[uuid] = Object.assing({}, aggregate, {version});
        });
    }

}

export default MemoryAdapter;
