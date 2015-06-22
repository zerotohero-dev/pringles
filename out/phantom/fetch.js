'use strict';

var _system = require('system');

var _webpage = require('webpage');

var _init = require('./init');

(function () {
    var page = (0, _webpage.create)();

    (0, _init.prepare)(page);
    (0, _init.run)(page, _system.args);
})();

