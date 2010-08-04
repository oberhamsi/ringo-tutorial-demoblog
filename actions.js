var response = require('ringo/webapp/response');
var model = require('./model');

exports.index = function index(req) {
    var posts = model.Post.query().select().slice(0,10);
    return response.skinResponse('skins/index.html', {
        posts: posts,
    });
};

exports.post = function post(req, id) {
    var post = model.Post.getById(id);
    return response.skinResponse('skins/post.html', {
        post: post,
    });
};
