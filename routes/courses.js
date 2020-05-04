const {Router} = require('express');
const Course = require('../models/course');
const CartModel = require('../models/cart-model');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Course.readData();
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
});

router.get('/:id', async (req, res) => {
    const course = await Course.getCourseById(req.params.id);
    
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allows) {
        return res.redirect('/');
    }

    const course = await Course.getCourseById(req.params.id);

    res.render('course-edit', {
        title: `Edit ${course.title} course`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body);

    res.redirect('/courses');
})

router.post('/add-to-cart', async (req,res) => {
    
    const course = await Course.getCourseById(req.body.id);
    await CartModel.add(course);
    res.redirect('/cart');
})

module.exports = router;