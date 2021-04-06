const express = require('express')
const ejs = require('ejs')
const _ = require('lodash')

const app = express()

const PORT = process.env.PORT || 4200

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const posts = [
  {
    postName: 'post one',
    postBody: `Nisi quis dolor consequat velit velit aliqua laborum eu aliqua aliqua. Irure in commodo reprehenderit duis minim. Velit non magna voluptate proident duis fugiat tempor pariatur occaecat dolore esse cupidatat reprehenderit proident. Mollit do consequat proident reprehenderit magna aliquip aliqua voluptate cillum ut fugiat anim ullamco. Cupidatat irure minim nulla velit est eu ullamco eiusmod occaecat consectetur amet id. Dolore incididunt eiusmod excepteur anim amet velit non occaecat cupidatat aute sint adipisicing nulla irure. Ullamco cupidatat ad labore ipsum adipisicing duis.

Ex qui fugiat dolor occaecat aliquip cillum est elit eu anim in ad irure et. Fugiat exercitation dolor nostrud cillum mollit elit in laborum eu qui incididunt nostrud officia consequat. Lorem culpa qui aliqua in ex. Enim officia labore dolor nulla exercitation nostrud id adipisicing eu. Occaecat voluptate pariatur dolore ea ex aute laborum. Excepteur eu reprehenderit nulla incididunt proident id est ipsum ad excepteur.`,
    postLink: 'post-one'
  },
  {
    postName: 'post two',
    postBody: `Veniam proident dolore non esse dolore nulla adipisicing occaecat enim et esse velit. Proident aliqua magna fugiat commodo consectetur. Incididunt nulla tempor nisi laborum in cupidatat dolore elit occaecat ad est. Dolor aliqua tempor officia ut non labore nisi. Veniam esse consequat ex eu cupidatat dolor deserunt culpa id. Laborum dolore sit ea ea proident magna est qui consequat enim nulla esse id ad. Est laboris in labore laboris.

Pariatur irure esse in aliqua ea occaecat est consectetur mollit excepteur excepteur. Eiusmod voluptate mollit cupidatat exercitation ut in elit minim sit laborum ea mollit sunt. Ut veniam sit qui mollit. Eu nisi sint incididunt labore ex consectetur amet esse elit irure velit laboris amet.`,
    postLink: 'post-two'
  }
]

const homeStartingContent = `Nisi mollit veniam deserunt excepteur veniam culpa labore aliqua tempor eiusmod excepteur in commodo. Officia ex in pariatur incididunt voluptate nisi ad nostrud deserunt consequat proident. In Lorem fugiat sit incididunt ut fugiat reprehenderit consequat minim.
Dolore fugiat ut officia proident commodo qui. Aute sunt eiusmod velit tempor aliquip nisi pariatur aliquip dolore sunt mollit incididunt enim. Exercitation aliquip occaecat exercitation cupidatat qui in. Sint proident consequat excepteur tempor sint mollit labore. Labore anim tempor non sunt nulla est aliqua fugiat magna non. Elit eiusmod nulla pariatur cupidatat.
Sint cupidatat et ullamco irure est enim sit incididunt ex velit nostrud deserunt in. Exercitation aute cupidatat sint quis consequat Lorem sit labore labore. Nulla cupidatat eu officia Lorem incididunt duis quis Lorem mollit est ad minim. Qui laboris velit velit dolore cillum pariatur. Nostrud nisi commodo sit deserunt consectetur labore aliqua culpa.`;

const contactInfo = 'hello world'

const aboutInfo = 'Alex Wiegand'

app.get('/', (req, res) => {
  res.render('home', {homeStartingContent, posts})
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

app.post('/compose', (req, res) => {
  const { postBody, postName } = req.body
  const newPost = {
    postName, 
    postBody,
    postLink: _.kebabCase(postName)
  }
  posts.push(newPost)
  res.redirect('/')
})

app.get('/posts/:postName', (req, res) => {

  posts.forEach(post => {
    if(_.kebabCase(post.postName) === _.kebabCase(req.params.postName)){
      console.log('Found match!')
      res.render('post', {post})
    }
  })
})

app.listen(PORT, ()=>console.log(`Server running on Port:${PORT}`))