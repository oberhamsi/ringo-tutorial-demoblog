var {Response} = require('ringo/webapp/response');
var model = require('./model');
var log = require('ringo/logging').getLogger(module.id);
var base64 = require('ringo/base64');

function getAuthUser(req) {
    var credentials = base64.decode(req.headers.authorization
                        .replace(/Basic /, '')).split(':');
    return credentials.length && credentials[0];
}

exports.index = function index(req) {
    var posts = model.Post.query().select();
    return Response.skin('skins/adminindex.html', {
        posts: posts,
    });
};

exports.edit = {}
exports.edit.GET = function edit(req, id) {
    // output the model data for displaying
    var post = model.Post.get(id);
    var message = req.session.data.message;
    req.session.data.message = "";
    return Response.skin('skins/edit.html', {
        post: post,
        message: message,
    });
};
exports.edit.POST = function edit(req, id) {
    var post = model.Post.get(id);
    for each (var key in ['text', 'lead', 'title']) {
        post[key] = req.params[key];
    }
    post.save();
    req.session.data.message = "Successfully saved Post " + id;
    log.info('{} updated by {}', post, getAuthUser(req));
    return Response.redirect(req.path);
};

exports.create = {};
exports.create.GET = function create(req) {
    return Response.skin('skins/edit.html');
};

exports.create.POST = function create(req) {
    var post = new model.Post();
    for each (var key in ['text', 'lead', 'title']) {
        post[key] = req.params[key];
    }
    var user = getAuthUser(req);
    post.author = user;
    post.createtime = new Date();
    post.save();
    log.info('{} created by {}', post, user);
    // once the Post is stored, redirect to it's edit page
    return Response.redirect('./edit/' + post._id);
};
