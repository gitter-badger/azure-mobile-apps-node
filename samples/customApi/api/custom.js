// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
//
// This is an example of a custom API that essentially relays get and post requests
// to an 'internal' server, adding authentication and an additional piece of
// middleware to post requests

var checkHeader = require('../middleware/checkHeader'),
    agent = require('superagent-as-promised'),
    log = require('azure-mobile-apps/logger'),

    serviceUrl = 'http://internal.contoso.com/',

    api = module.exports = {
        get: function (req, res, next) {
            agent.get(serviceUrl)
                .query({ id: req.query.id })
                .then(respond)
                .catch(handleError)
        },
        post: [checkHeader, function (req, res, next) {
            agent.post(serviceUrl)
                .send({ id: req.query.id, content: req.body })
                .then(respond)
                .catch(handleError)
        }]
    }

api.post.access = 'authenticated'

function respond(res) {
    res.status(200).send(response.body)
}

function handleError(err) {
    log.error('An error occurred when connecting to ' + serviceUrl, err)
    res.status(500).send("There was a problem with the internal web service")
}
