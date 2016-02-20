import {Feature} from '../../core/Feature';
import {FooAggregate} from './aggregates/FooAggregate';
import {PingCommandHandler} from './command-handlers/PingCommandHandler';
import {PingCommand} from './commands/PingCommand';
import {FooPingedEvent} from './events/FooPingedEvent';
import {FooPongAnsweredEvent} from './events/FooPongAnsweredEvent';
import {CheckPongQueryHandler} from './query-handlers/CheckPongQueryHandler';
import {CheckPongQuery} from './queries/CheckPongQuery';
import {PingPongDenormalizer} from './denormalizers/PingPongDenormalizer';

export const fooFeature = new Feature('Foo', '0.1.0')
                                .addAggregate(FooAggregate)
                                .addCommandHandler(PingCommandHandler)
                                .addCommand(PingCommand)
                                .addEvent(FooPingedEvent)
                                .addEvent(FooPongAnsweredEvent)
                                .addQueryHandler(CheckPongQueryHandler)
                                .addQuery(CheckPongQuery)
                                .addDenormalizer(PingPongDenormalizer);
