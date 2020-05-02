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

    async save() {
        const content = await Course.readData();

        content.push({
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        });

        await this.writeData(content);        
    }

    static readData() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'), 
                'utf-8', 
                (err, content) =>  err ? reject(err) : resolve(JSON.parse(content))                
            );
        });
      
    }

    writeData(content) {
        return new Promise( (resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(content),
                (err) => err ? reject(err) : resolve()
            );
        })
    }

}

module.exports = Course;
