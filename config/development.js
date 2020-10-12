// import path from 'path'
const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackCommon = require('./webpack-common')
const webpackDev = require('./webpack-dev')

const express = require('express');
const favicon = require('express-favicon');

const port = process.env.PORT || 8080;


function server() {
    const app = express();
    app.use(favicon(__dirname + '/public/favicon.png'));
    // the __dirname is the current directory from where the script is running
    app.use(express.static(__dirname));
    // send the user to index html page inspite of the url
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
    });
    app.listen(port);
}



process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = process.env.NODE_ENV === 'production'

function init(){
    const compiler = webpack(webpackDev)
    const webpackServer = new webpackDevServer(compiler,{
        historyApiFallback : true,
        stats: "errors-only"
    })
    webpackServer.listen(port,'localhost',()=>console.log(
        `Server listening on \x1b[42m\x1b[1mhttp://localhost:${process.env.PORT}\x1b[0m in \x1b[41m\x1b[0m `
      ))
}

if(isProd)
{
    // server()
    webpack([webpackCommon]).run((err, stats) => {
        console.log('error message ',err, '\n stats message',stats)
    })

}
else {
    init()
}