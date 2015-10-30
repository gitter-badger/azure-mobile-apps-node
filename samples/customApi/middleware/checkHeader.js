// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
//
// A contrived example of checking an HTTP request header

module.exports = function (req, res, next) {
    if(req.get('custom-http-header') !== 'required-value')
        throw new Error('Required header value not present')
    next()
}
