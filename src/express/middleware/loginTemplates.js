// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
var express = require('express'),
    templates = require('../../templates'),
    corsModule = require('../../cors');

module.exports = function (configuration) {
    var router = express.Router(),
        cors = corsModule(configuration.cors);

    router.get('/:template', function (req, res, next) {
        var template = templates.login[req.params.template],
            origin = req.query['completion_origin'];

        if(!template || !origin)
            throw error('badRequest', 'Invalid request');
        if(!cors.isAllowedOrigin(origin))
            throw error('unauthorized', 'Not a whitelisted origin: ' + origin);

        res.status(200).send(template(origin));
    });

    return router;
};

function error(type, message) {
    var error = new Error(message);
    error[type] = true;
    return error;
}
