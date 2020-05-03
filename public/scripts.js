document.querySelectorAll('.price').forEach( el => {
    el.textContent = Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(el.textContent);
})