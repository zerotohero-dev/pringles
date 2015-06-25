'use strict';

import {join} from 'path';
import {spawn as cSpawn} from 'child_process';

let spawn = (sender, binPath, url) => {
    let child = cSpawn(binPath, [
        join(__dirname, '../phantom/index.js'), url
    ]);

    child.on('close', (status) => {
        sender.emit('phantom.close', status);
    });

    child.stderr.on('data', (data) => {
        sender.emit('phantom.error', data);
    });

    return child;
};

export {spawn};
