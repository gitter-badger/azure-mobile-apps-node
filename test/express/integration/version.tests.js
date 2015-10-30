// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
var expect = require('chai').expect,
    supertest = require('supertest-as-promised'),
    express = require('express'),
    mobileApps = require('../../..'),
    app, mobileApp;

describe('azure-mobile-apps.express.integration.version', function () {
    it('attaches server version header', function () {
        app = express();
        mobileApp = mobileApps({ skipVersionCheck: true });
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem')
            .expect('x-zumo-server-version', 'node-' + require('../../../package.json').version);
    });

    it('does not attach version header if version is set to undefined', function() {
        app = express();
        mobileApp = mobileApps({ version: undefined, skipVersionCheck: true });
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem')
            .expect(function (res) {
                expect(res.headers['x-zumo-version']).to.be.undefined;
            });
    });

    it('does not attach version header if MS_DisableVersionHeader is specified', function() {
        process.env.MS_DisableVersionHeader = 'true';

        app = express();
        mobileApp = mobileApps({ skipVersionCheck: true });
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem')
            .expect(function (res) {
                expect(res.headers['x-zumo-version']).to.be.undefined;
                delete process.env.MS_DisableVersionHeader;
            });
    });

    it('returns 400 when appropriate api version is not specified', function () {
        app = express();
        mobileApp = mobileApps();
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem')
            .expect(400);
    });

    it('succeeds when appropriate api version is specified in a header', function () {
        app = express();
        mobileApp = mobileApps();
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem')
            .set('zumo-api-version', '2.0.0')
            .expect(200);
    });

    it('succeeds when appropriate api version is specified in a querystring', function () {
        app = express();
        mobileApp = mobileApps();
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem?zumo-api-version=2.0.0')
            .expect(200);
    });

    it('ignores api version when skipVersionCheck is set in configuration', function () {
        app = express();
        mobileApp = mobileApps({ skipVersionCheck: true });
        mobileApp.tables.add('todoitem');
        app.use(mobileApp);

        return supertest(app)
            .get('/tables/todoitem')
            .expect(200);
    });
});
