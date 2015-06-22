'use strict';

import {args} from 'system';
import {create} from 'webpage';

let phantom = global.phantom;
let page = create();
let log = console.log;
let error = console.error;

const WAIT_TIMEOUT = 10000;

let printPageResponse = () => {
    try {
        log(page.evaluate(() => document.body.innerHTML));
    } catch(err) {
        error('[PRINGLES FETCH017] Page evaluation error.');
        error(err);
    } finally {
        phantom.exit();
    }
};

let handlePageOpen = (status) => {
    if (status !== 'success') {
        error('[PRINGLES FETCH020] Unable to access network.');

        phantom.exit();

        return;
    }

    setTimeout(printPageResponse, WAIT_TIMEOUT).unref();
};

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3)' +
    ' AppleWebKit/537.36 (KHTML, like Gecko)' +
    ' Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60';

if (args.length !== 2) {
    error('[PRINGLES FETCH014] Invalid number of arguments!');

    phantom.exit();
} else {
    page.open(args[1], handlePageOpen);
}
