'use strict';

import {handlePageOpen} from '../handlers';

let error = console.error;
let phantom = global.phantom;

export function prepare(page) {
    page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3)' +
        ' AppleWebKit/537.36 (KHTML, like Gecko)' +
        ' Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60';
}

export function run(page, args) {
    if (args.length !== 2) {
        error('[PRINGLES FETCH041] Invalid number of arguments!');

        phantom.exit();
    } else {
        page.open(args[1], (status) => {handlePageOpen(page, status)});
    }
}
