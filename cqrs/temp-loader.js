#!/usr/bin/env node --use_strict

import {Application} from './core/Application';
import {NodeConfig} from './core/NodeConfig';
import {TempEventStoreAdapter} from './core/temp-implementation/TempEventStoreAdapter';
import {TempAggregateRepository} from './core/temp-implementation/TempAggregateRepository';
import {TempCommandBus} from './core/temp-implementation/TempCommandBus';
import {fooFeature} from './features/foo/';


//Configure our node
const config = new NodeConfig();

// Use Temp implementations of EventStoreAdapter, AggregateRepository, CommandBus
config.eventStoreAdapter = TempEventStoreAdapter;
config.aggregateRepository = TempAggregateRepository;
config.commandBus = TempCommandBus;
config.addFeature(fooFeature);

//Instantiate our application
const app = new Application(config);
app.init();

//Hack: push data to store
app.runtime.eventStoreAdapter._registerNewAggregate('1');

//Get public interface to work with our CQRS part
const pi = app.getPublicInterface();

//Create test command 'ping' Foo instance with uuid '1'
const command = pi.commandFactory.create('foo/ping', {requestID: '1', targetID: '1', byWho: 'Mr Jons'});

//execute our command
const result = pi.commandBus.execute(command);

//log result of the command to console
result.then(
    (// success
        result => console.log(result)
    ),
    (// error
        error => console.log(error.stack)
    )
);