const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://nn-admin:nnnodecc123@conteusz.maotu.mongodb.net/nn-node?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => app.listen(3000))
    .catch((error) => console.log(error));

// register view engine
app.set('view engine', 'ejs');

// middleware & static file
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => res.redirect('/blogs'));
app.get('/about', (req, res) => res.render('about', { title: "About"}));

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => res.status(404).render('404', { title: "404"}));
