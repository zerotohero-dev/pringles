'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var listen = function listen(owner, ownedStream) {
    ownedStream.on('data', function (data) {
        if (owner.push(data)) {
            return;
        }

        ownedStream.pause();
    });

    ownedStream.on('error', function (err) {
        owner.emit('error', err);

        owner.end();
    });

    ownedStream.on('end', function () {
        owner.end();
    });
};

exports.listen = listen;

