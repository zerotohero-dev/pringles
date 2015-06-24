'use strict';

let listen = (owner, ownedStream) => {
    ownedStream.on('data', (data) => {
        if (owner.push(data)) {return;}

        ownedStream.pause();
    });

    ownedStream.on('error', (err) => {
        owner.emit('error', err);

        owner.end();
    });

    ownedStream.on('end', () => {
        owner.end();
    });
};

export {listen};
