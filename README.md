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

To run application (it should be done under *cqrs* folder)

```{r, engine='bash', count_lines}
pm run build; npm run built
```

As a result you should see in console log of evaluation, please scroll to the beginning of the log and follow throw steps

  