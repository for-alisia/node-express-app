const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

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

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', routerHome);
app.use('/courses', routerCourses);
app.use('/add', routerAdd);
app.use('/cart', routerCart);

async function start() {
    try {
        const url = 'mongodb+srv://for-alisia:Max2607Romanov@clustertest-zi0j3.mongodb.net/test?retryWrites=true&w=majority'
        await mongoose.connect(url, {useNewUrlParser: true});
    
        
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        }   
    )        
    } catch (e) {
        console.log(e);
    }


}

start();


