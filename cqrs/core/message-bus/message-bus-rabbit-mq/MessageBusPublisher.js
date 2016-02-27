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
		this.channel = null;

		amqp.connect(host, (err, conn) => {
			if(err) {
				throw new Error('Connection error: ' + err);
			}
			conn.createChannel((err, ch) => {
				if(err) {
					throw new Error('Cannot create channel: ' + err);
				}
				ch.assertExchange(exchangerName, 'direct', {durable: false});
				this.channel = ch;
  			});
  			//TODO remove
  			setTimeout(function() { conn.close(); process.exit(0) }, 2000);
		});
	}

	get isConnected () {
		return !!this.channel;
	}

	/**
     * Publishes message to the messageBus, routes to corresponding queue by a key
     * @param {string} key
     * @param {string} message
     */
	publish (eventInstance) {
		if(!this.isConnected)
			throw new Error('Channel is not yet created');
		
		this.channel.publish(this._exchangerName, eventInstance.name, new Buffer(eventInstance.serialize()));
    	//TODO remove
    	console.log("[x] Sent %s with key %s", 'mess', eventInstance.name);
	}
}
