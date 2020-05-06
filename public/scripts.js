function toCurrency(price) {
    return new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(price);

}
document.querySelectorAll('.price').forEach( el => {
    el.textContent = toCurrency(el.textContent);   
});

const cart = document.querySelector('#cart');

if (cart) {
    cart.addEventListener('click', e => {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.dataset.id;

            fetch(`/cart/remove/${id}`, {
                method: 'delete'
            }).then(res => res.json())
              .then(cartContent => {
                  console.log(cartContent);

                  if (cartContent.courses.length) {
                      const html = cartContent.courses.map( el => {
                          return `
                        <tr>
                            <td>${el.title}</td>
                            <td>${el.count}</td>
                            <td class="price">${toCurrency(el.price)}</td>
                            <td><button class="btn btn-primary remove-item" data-id="${el.id}">Delete</button></td>
                        </tr>
                          `
                      }).join('');
                      const tbody = document.querySelector('tbody');
                      tbody.innerHTML = html;
                      document.getElementById('total').textContent = toCurrency(cartContent.price);
                  } else {
                    cart.innerHTML = '<p>Your cart is empty now. Look at our <a href="/courses">awesome courses</a></p>'
                  }
              })
        }
    });
}