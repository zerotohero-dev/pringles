'use strict';

import fetch from 'pringles';

fetch('http://www.wikiwand.com/en/Entropy', function(err, data) {
    if (err) {
        console.log('An error has occured:');
        console.log(err);

        return;
    }

    console.log('Rendered the page:');
    console.log(data);
});
