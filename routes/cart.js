const {Router} = require('express');
const Course = require('../models/course');
const CartModel = require('../models/cart-model');
const router = Router();

router.get('/', async (req, res) => {
    const cart = await CartModel.fetch();
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses: cart.courses,
        price: cart.price
    })
});

router.delete('/remove/:id', async (req, res) => {
    const cart = await CartModel.removeById(req.params.id);
    
    res.json(cart)
})

module.exports = router;