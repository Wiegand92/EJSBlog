const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true})
.catch(err => console.error(err));

const postSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  postName: String,
  postBody: String
});

const Post = mongoose.model("Post", postSchema)

// const post = new Post({
//   _id: new mongoose.Types.ObjectId(),
//   postName: "test-post",
//   postBody: 'Tempor ipsum velit do commodo qui quis laboris culpa officia. Excepteur id esse nisi eu ad quis id irure aliqua esse.'
// });


// post.save()

module.exports = {Post}