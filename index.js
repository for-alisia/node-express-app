const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const routerHome = require('./routes/home');
const routerCourses = require('./routes/courses');
const routerAdd = require('./routes/add');
const routerCart = require('./routes/cart');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use('/', routerHome);
app.use('/courses', routerCourses);
app.use('/add', routerAdd);
app.use('/cart', routerCart);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    }   
)