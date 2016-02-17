#!/usr/bin/env node --use_strict

import {Application} from './core/Application';
import {NodeConfig} from './core/NodeConfig';
import {TempEventStoreAdapter} from './core/temp-implementation/TempEventStoreAdapter';
import {TempAggregateRepository} from './core/temp-implementation/TempAggregateRepository';
import {TempCommandBus} from './core/temp-implementation/TempCommandBus';
import {fooFeature} from './features/foo/';


const config = new NodeConfig();
config.eventStoreAdapter = TempEventStoreAdapter;
config.aggregateRepository = TempAggregateRepository;
config.commandBus = TempCommandBus;
config.addFeature(fooFeature);

const app = new Application(config);
app.init();

//Hack: push data to store
app.runtime.eventStoreAdapter._registerNewAggregate('1');

const pi = app.getPublicInterface();
const command = pi.commandFactory.create('foo/ping', {requestID: '1', targetID: '1', byWho: 'Mr Jons'});

const result = pi.commandBus.execute(command);
result.then(
    (// success
        result => console.log(result)
    ),
    (// error
        error => console.log(error.stack)
    )
);