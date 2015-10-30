// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
describe('azure-mobile-apps.express.integration.loginTemplates', function () {
    var expect = require('chai').expect,
        request = require('supertest-as-promised'),
        app = require('express')(),
        mobileApp = require('../../..')({ cors: { origins: ['contoso.com'] } });

    app.use(mobileApp);

    it('renders receiver when origin matches', function () {
        return request(app)
            .get('/crossdomain/loginreceiver?completion_origin=http://contoso.com')
            .expect(200)
            .expect(function (res) {
                expect(res.text).to.contain("recipientOrigin = 'http://contoso.com'");
            });
    });

    it('renders bridge when origin matches', function () {
        return request(app)
            .get('/crossdomain/bridge?completion_origin=http://contoso.com')
            .expect(200)
            .expect(function (res) {
                expect(res.text).to.contain("allowedOrigin = 'http://contoso.com'");
            });
    });

    it('returns 401 when origin does not match', function () {
        return request(app)
            .get('/crossdomain/bridge?completion_origin=http://contoso2.com')
            .expect(401);
    });

    it('returns 400 when origin is not specified', function () {
        return request(app)
            .get('/crossdomain/loginreceiver')
            .expect(400);
    });

    it('returns 400 when template is invalid', function () {
        return request(app)
            .get('/crossdomain/invalid?completion_origin=http://contoso.com')
            .expect(400);
    });
});
