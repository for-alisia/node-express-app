document.querySelectorAll('.price').forEach( el => {
    el.textContent = Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(el.textContent);
});

const cart = document.querySelector('#cart');

if (cart) {
    cart.addEventListener('click', e => {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.dataset.id;

            fetch(`/cart/remove/${id}`, {
                method: 'delete'
            }).then(res => res.json())
              .then(cart => {
                  console.log(cart);
              })
        }
    });
}