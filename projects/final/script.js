const toggleHamburger = () => {
    document.getElementById('main-nav-links').classList.toggle('hide-nav-links');
}

window.onload = () => {
    document.getElementById('main-nav-hamburger').addEventListener('click', toggleHamburger);

    switch (window.location.href.split('/').reverse()[0]) {
        case 'menu.html':
            const btnCart = document.getElementById('btn-cart');
            btnCart.addEventListener('click', () => {
                window.location.href = 'cart.html';
            });
            break;
        default:
            break;
    }
}