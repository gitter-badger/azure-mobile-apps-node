// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
var templates = require('../src/templates'),
    expect = require('chai').expect;

describe('azure-mobile-apps.templates', function () {
    it('renders bridge', function () {
        expect(templates.login.bridge('localhost')).to.contain("allowedOrigin = 'localhost'");
    });

    it('renders index', function () {
        expect(templates.index()).to.contain('class="content"');
    });

    it('renders loginreceiver', function () {
        expect(templates.login.loginreceiver('localhost')).to.contain("recipientOrigin = 'localhost'");
    });
});
