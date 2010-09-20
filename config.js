exports.httpConfig = {
    port: '8080',
};

exports.urls = [
    ['/', require('./actions')],
    ['/admin/', require('./adminactions')]
];

// middleware/basicauth
var authConfig = {
    '/admin/': {
        blogadmin: "e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4"
    }
};

exports.middleware = [
    require('ringo/middleware/gzip').middleware,
    require('ringo/middleware/etag').middleware,
    require('ringo/middleware/static').middleware(module.resolve('public')),
    require('ringo/middleware/responselog').middleware,
    require('ringo/middleware/error').middleware,
    require('ringo/middleware/notfound').middleware,
    require('ringo/middleware/basicauth').middleware(authConfig),
];

exports.app = require('ringo/webapp').handleRequest;

exports.macros = [
    'ringo/skin/macros',
    'ringo/skin/filters',
];

exports.charset = 'UTF-8';
exports.contentType = 'text/html';
