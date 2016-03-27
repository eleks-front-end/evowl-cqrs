# evowl-cqrs

Install application

To run this application, please, ensure that you have nodejs version v5.2.0 or later and npm 3.3.12 or later

Also you should have RabbitMQ, see installation instructions here: https://www.rabbitmq.com/download.html

```{r, engine='bash', count_lines}
cd cqrs
npm install
```

Ensure that RabbitMQ server running.
If your RabbitMQ server running not on localhost, than you have to edit file cqrs/temp-loader.js and change constant
 rabbitMQHost.
 
Before running application you have to create configuration file. The simpliest way is to copy default config:
```{r, engine='bash', count_lines}
cp config/default.js config/dev.js
```
Please, do not commit this file to repository! Otherwise we will constantly have conflicts in configuration.
 
You might want edit some options:
* __rabbitMQHost__ - Host of RabbitMQ server
* __commandBusExchange__ - Exchange name of CommandBus based on RabbitMQ
* __logger__ - Configuration of the logger. It array of objects, each object configures log handler. 
Each log handler consists of *filter*, *formatter* and *writer*. By default we have one log handler enabled, that write all log to file, so you might want change file path.
Please not, that if you run system on Windows, you must change file path (or logger configuration).
  

###### Writes
For now we have few available writers:
* __LogWriterToConsole__ - This writer output all logs to console.
* __LogWriterToFile__ - Outputs all logs to file. As an options it accept *filePath* - string that represent path to file where to store options.
 * __LogWriterNone__ - This writer doing nothing, it just ignores all incoming logs. You might want temproary enable it if you have some problems with logger.

To run application (it should be done under *cqrs* folder)

```{r, engine='bash', count_lines}
npm run build; npm run built
```

As a result you should see in console log of evaluation, please scroll to the beginning of the log and follow throw steps

  