// Hamburger menu
const button = document.getElementById('main-nav-hamburger');
button.addEventListener('click', function() {
    document.getElementById('main-nav-links').classList.toggle('hide-nav-links');
});

const currentPage = document.getElementById('current-page');
switch (currentPage.innerHTML) {
    case 'Menu':
        const btnCart = document.getElementById('btn-cart');
        btnCart.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
        break;
}
