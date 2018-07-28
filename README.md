# AppDash

Create AppD dashboards at lightning speed with a query language

## Download

You can download the latest Mac and Windows releases here: https://github.com/Appdynamics/AppDash/releases/latest

For Mac: Unzip the file, then drag it to your Applications folder

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
- [x] calculate width/height of dashboard based upon widgets
- [x] tell user if query can't be parsed
- [x] make default alignment better and support different widths per column type
- [x] dashboard with row per application
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
- [ ] allow for custom metric paths
- [ ] table grid lines
- [ ] help docs
- [ ] prebuilt dashboards
- [ ] preview dashboard before deploying
- [ ] share dashboard formulas
- [ ] add more connection options like proxy
- [ ] add a cool logo
- [ ] add to tools page
- [ ] add gif to readme to show how easy it is
- [ ] add multiple sections to one dashboard

## Development

1. Checkout code from (GitHub)[https://github.com/Appdynamics/AppDash]
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

Feel free to open an issue on [GitHub Issues](https://github.com/appdynamics/AppDash/issues)

## Maintainer

Created and maintained by Daniel Arrizza. You can reach me at daniel (dot) arrizza (at) appdynamics.com

