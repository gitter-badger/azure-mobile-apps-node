// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
//
// We can't be opinionated and set the express view engine. Our requirements are very basic,
// so for now, we're just using the simplest possible solution.

var util = require('util'),
    fs = require('fs'),
    path = require('path');

module.exports = {
    index: render('index'),
    login: {
        bridge: render('login/bridge'),
        loginreceiver: render('login/loginreceiver')        
    }
};

function render(name) {
    var templatePath = path.join(__dirname, name + '.html'),
        template = fs.readFileSync(templatePath, 'utf8');

    return function() {
        return util.format.apply(undefined, [template].concat(Array.prototype.slice.call(arguments)));
    }
}
