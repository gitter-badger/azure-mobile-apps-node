// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------

// translate http requests into a data operation
module.exports = {
    get: function (req, res) {
        var context = req.azureMobile;
        return context.data(context.table).read(context.query);
    },
    post: function (req, res) {
        var context = req.azureMobile;
        if(context.query)
            return context.data(context.table).undelete(context.id, context.version);
        else
            return context.data(context.table).insert(context.item);
    },
    patch: function (req, res) {
        var context = req.azureMobile;
        return context.data(context.table).update(context.item);
    },
    delete: function (req, res) {
        var context = req.azureMobile;
        return context.data(context.table).delete(context.id, context.version);
    }
}
