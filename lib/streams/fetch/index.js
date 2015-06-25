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

function FetchStream(options) {
    var _this = this;

    _stream.Readable.call(this, options);

    if (!options.url) {
        return;
    }

    options.binPath = options.binPath || DEFAULT_PHANTOM_PATH;

    var process = (0, _childprocess.spawn)(this, options.binPath, options.url);

    this[PRIVATE] = { process: process };

    (0, _init.listen)(this, this[PRIVATE].process.stdout);

    setTimeout(function () {
        return _this.end();
    }, FETCH_TIMEOUT).unref();
}

(0, _util.inherits)(FetchStream, _stream.Readable);

FetchStream.prototype.detach = function () {
    if (this.isDetached()) {
        return;
    }

    // End gracefully, instead of `destroy`ing.
    this[PRIVATE].process.stdout.end();
    this[PRIVATE].process.kill();
    this[PRIVATE].process = null;

    // Raises and 'end' event.
    this.push(null);
};

FetchStream.prototype.isDetached = function () {
    return !this[PRIVATE].process;
};

FetchStream.prototype.end = function () {
    if (this.isDetached()) {
        return;
    }

    this.detach();
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

