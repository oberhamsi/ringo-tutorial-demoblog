var config = require('./config');
var dates = require('ringo/utils/date');

var Post = exports.Post = config.store.defineEntity('Post');
Post.prototype.toString = function() {
    return '[Post: ' + this.title + ' (' + this.author + ', ' +
        dates.format(this.createtime, 'dd.MM.yyyy') + ')]';
};
Post.getById = function(id) {
    var posts = Post.query().equals('_id', id).select();
    if (posts.length > 1) {
        throw new Error('Multiple Posts for id ', id, ' found');
    } else if (posts.length == 1) {
        return posts[0];
    }
    return null;
};

exports.Comment = config.store.defineEntity('Comment');
