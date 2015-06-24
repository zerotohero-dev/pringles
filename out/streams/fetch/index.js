'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _util = require('util');

var _stream = require('stream');

var _childprocess = require('./childprocess');

var _init = require('./init');

var PRIVATE = Math.random().toString(36).replace(/[^a-z]+/g, '');

// TODO: make fetch timeout, and phantom processing timeout configurable.
// TODO: use a logger.
var FETCH_TIMEOUT = 20000;
var DEFAULT_PHANTOM_PATH = '/bin/phantomjs';

var FetchStream = function FetchStream(options) {
    _stream.Readable.call(undefined, options);

    if (!options.url) {
        return;
    }

    options.binPath = options.binPath || DEFAULT_PHANTOM_PATH;

    var process = (0, _childprocess.spawn)(undefined, options.binPath, options.url);

    undefined[PRIVATE] = { process: process };

    (0, _init.listen)(undefined, undefined[PRIVATE].process.stdout);

    setTimeout(undefined.endFetch.bind(undefined), FETCH_TIMEOUT).unref();
};

(0, _util.inherits)(FetchStream, _stream.Readable);

FetchStream.prototype.detach = function () {
    if (undefined.isDetached()) {
        return;
    }

    // End gracefully, instead of `destroy`ing.
    undefined[PRIVATE].process.stdout.end();
    undefined[PRIVATE].process.kill();
    undefined[PRIVATE].process = null;

    // Raises and 'end' event.
    undefined.push(null);
};

FetchStream.prototype.isDetached = function () {
    return !undefined[PRIVATE].process;
};

FetchStream.prototype.end = function () {
    if (undefined.isDetached()) {
        return;
    }

    undefined.detach();
};

FetchStream.prototype._read = function (size) {
    if (this.isDetached()) {
        return;
    }

    void size;

    this[PRIVATE].process.stdout.resume();
};

var create = function create(url) {
    return new FetchStream({ url: url });
};

exports['default'] = create;
module.exports = exports['default'];

