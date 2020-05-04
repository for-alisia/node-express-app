const {Router} = require('express');
const Course = require('../models/course');
const CartModel = require('../models/cart-model');
const router = Router();

router.get('/', async (req, res) => {
    const cart = await CartModel.fetch();
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        cart
    })
});

module.exports = router;