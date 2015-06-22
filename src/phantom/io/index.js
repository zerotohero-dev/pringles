'use strict';

let log = console.log;
let error = console.error;
let phantom = global.phantom;

export function printPageResponse(page) {
    try {
        log(page.evaluate(() => document.body.innerHTML));
    } catch(err) {
        error('[PRINGLES IO011] Page evaluation error.');
        error(err);
    } finally {
        phantom.exit();
    }
}