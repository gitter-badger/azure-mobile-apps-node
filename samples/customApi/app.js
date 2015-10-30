// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
//
// A simple Mobile App with a single custom API

var app = require('express')(),
    mobileApp = require('azure-mobile-apps')()

mobileApp.api.import('./api')
app.use(mobileApp)
app.listen(process.env.PORT || 3000)
