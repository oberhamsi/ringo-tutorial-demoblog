var filestore = require('ringo/storage/filestore');
var storePath = './db';
var store = new filestore.Store(storePath);

var dates = require('ringo/utils/dates');

var Post = exports.Post = store.defineEntity('Post');
Post.prototype.toString = function() {
    return '[Post: ' + this.title + ' (' + this.author + ', ' +
        dates.format(this.createtime, 'dd.MM.yyyy') + ')]';
};

exports.Comment = store.defineEntity('Comment');
