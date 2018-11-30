# [jedijava.com](http://www.jedijava.com) front project


## Install dependencies

```
npm install
```


## Develop locally with webpack-dev-server
1. Run

```
npm run dev
```

2. In your browser, navigate to: [http://localhost:8088/](http://localhost:8088/)
## For bundled output

```
npm run build
```

## For production-ready output

```
npm run build:prod
```

### Loaders
* babel-loader
* html-loader
* sass-loader
* css-loader
* style-loader
* file-loader

### Plugins
* clean-webpack-plugin
* mini-css-extract-plugin
* html-webpack-plugin

### DIR

```
|-- project-name
    |-- .babelrc
    |-- .gitignore
    |-- favicon.ico
    |-- LICENSE
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- webpack.base.js
    |-- webpack.config.js
    |-- src
        |-- assets  //公共静态资源
        |   |-- media
        |   |   |-- avatar.jpg
        |   |-- scss
        |       |-- bootstrap.custom.scss
        |-- pages  //多页面输出目录
        |   |-- index.html  //备注 js文件名需与html文件名保持一致
        |   |-- index.js
        |   |-- index.scss
        |   |-- login
        |       |-- login.html
        |       |-- login.js
        |       |-- login.scss
        |-- tpl //复用页面模板目录
            |-- article
            |   |-- loading.html
            |   |-- overview.html
            |-- header
                |-- header.html

```
