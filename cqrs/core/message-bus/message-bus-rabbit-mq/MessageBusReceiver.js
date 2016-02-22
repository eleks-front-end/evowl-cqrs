var amqp = require('amqplib/callback_api');

/**
 * MessageBusReceiver class, creates a connection to the RabbitMQ server,
 * provides ability to subscribe on a queue by a key
 */
export class MessageBusReceiver {

    /**
     * Creates a new RabbitMQ connection
     * @param {string} host
     * @param {string} exchangerName
     */
	constructor (host, exchangerName) {
		this._host = host;
		this._exchangerName = exchangerName;

		this._eventBusConnection = new Promise((resolve, reject) => {
			amqp.connect(this._host, (err, conn) => {
				if(err) {
					throw new Error('Connection error: ' + err);
				}
				resolve(conn);
			});
		});
	}

    /**
     * Creates a new channel by a connection
     * @returns {Promise}
     */
	_createNewChannel () {
		var self = this;
		return new Promise((resolve, reject) => {
			self._eventBusConnection.then(conn => {
				conn.createChannel((err, ch) => {
					if(err) {
						throw new Error('Cannot create channel: ' + err);
					}
					resolve(ch);
				});
			});
		});
	}

    /**
     * Subscribes on a RabbitMQ queue with corresponding key, 
     * invokes callback when message is delivered
     * @param {string} key
     * @param {Function} callback
     */
	_subscribe (key, callback) {
		this._createNewChannel().then(channel => {
			channel.assertExchange(this._exchangerName, 'direct', {durable: false});

			channel.assertQueue('', {exclusive: true}, (err, q) => {
				if(err) {
					throw new Error('Cannot assert to queue: ' + err);
				}

  				//TODO remove
				console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
				channel.bindQueue(q.queue, this._exchangerName, key);

				channel.consume(q.queue, msg => {
					callback(msg);
					//tells RabbitMQ to proceed with the rest of the messages
					channel.ack(msg);
				}, {noAck: false});
			});
		});
	}
}
