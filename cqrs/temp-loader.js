#!/usr/bin/env node --use_strict

import {Application} from './core/Application';
import {NodeConfig} from './core/NodeConfig';
import {TempEventStoreAdapter} from './core/temp-implementation/TempEventStoreAdapter';
import {TempAggregateRepository} from './core/temp-implementation/TempAggregateRepository';
import {TempCommandBus} from './core/temp-implementation/TempCommandBus';
import {fooFeature} from './features/foo/';


const config = new NodeConfig();
config.eventStoreAdapter = new TempEventStoreAdapter();
config.aggregateRepository = new TempAggregateRepository();
config.commandBus = new TempCommandBus();
config.addFeature(fooFeature);

const app = new Application(config);
app.init();

