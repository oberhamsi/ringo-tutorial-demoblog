exports.httpConfig = {
    staticDir: 'static',
    port: '8080',
};

exports.urls = [
    ['/', './actions'],
    ['/admin/', './adminactions']
];

exports.middleware = [
    'ringo/middleware/responselog',
    'ringo/middleware/error',
    'ringo/middleware/notfound',
    'ringo/middleware/basicauth'
];

// middleware/basicauth
exports.auth = {
    '/': {
        blogadmin: "e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4"
    }
};

exports.app = require('ringo/webapp').handleRequest;

exports.macros = [
    'ringo/skin/macros',
    'ringo/skin/filters',
];

var filestore = require('ringo/storage/filestore');
var storePath = './db';
exports.store = new filestore.Store(storePath);

exports.charset = 'UTF-8';
exports.contentType = 'text/html';
