# evowl-cqrs

Install application

To run this application, please, ensure that you have nodejs version v5.2.0 or later and npm 3.3.12 or later

```{r, engine='bash', count_lines}
cd cqrs
npm install
```


To run application (it should be done under *cqrs* folder)

```{r, engine='bash', count_lines}
pm run build; npm run builded
```

As a result you should see in console:

```{r, engine='json'}
TempCommandExecutionResult {
  _command:
   foo/ping {
     _name: 'foo/ping',
     _requestID: '1',
     _targetID: '1',
     _byWho: 'Mr Jons' },
  _value: TempCommandExecutionSuccess { _result: true } }
```

It means, that our *ping* command of *Foo* feature have been executed. It doesn't mean that all processes in the system, 
related to *ping* command have been passed. It's only mean that our Foo aggregate processed ping command and have rised 
appropriate events in the system. And this event been saved to event store. Now they can be processed asynchronously by  
the system.

For now, part that can process occured events (e.g. Denowmalizers) not yet ready.
  