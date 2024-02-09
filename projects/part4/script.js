// Hamburger menu
const button = document.getElementById('main-nav-hamburger');
button.addEventListener('click', function() {
    document.getElementById('main-nav-links').classList.toggle('hide-nav-links');
});
