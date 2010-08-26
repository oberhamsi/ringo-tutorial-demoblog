var {Response} = require('ringo/webapp/response');
var model = require('./model');

exports.index = function index(req) {
    var posts = model.Post.query().select().slice(0,10);
    return Response.skin('skins/index.html', {
        posts: posts,
    });
};

exports.post = function post(req, id) {
    var post = model.Post.get(id);
    return Response.skin('skins/post.html', {
        post: post,
    });
};
