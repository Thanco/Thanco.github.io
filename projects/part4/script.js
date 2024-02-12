// Hamburger menu
const button = document.getElementById('main-nav-hamburger');
button.addEventListener('click', function() {
    document.getElementById('main-nav-links').classList.toggle('hide-nav-links');
});

console.log(window.location.href);
switch (window.location.href.split('/').reverse()[0]) {
    case 'menu.html':
        const btnCart = document.getElementById('btn-cart');
        btnCart.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
        break;
}
