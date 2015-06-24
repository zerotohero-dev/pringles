'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.handlePageOpen = handlePageOpen;

var _io = require('../io');

var phantom = global.phantom;
var error = console.error;

var WAIT_TIMEOUT = 10000;

function handlePageOpen(page, status) {
    if (status === 'success') {
        setTimeout((0, _io.printPageResponse)(page), WAIT_TIMEOUT).unref();

        return;
    }

    error('[PRINGLES FETCH026] Unable to access network.');

    phantom.exit();
}

