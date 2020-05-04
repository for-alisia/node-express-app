const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class CartModel {

    static async add(course) {
        const cartContent = await CartModel.fetch();

        const courseIndex = cartContent.courses.findIndex( el => el.id === course.id );
        const candidate = cartContent.courses[courseIndex];

        if (candidate) {
            cartContent.courses[courseIndex].count++;
        } else {
            course.count = 1;
            cartContent.courses.push(course);
        }

        cartContent.price += course.price;

        return new Promise( (resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cartContent), error => error ? reject(error) : resolve());
        })

    }

    static async fetch() {
        return new Promise( (resolve, reject) => {
            fs.readFile(p, 'utf-8', (error, content) => error ? reject(error) : resolve(JSON.parse(content)))
        })
    }

}

module.exports = CartModel;