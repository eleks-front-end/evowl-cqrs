var amqp = require('amqplib/callback_api');

/**
 * MessageBusPublisher class, creates a connection to the RabbitMQ server,
 * is able to publish messages
 */
export class MessageBusPublisher {

    /**
     * Creates a new RabbitMQ connection
     * @param {string} host
     * @param {string} exchangerName
     */
	constructor (host, exchangerName) {
		this._host = host;
		this._exchangerName = exchangerName;

		this._messageBusChannel = new Promise((resolve, reject) => {
			amqp.connect(host, (err, conn) => {
				if(err) {
					throw new Error('Connection error: ' + err);
				}
				conn.createChannel((err, channel) => {
					if(err) {
						throw new Error('Cannot create channel: ' + err);
					}
					channel.assertExchange(exchangerName, 'direct', {durable: false});
					resolve(channel);
  				});
  				//TODO remove
  				setTimeout(function() { conn.close(); process.exit(0) }, 500);
			});
		});
	};

    /**
     * Publishes message to the messageBus, routes to corresponding queue by a key
     * @param {string} key
     * @param {string} message
     */
	_publish (key, message) {
		var self = this;
		this._messageBusChannel.then(channel => {
    		channel.publish(self._exchangerName, key, new Buffer(message));
    		//TODO remove
    		console.log("[x] Sent %s with key %s", message, key);
		});
	};
}
