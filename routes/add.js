const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add new course',
        isAdd: true
    });
});

router.post('/', (req, res) => {
    const course = new Course(req.body);

    res.redirect('/courses');
});

module.exports = router;