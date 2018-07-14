# dash-ql

Create AppD dashboards at lightning speed with a query language

## How to Use

Haven't built electron libraries for each platform yet. You'll have to use the Development instructions

## Features
- [x] shortforms: (art = Average Response Time (ms), etc.)
- [x] headers
- [x] default metric format strings
- [x] AS
- [x] WHERE on a name/label with = or REGEX
- [x] electron app
- [x] add query to UI
- [x] specify dashboard name
- [x] stylize UI
- [x] add config to UI
- [ ] add tier to bts
- [ ] add a title
- [ ] more than just bts
- [ ] WHERE on metric values (current art > x)
- [ ] WHERE OR operator and nesting
- [ ] SORT BY
- [ ] LIMIT
- [ ] query autocomplete
- [ ] query validation
- [ ] HR status lights
- [ ] create multiple dashboards at once
- [ ] save queries
- [ ] more metric types: browser, mobile, DB, SIM, IoT
- [ ] styling/theming
- [ ] add logo
- [ ] table grid lines
- [ ] help docs
- [ ] prebuilt dashboards
- [ ] preview dashboard before deploying
- [ ] share dashboard formulas
- [ ] add more connection options like proxy
- [ ] add a cool logo
- [ ] add to tools page
- [ ] add gif to readme to show how easy it is

## Development

1. Checkout code from (GitHub)[https://github.com/Appdynamics/dash-ql]
1. Add your controller details to `config.json`
1. Download [nvm](https://github.com/creationix/nvm). Once nvm is installed, run `nvm install v8`
1. From the project directory, install dependencies with `npm install`
1. Run `npm run dev`

### Helpful Links

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


### Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```bash
DEBUG_PROD=true npm run package
```
