# Azure Mobile Apps - Node SDK

**This package is still in development!** This software is still likely to change dramatically and have minimal documentation prior to official release. Use caution before using this in a production application.

The Azure Mobile Apps Node.js SDK is an [express](http://expressjs.com/) middleware package which makes it easy to create a backend for your mobile application and get it running on Azure.

```js
var app = require('express')(); // Create an instance of an Express app
var mobileApp = require('azure-mobile-apps')(); // Create an instance of a Mobile App with default settings

mobileApp.tables.add('TodoItem'); // Create a table for 'TodoItem' with default settings

app.use(mobileApp);
app.listen(process.env.PORT || 3000);
```

## Installation

`npm install --save azure-mobile-apps`

```json
"dependencies": {
  "azure-mobile-apps":"azure-mobile-apps-node"
}
```

An official npm package will be published soon.

## Documentation & Resources

 - [API Documentation](https://azure.github.io/azure-mobile-apps-node)
 - [Tutorials & How-Tos](https://azure.microsoft.com/en-us/documentation/articles/app-service-mobile-value-prop-preview/)
 - [StackOverflow #azure-mobile-services](http://stackoverflow.com/questions/new/azure-mobile-services?show=all&sort=recentlyactive&pageSize=50)
 - [MSDN Forums](https://social.msdn.microsoft.com/forums/azure/en-US/home?forum=azuremobile)
 - [Client & Server Quickstarts](https://github.com/Azure/azure-mobile-services-quickstarts)

## Quickstart

0. Create a new directory, initialize git, and initialize npm

  `mkdir quickstart`

  `git init`

  `npm init`

0. Install (with npm) the azure-mobile-apps and express packages

  `npm install express azure-mobile-apps --save`

0. Create a suitable .gitignore file.  You can generate a suitable .gitignore
file using the generator at [gitignore.io](https://www.gitignore.io)

0. Create a server.js file and add the following code to the file:

  ```js
  var app = require('express')(); // Create an instance of an Express app
  var mobileApp = require('azure-mobile-apps')(); // Create an instance of a Mobile App with default settings

  mobileApp.tables.add('TodoItem'); // Create a table for 'TodoItem' with default settings

  app.use(mobileApp);
  app.listen(process.env.PORT || 3000);
  ```

0. Run your project locally with `node server.js`

0. Publish your project to an existing Azure Mobile App by adding it as a remote and pushing your changes.

  `git remote add azure https://{user}@{sitename}.scm.azurewebsites.net:443/{sitename}.git`

  `git add package.json server.js`

  `git commit -m 'Quickstart created'`

  `git push azure master`

For steps 4-5, you can use any of the clients found in the [Client & Server Quickstarts](https://github.com/Azure/azure-mobile-services-quickstarts) to test.

## Contributing

For information on how to contribute to this project, please see the [contributor guide](https://github.com/Azure/azure-mobile-apps-node/blob/master/contributor.md).

## License

[MIT](./LICENSE)
