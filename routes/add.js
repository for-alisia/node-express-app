const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add new course',
        isAdd: true,
    });
});

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
