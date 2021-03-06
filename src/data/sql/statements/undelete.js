// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// ----------------------------------------------------------------------------
var helpers = require('../helpers');

module.exports = function (table, id, version) {
    var tableName = helpers.formatTableName(table.schema || 'dbo', table.name),
        sql = "UPDATE " + tableName + " SET deleted = 0 WHERE [id] = @id",
        parameters = [{ name: 'id', value: id }];

    if (version) {
        sql += " AND [version] = @version ";
        parameters.push({ name: 'version', value: new Buffer(version, 'base64') });
    }

    sql += "; SELECT @@rowcount AS recordsAffected; SELECT * FROM " + tableName + " WHERE [id] = @id";

    return {
        sql: sql,
        parameters: parameters,
        multiple: true
    };
};
