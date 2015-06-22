'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.printPageResponse = printPageResponse;
var log = console.log;
var error = console.error;
var phantom = global.phantom;

function printPageResponse(page) {
    try {
        log(page.evaluate(function () {
            return document.body.innerHTML;
        }));
    } catch (err) {
        error('[PRINGLES IO011] Page evaluation error.');
        error(err);
    } finally {
        phantom.exit();
    }
}

