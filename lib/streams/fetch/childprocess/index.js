'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _path = require('path');

var _child_process = require('child_process');

var spawn = function spawn(sender, binPath, url) {
    var child = (0, _child_process.spawn)(binPath, [(0, _path.join)(__dirname, '../../../phantom/fetch.js'), url]);

    child.on('close', function (status) {
        sender.emit('phantom.close', status);
    });

    child.stderr.on('data', function (data) {
        sender.emit('phantom.error', data);
    });

    return child;
};

exports.spawn = spawn;

