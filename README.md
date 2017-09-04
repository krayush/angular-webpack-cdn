# angularjs-webpack-cdn
Angular 2 boilerplate with ability to 
* start a local CDN server, 
* generate custom fonts using webfont,
* generate bundles for production environment using Webpack
* use SCSS for styling
* use webpack for bundling
* use Angular 2 lazy loading with AOT and HMR

### What's included?
* [npm](https://www.npmjs.com/) for package manager
* [TypeScript](http://www.typescriptlang.org/) for the base language
* [Typings](https://github.com/typings/typings) for TypeScript definition manager
* [Yarn](https://www.npmjs.com/package/yarn) for installing dependencies with caching
* [Webpack](https://webpack.js.org/) for generating build

### Prerequisites
You need to have [Node.js and npm](https://nodejs.org/en/)
- Support Node v4 - latest
- Support npm v3 - latest
- Yarn (Optional) using **npm install -g yarn**

### Installation
* Install Dependency Checker (Optional)
```bash
npm install -g depcheck
```
* Go to the starter directory and install the packages (using npm):
```bash
npm install
```
* Go to the starter directory and install the packages (using yarn): (Optional)
```bash
yarn
```

### Generate Dev Build
For generating a build directory with all the app files bundled, run this command.  
Note: The build directory is neither under watch and nor is any file updated in build directory on any change.
Run npm run build for refreshing the build directory completely
```bash
npm run build:dev
```

### Generating Prod build
You can create prod build by running:
```bash
npm run build:prod
```

### Generating Prod build
You can create prod build with AOT compilation by running:
```bash
npm run build:aot:prod
```

### Start
For starting up the local CDN server, run:
```bash
npm start server:dev
```
and done! The browser will popup and you can start to see your app!  
Every changes to the files (ts/scss/html) will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

### External SCSS files
For adding external scss files to main.css, add them to 
```directory
 /
   |- src/assets/styles/main.scss
```

### External CSS files
For adding external css files to vendor.css, add them to following file and generate build:
```file
 /
   |- src/assets/styles/vendor.ts
```

### Adding a icon
For adding a new icon, just add the equivalent svg file to below path and generate build 
```directory
 /
   |- src/assets/custom-icons
```

### Using Debug mode
To enable debug mode: add this json config in localStorage.
* remoteServerUrl: is where the ajax requests hit in case you wish to set it/override it.  
* remoteCDNUrl: is where the requests for js/css/html goes in case you wish to set it/override it.
```json
"bootConfig": {
  "remoteCDNUrl": "http://localhost:3000/build/",
  "remoteServerUrl": "http://test.com:8080"
}
```

### Generating documentation
```bash
 npm run doc
```