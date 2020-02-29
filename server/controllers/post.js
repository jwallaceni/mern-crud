const Post = require('../models/post');
const slugify = require('slugify');

// create a database post entry
exports.create = (req, res) => {
    // console.log(req.body);
    const { title, content, user } = req.body;
    const slug = slugify(title);
    // validate
    switch (true) {
      case !title:
        return res.status(400).json({ error: 'Title is required' });
        break;
      case !content:
        return res.status(400).json({ error: 'Content is required' });
        break;
    }
    // create post
    Post.create({ title, content, user, slug }, (err, post) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: 'Duplicate post. Try another title' });
      }
      res.json(post);
    });
};

// read all database post entries
exports.list = (req, res) => {
  Post.find({})
  .limit(10)
  .sort({ createdAt: -1 })
  .exec((err, posts) => {
    if(err) console.log(err)
      res.json(posts);
  })
};

// read one database post entry, based on the slug
exports.read = (req, res) => {
  const { slug } = req.params;
  Post.findOne({ slug })
    .exec((err, post) => {
      if(err) console.log(err)
        res.json(post);
  })
};

// find one database entry and update
exports.update = (req, res) => {
  const { slug } = req.params;
  const { title, content, user } = req.body;
  Post.findOneAndUpdate({ slug }, { title, content, user }, { new: true }).exec((err, post) => {
      if (err) console.log(err);
      res.json(post);
  });
};

// find one database entry and delete
exports.remove = (req, res) => {
  // console.log(req.pramas.slug)
  const { slug } = req.params;
  Post.findOneAndRemove({ slug }).exec((err, post) => {
      if (err) console.log(err);
      res.json({
          message: 'Post deleted'
      });
  });
};