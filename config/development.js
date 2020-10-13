// import path from 'path'
const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackCommon = require('./webpack-common')
const webpackDev = require('./webpack-dev')

const express = require('express');
const favicon = require('express-favicon');

const port = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = process.env.NODE_ENV === 'production'

function init(){
    const compiler = webpack(webpackDev)
    const webpackServer = new webpackDevServer(compiler,{
        historyApiFallback : true,
        stats: "errors-only"
    })
    webpackServer.listen(port,'localhost',()=>console.log(
        `Server listening on \x1b[42m\x1b[1mhttp://localhost:${port}\x1b[0m in \x1b[41m\x1b[0m `
      ))
}

if(isProd)
{
    webpack([webpackCommon]).run((err, stats) => {
        console.log('error message ',err, '\n stats message',stats)
    })

}
else {
    init()
}