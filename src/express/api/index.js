// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
/**
@module azure-mobile-apps/express/api
@description This module contains functionality for adding custom apis to an Azure
Mobile App. It returns a router that can be attached to an express app with
some additional functions for registering apis.
*/
var express = require('express'),
    loader = require('../../configuration/loader'),
    logger = require('../../logger'),
    assert = require('../../utilities/assert').argument,
    authorize = require('../middleware/authorize'),
    supportedVerbs = ['get', 'post', 'put', 'patch', 'delete'];

/**
Create an instance of an express router for routing and handling api requests.
@param {configuration} configuration
@returns An express router with additional members described below.
*/
module.exports = function (configuration) {
    var router = express.Router();

    /**
    Register a single api with the specified definition.
    @function add
    @param {string} name - The name of the api. HTTP operations will be exposed on this route.
    @param {apiDefinition} definition - The definition for the api
    */
    router.add = function (name, definition) {
        assert(name, 'An api name was not specified');
        var apiRouter = express.Router();

        Object.getOwnPropertyNames(definition).forEach(function (property) {
            if (supportedVerbs.some(function (verb) { return verb === property; })) {
                if (definition.authorize || definition[property].authorize) {
                    definition[property].authorize = true;
                    logger.debug("Adding authorization to " + property + " for api " + name);
                }
                logger.debug("Adding method " + property + " to api " + name);
                apiRouter[property]('/', buildMiddlewareArray(definition[property]));
            } else if (property !== 'authorize') {
                logger.warn("Unrecognized property '" + property + "' in api " + name);
            }
        });

        router.use('/' + name, apiRouter);
    };

    // definition is either a function, an array of functions, or an array-like object
    // returns a middleware function or an array of middleware function
    function buildMiddlewareArray(definition) {
        var middlewareArray = definition;

        // if array-like object convert to array
        // {'0': addHeader, '1': return200, authorize: true} should convert to [addHeader,return200]
        var length = 0;
        while(definition.hasOwnProperty(length))
            length++;
        if (length) {
            middlewareArray.length = length;
            middlewareArray = Array.prototype.slice.call(middlewareArray);
        }

        if (definition.authorize)
            middlewareArray = [authorize].concat(middlewareArray);

        return middlewareArray;
    }

    /**
    Import a file or folder of modules containing api definitions
    @function import
    @param {string} path Path to a file or folder containing modules that export a {@link apiDefinition}
    The path is relative to configuration.basePath that defaults to the location of your startup module.
    The api name will be derived from the physical file name.
    */
    router.import = function (path) {
        assert(path, 'A path to api configuration file(s) was not specified');
        var apis = loader.loadPath(path, configuration.basePath);
        Object.keys(apis).forEach(function (name) {
            var definition = apis[name];

            if (definition && definition.name)
                name = definition.name;

            router.add(name, definition);
        });
    };

    return router;
}
