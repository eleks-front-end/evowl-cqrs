import {AbstractLogWriter} from './AbstractLogWriter';
const fs = require('fs');

/**
 * Writes logs to file
 */
export class LogWriterToFile extends AbstractLogWriter {

    /**
     *
     * @param {Object} options - Options of WriterToFile
     * @param {string} options.filePath - Path to destination file
     */
    constructor ({filePath}) {
        super();
        this._filePath = filePath;
        this._streamReady = null;
        this._openFile();
    }

    /**
     * Open file to write lags
     * @protected
     */
    _openFile () {
        const stream = fs.createWriteStream(this._filePath, {
            flags: 'a', // Modify file, not replace
            defaultEncoding: 'utf8',
            fd: null,
            mode: 0o666,
            autoClose: true
        });
        // Save promise that will be resolved, when file opened
        this._streamReady = new Promise((resolve, reject) => {
            stream.on('open', fd => {
                this._fd = fd;
                resolve(stream);
            });
            stream.on('error', error => reject(error));
        });
        //TODO: process error
    }

    /**
     * Save log record
     * @param {string} item
     */
    save (item) {
        this._streamReady.then(stream => stream.write(item));
    }
}