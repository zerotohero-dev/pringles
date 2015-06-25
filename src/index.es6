'use strict';

import createStreamFromUrl from './streams/fetch';

let fetch = (url, callback) => {
    let stream = createStreamFromUrl(url),
        buffer = '';

    stream.on('data', (chunk) => {
        buffer += chunk;
    });

    stream.on('error', (err) => {
        callback(err, null);

        stream.removeAllListeners();
        stream.end();
    });

    stream.on('end', () => callback(null, buffer));
};

// TODO: save to file via stream piping.
// export save = (url, filePath) returns promise.
// TODO: fetch should return a promise too.

export default fetch;
