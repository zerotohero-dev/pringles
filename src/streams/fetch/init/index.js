'use strict';

let listen = (owner, ownedStream) => {
    ownedStream.on('data', (data) => {
        if (owner.push(data)) {return;}

        ownedStream.pause();
    });

    ownedStream.on('error', (err) => {
        owner.emit('error', err);

        owner.endFetch();
    });

    ownedStream.on('end', () => {
        owner.endFetch();
    });
};

export {listen};
