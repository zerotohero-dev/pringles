'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _streamsFetch = require('./streams/fetch');

var _streamsFetch2 = _interopRequireDefault(_streamsFetch);

var fetch = function fetch(url, callback) {
    var stream = _streamsFetch2['default'].create(url),
        buffer = '';

    stream.on('data', function (chunk) {
        buffer += chunk;
    });

    stream.on('error', function (err) {
        callback(null, err);

        stream.removeAllListeners();
        stream.end();
    });

    stream.on('end', function () {
        return callback(buffer, null);
    });
};

// TODO: save to file via stream piping.
// export save = (url, filePath) returns promise.
// TODO: fetch should return a promise too.

exports['default'] = fetch;
module.exports = exports['default'];

