'use strict';

import {inherits} from 'util';
import {Readable} from 'stream';

import {spawn} from './childprocess';
import {listen} from './init';

const PRIVATE = Math.random().toString(36).replace(/[^a-z]+/g, '');

// TODO: make fetch timeout, and phantom processing timeout configurable.
// TODO: use a logger.
const FETCH_TIMEOUT = 20000;
const DEFAULT_PHANTOM_PATH = '/bin/phantomjs';

let FetchStream = (options) => {
    Readable.call(this, options);

    if (!options.url) {return;}

    options.binPath = options.binPath || DEFAULT_PHANTOM_PATH;

    let process = spawn(this, options.binPath, options.url);

    this[PRIVATE] = {process: process};

    listen(this, this[PRIVATE].process.stdout);

    setTimeout(this.endFetch.bind(this), FETCH_TIMEOUT).unref();
};

inherits(FetchStream, Readable);

FetchStream.prototype.detach = () => {
    if (this.isDetached()) {return;}

    this[PRIVATE].process.stdout.destroy();
    this[PRIVATE].process = null;

    this.push(null);
};

FetchStream.prototype.isDetached = () => {
    return !this[PRIVATE].process;
};

FetchStream.prototype.endFetch = () => {
    if (this.isDetached()) {return;}

    this.detach();
    this[PRIVATE].process.stdout.kill();
};

FetchStream.prototype._read = function(size) {
    if (this.isDetached()) {return;}

    void size;

    this[PRIVATE].process.stdout.resume();
};

export default FetchStream;
