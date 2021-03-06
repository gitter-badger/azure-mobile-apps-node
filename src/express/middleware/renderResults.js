// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
var log = require('../../logger');

﻿// render results attached to response object to the client in JSON format
module.exports = function (req, res, next) {
    if(res.results) {

        preventCaching();

        // if we were issued a query for a single result (i.e. query by id), return a single result
        if(req.azureMobile.query && req.azureMobile.query.single) {
            // if we were returned a single object by custom user code, return that here
            if(res.results.constructor !== Array) {
                if(res.results.recordsAffected === undefined || res.results.recordsAffected > 0)
                    res.status(200).json(res.results);
                else
                    res.status(404).end();
            } else if(res.results.length > 0) {
                addETag(res.results[0]);
                res.status(200).json(res.results[0]);
            } else {
                res.status(404).end();
            }
        } else {
            if(res.recordsAffected === 0)
                res.status(404).end();
            else {
                addETag(res.results);
                res.status(200).json(res.results);
            }
        }
    } else
        res.status(404).end();

    function addETag(item) {
        res.set('ETag', '"' + item.version + '"');
    }

    function preventCaching() {
        // this is very nasty, but the simplest way I can find to circumvent the default express/fresh behaviour for 304s
        req.headers['if-modified-since'] = undefined;
        req.headers['if-none-match'] = undefined;
        res.set('cache-control', 'no-cache');
        res.set('expires', 0);
        res.set('pragma', 'no-cache');
    }
}
