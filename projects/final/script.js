const toggleHamburger = () => {
    document.getElementById('main-nav-links').classList.toggle('hide-nav-links');
}

window.onload = () => {
    document.getElementById('main-nav-hamburger').addEventListener('click', toggleHamburger);
}