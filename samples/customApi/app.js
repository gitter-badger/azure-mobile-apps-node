var app = require('express')(),
    mobileApp = require('azure-mobile-apps')()

mobileApp.api.import('api')
app.use(mobileApp)
app.listen(process.env.PORT)
