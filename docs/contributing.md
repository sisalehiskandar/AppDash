# Contributing

Everyone is welcome to contribute to the project! Some ways to help out include:

- Providing good bug reports or use cases for future enhancements
- Writing docs
- Evangelizing the product
- Adding pretty dashboard templates
- Adding features and fixing bugs (will mentor you in writing JS)

A good place to start is the [Github Issues](https://github.com/appdynamics/appdash/issues) list.

## Running locally

1. Checkout code from the [GitHub project](https://github.com/Appdynamics/AppDash)
1. Install NodeJS by downloading [nvm](https://github.com/creationix/nvm). Once nvm is installed, run `nvm install v8`
1. From the project directory, install dependencies with `npm install`
1. Run `npm run dev`

## Code Editor

I suggest using the code editor [Visual Studio Code](https://code.visualstudio.com/), along with the extensions 'ESLint' and 'Prettier - Code formatter'. 

## Dev Links

API
- [Application Model API](https://docs.appdynamics.com/display/PRO44/Application+Model+API)
- [Metric and Snapshot API](https://docs.appdynamics.com/display/PRO44/Metric+and+Snapshot+API)

Libraries
- [electron](https://electronjs.org/)
- [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
- [css-modules](https://github.com/css-modules/css-modules)
- [electron-store](https://github.com/sindresorhus/electron-store)
- [request](https://github.com/request/request)
- [request-promise](https://github.com/request/request-promise)
- [bluebird](http://bluebirdjs.com/docs/api-reference.html)
- [css-modules](https://github.com/css-modules/css-modules)

## Packaging

```bash
$ npm run package-all
```

The files will be in the `release` folder:

- Windows - `AppDash Setup x.x.x.exe`
- Mac - `AppDash-x.x.x-mac.zip`

