# dash-ql

Create AppD dashboards at lightning speed with a query language

## Download

Mac: https://github.com/Appdynamics/dash-ql/releases/download/v1.0.0-beta-1/dash-iq-1.0.0.dmg

Windows: https://github.com/Appdynamics/dash-ql/releases/download/v1.0.0-beta-1/dash-iq.Setup.1.0.0.exe

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
- [x] tell user if 'create dashboard' was successful or not
- [x] support more than one application
- [ ] calculate height of dashboard based upon row heights
- [ ] make default alignment better
- [ ] tell user if query can't be parsed
- [ ] add tier to bts
- [ ] add a title
- [ ] more than just bts
- [ ] WHERE on metric values (current art > x)
- [ ] WHERE OR operator and nesting
- [ ] WHERE IN operator
- [ ] SORT BY
- [ ] LIMIT
- [ ] update an existing dashboard
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
1. Install NodeJS by downloading [nvm](https://github.com/creationix/nvm). Once nvm is installed, run `nvm install v8`
1. From the project directory, install dependencies with `npm install`
1. Run `npm run dev`

### Code Editor

I suggest using the code editor Visual Studio Code, along with the extensions 'ESLint' and 'Prettier - Code formatter'. 

### Dev Links

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

```bash
$ npm run package-all
```

## Contributing

Feel free to open an issue on [GitHub Issues](https://github.com/appdynamics/dash-ql/issues)

## Maintainer

Created and maintained by Daniel Arrizza. You can reach me at daniel (dot) arrizza (at) appdynamics.com

