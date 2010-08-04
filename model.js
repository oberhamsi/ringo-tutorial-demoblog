var config = require('./config');
var dates = require('ringo/utils/date');

var Post = exports.Post = config.store.defineEntity('Post');
Post.prototype.toString = function() {
    return '[Post: ' + this.title + ' (' + this.author + ', ' +
        dates.format(this.createtime, 'dd.MM.yyyy') + ')]';
};

exports.Comment = config.store.defineEntity('Comment');
