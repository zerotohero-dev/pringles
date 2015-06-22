'use strict';

var _system = require('system');

var _webpage = require('webpage');

var phantom = global.phantom;
var page = (0, _webpage.create)();
var log = console.log;
var error = console.error;

var WAIT_TIMEOUT = 10000;

page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3)' + ' AppleWebKit/537.36 (KHTML, like Gecko)' + ' Chrome/39.0.2171.95 Safari/537.36 OPR/26.0.1656.60';

if (_system.args.length !== 2) {
    error('[PRINGLES FETCH014] Invalid number of arguments!');

    phantom.exit();
} else {
    page.open(_system.args[1], function (status) {
        if (status !== 'success') {
            error('[PRINGLES FETCH020] Unable to access network.');

            phantom.exit();

            return;
        }

        setTimeout(function () {
            try {
                log(page.evaluate(function () {
                    return document.body.innerHTML;
                }));
            } catch (err) {
                error('[PRINGLES FETCH030] Page evaluation error.');
                error(err);
            } finally {
                phantom.exit();
            }
        }, WAIT_TIMEOUT).unref();
    });
}

