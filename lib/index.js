'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _streamsFetch = require('./streams/fetch');

var _streamsFetch2 = _interopRequireDefault(_streamsFetch);

var fetch = function fetch(url, callback) {
    var stream = (0, _streamsFetch2['default'])(url),
        buffer = '';

    stream.on('data', function (chunk) {
        buffer += chunk;
    });

    stream.on('error', function (err) {
        callback(err, null);

        stream.removeAllListeners();
        stream.end();
    });

    stream.on('end', function () {
        return callback(null, buffer);
    });
};

// TODO: save to file via stream piping.
// export save = (url, filePath) returns promise.
// TODO: fetch should return a promise too.

exports['default'] = fetch;
module.exports = exports['default'];

