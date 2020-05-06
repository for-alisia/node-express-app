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

        cartContent.price += +course.price;

        return new Promise( (resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cartContent), error => error ? reject(error) : resolve());
        })

    }

    static async fetch() {
        return new Promise( (resolve, reject) => {
            fs.readFile(p, 'utf-8', (error, content) => error ? reject(error) : resolve(JSON.parse(content)))
        })
    }

    static async removeById(id) {
        const cart = await CartModel.fetch();

        const index = cart.courses.findIndex( el => el.id === id );
        const course = cart.courses[index];

        if (course.count === 1) {
            cart.courses = cart.courses.filter( el => el.id !== id );
        } else {
            cart.courses[index].count--;
        }

        cart.price -= course.price;

        return new Promise( (resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), error => error ? reject(error) : resolve(cart));
        })
    }

}

module.exports = CartModel;