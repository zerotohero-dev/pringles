'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pringles = require('pringles');

var _pringles2 = _interopRequireDefault(_pringles);

(0, _pringles2['default'])('http://www.wikiwand.com/en/Entropy', function (err, data) {
    if (err) {
        console.log('An error has occured:');
        console.log(err);

        return;
    }

    console.log('Rendered the page:');
    console.log(data);
});

