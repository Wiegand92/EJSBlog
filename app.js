const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')

const {Post} = require('./server/db/db')

const app = express()

const PORT = process.env.PORT || 4200

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const posts = [];

const homeStartingContent = `Nisi mollit veniam deserunt excepteur veniam culpa labore aliqua tempor eiusmod excepteur in commodo. Officia ex in pariatur incididunt voluptate nisi ad nostrud deserunt consequat proident. In Lorem fugiat sit incididunt ut fugiat reprehenderit consequat minim.
Dolore fugiat ut officia proident commodo qui. Aute sunt eiusmod velit tempor aliquip nisi pariatur aliquip dolore sunt mollit incididunt enim. Exercitation aliquip occaecat exercitation cupidatat qui in. Sint proident consequat excepteur tempor sint mollit labore. Labore anim tempor non sunt nulla est aliqua fugiat magna non. Elit eiusmod nulla pariatur cupidatat.
Sint cupidatat et ullamco irure est enim sit incididunt ex velit nostrud deserunt in. Exercitation aute cupidatat sint quis consequat Lorem sit labore labore. Nulla cupidatat eu officia Lorem incididunt duis quis Lorem mollit est ad minim. Qui laboris velit velit dolore cillum pariatur. Nostrud nisi commodo sit deserunt consectetur labore aliqua culpa.`;

const contactInfo = 'hello world'

const aboutInfo = 'Alex Wiegand'

app.get('/', async (req, res) => {
  await Post.find({})
  .then(response => {
    response.forEach(post => posts.push(post))
  })
  .then(() => {
    res.render('home', {homeStartingContent, posts})
  })
  .catch(err => console.error(err))
})

app.get('/contact', (req, res)=> {
  res.render('contact', {contactInfo})
})

app.get('/about', (req, res) => {
  res.render('about', {aboutInfo})
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', async (req, res) => {
  const { postBody, postName } = req.body
  const newPost = {
    postName, 
    postBody,
    _id: new mongoose.Types.ObjectId()
  }
  const post = new Post(newPost)
  await post.save()
  .then(()=> {res.redirect('/')})
  .catch(err => console.error(err))
})

app.get('/posts/:postName', (req, res) => {
  posts.forEach(post => {
    if(post._id.toString() === req.params.postName.toString()){
      console.log('Found match!')
      res.render('post', {post})
    }
  })
})

app.listen(PORT, ()=>console.log(`Server running on Port:${PORT}`))