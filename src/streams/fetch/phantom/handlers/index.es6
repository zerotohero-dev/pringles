'use strict';

import {printPageResponse} from '../io';

let phantom = global.phantom;
let error = console.error;

const WAIT_TIMEOUT = 10000;

let handlePageOpen = (page, status) => {
    if (status === 'success') {
        setTimeout(
            () => printPageResponse(page),
            WAIT_TIMEOUT
        ).unref();

        return;
    }

    error('[PRINGLES FETCH026] Unable to access network.');

    phantom.exit();
};

export {handlePageOpen};