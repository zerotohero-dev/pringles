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

function FetchStream(options) {
    Readable.call(this, options);

    if (!options.url) {return;}

    options.binPath = options.binPath || DEFAULT_PHANTOM_PATH;

    let process = spawn(this, options.binPath, options.url);

    this[PRIVATE] = {process: process};

    listen(this, this[PRIVATE].process.stdout);

    setTimeout(() => this.end(), FETCH_TIMEOUT).unref();
}

inherits(FetchStream, Readable);

FetchStream.prototype.detach = function() {
    if (this.isDetached()) {return;}

    // End gracefully, instead of `destroy`ing.
    this[PRIVATE].process.stdout.end();
    this[PRIVATE].process.kill();
    this[PRIVATE].process = null;

    // Raises and 'end' event.
    this.push(null);
};

FetchStream.prototype.isDetached = function() {
    return !this[PRIVATE].process;
};

FetchStream.prototype.end = function() {
    if (this.isDetached()) {return;}

    this.detach();
};

FetchStream.prototype._read = function(size) {
    if (this.isDetached()) {return;}

    void size;

    this[PRIVATE].process.stdout.resume();
};

let create = (url) => new FetchStream({url: url});

export default create;
