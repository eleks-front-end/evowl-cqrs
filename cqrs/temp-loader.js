#!/usr/bin/env node --use_strict

import {Application} from './core/Application';
import {NodeConfig} from './core/NodeConfig';
import {TempEventStoreAdapter} from './core/temp-implementation/TempEventStoreAdapter';
import {TempAggregateRepository} from './core/temp-implementation/TempAggregateRepository';
import {TempCommandBus} from './core/temp-implementation/TempCommandBus';
import {TempQueryBus} from './core/temp-implementation/TempQueryBus';
import {TempViewRepository} from './core/temp-implementation/TempViewRepository';
import {TempEventBus} from './core/temp-implementation/TempEventBus';
import {fooFeature} from './features/foo/';


//Configure our node
const config = new NodeConfig();

// Use Temp implementations of EventStoreAdapter, AggregateRepository, CommandBus
config.eventStoreAdapter = TempEventStoreAdapter;
config.aggregateRepository = TempAggregateRepository;
config.commandBus = TempCommandBus;
config.viewRepository = TempViewRepository;
config.queryBus = TempQueryBus;
config.eventBus = TempEventBus;
config.addFeature(fooFeature);

//Instantiate our application
const app = new Application(config);
app.init();

//Hack: push data to store
app.runtime.eventStoreAdapter._registerNewAggregate('1');

//Get public interface to work with our CQRS part
const pi = app.getPublicInterface();


console.log('//////////////////////////////////////////////////////////////////');
console.log('//// Application execution');
console.log('//////////////////////////////////////////////////////////////////');

//Create test command 'ping' Foo instance with uuid '1'
console.log('\n\n1) Preparing new command');
console.log('   Command object - is instance of specific command class that holds all data needed to interpreter our intention  and make appropriate manipulations with our model');
console.log('   We use CommandFactory of our public interface to prepare the command');
const command = pi.commandFactory.create('foo/ping', {requestID: '1', targetID: '1', byWho: 'Mr Jons'});
console.log('   Here is our command object');
console.log(command);

//execute our command
console.log('\n\n2) Executing our command');
const result = pi.commandBus.execute(command);
console.log('   It is async process, so we getting Promise object and waiting while it resolved');

//log result of the command to console
result.then(
    (// success
        result => {
            if (result.isSuccess) {
                console.log('\n\n3) Command executed successfully');
                console.log('   here is our execution result object');
                console.log(result);
                console.log('\n\n   Result object have some useful properties');
                console.log('   result.error:', result.error);
                console.log('   result.result:', result.result);
                console.log('\n   Also we can check if it error or success using appropriate properties');
                console.log('   result.isError:', result.isError);
                console.log('   result.isSuccess:', result.isSuccess);

            } else {
                console.log('   Command execution failed, we\'ve been eable to catch error');
                console.log('   here is our execution result object', result)
            }

        }
    ),
    (// error
        error => {
            console.log('   During execution unexpected errors occured');
            console.log(error);
            console.log(error.error.stack)
        }
    )
);


// In CQRS part processing of events by denormalizers are async, so let's give some time to the system to process them
setTimeout(() => {
    console.log('\n\n4) Now we going to lookup view that represents result of our command: PingPongView');
    console.log('   In CQRS all commans processed asynchronously, so lets wait a bit while system reflect all changes ');
    console.log('   ...waiting go 100 miliseconds...  ');

    console.log('\n\n5) Now we going to prepare our query');
    console.log('   For this we using QueryFactory of our public interface');
    const query = pi.queryFactory.create('foo/check-pong', {requestID: '1'});
    console.log('   here our query object:');
    console.log(query);

    console.log('\n\n6) Executing our query');
    const viewQuery = pi.queryBus.execute(query);
    console.log('   It is also async process, so we getting Promise object and waiting while it resolved');
    viewQuery.then(
        (
            result => {
                console.log('\n\n7) Query executed successfully');
                console.log('   here is our result object');
                console.log(result);
                console.log('\n\n   It holds our view object with data:');
                console.log(result.result);
                console.log('\n\n   And of course we can get raw JSON');
                console.log('   view.toJSON():');
                console.log(result.result.toJSON());
            }
        ),
        (
            error => console.log(error, error.stack)
        )
    ).then(() => console.log('\n\n\nPlease scroll up to see exectuion log step by step\n\n'));

}, 100);