const uuid = require('uuid').v4;
const path = require('path');
const fs = require('fs');

class Course {
    constructor(course) {
        this.title = course.title;
        this.price = course.price;
        this.image = course.image;
        this.id = uuid();
    }

    save() {
        
    }

}

