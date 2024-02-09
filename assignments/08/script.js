// Hamburger menu
const hamburgerButton = document.getElementById('main-nav-hamburger');
hamburgerButton.addEventListener('click', function() {
    const navLinks = document.getElementById('main-nav-links');
    navLinks.classList.toggle('hidden');
    if (navLinks.classList.contains('hidden')) {
        hamburgerButton.innerHTML = '▲';
        return;
    }
    hamburgerButton.innerHTML = '▼';
});

// Select Excercise
const labCommand = document.getElementById('command-label');
const labYoga = document.getElementById('yoga-label');
labCommand.addEventListener('click', function() {
    const yogaClasses = document.getElementById('yoga-section').classList;
    if (yogaClasses.contains('hidden')) {
        return;
    }
    document.getElementById('command-section').classList.remove('hidden');
    document.getElementById('yoga-section').classList.add('hidden');
});
labYoga.addEventListener('click', function() {
    const commandClasses = document.getElementById('command-section').classList;
    if (commandClasses.contains('hidden')) {
        return;
    }
    document.getElementById('command-section').classList.add('hidden');
    document.getElementById('yoga-section').classList.remove('hidden');
});


// Enter Command
const commandMap = {
    'b': './images/command/read.jpg',
    'c': './images/command/clown.jpg',
    'p': './images/command/birthday.jpg',
    'r': './images/command/rain.jpg',
    's': './images/command/shovel.jpg',
    'w': './images/command/work.jpg',
};

const commandInput = document.getElementById('command-input');
commandInput.addEventListener('keyup', function() {
    const command = commandInput.value[commandInput.value.length - 1];
    const commandImg = commandMap[command];
    document.getElementById('command-image').src = commandImg || './images/command/original.jpg';

    // if (command == 'w') {
    //     document.getElementById('command-image').src = './images/command/work.jpg';
    // } else if (command == 's') {
    //     document.getElementById('command-image').src = './images/command/shovel.jpg';
    // } else if (command == 'r') {
    //     //  etc...
    // } else {
    //     document.getElementById('command-image').src = './images/command/original.jpg';
    // }
});

// Yoga Slider
const yogaSlider = document.getElementById('yoga-slider');
const yogaImages = [
    './images/yoga/yoga1.jpg',
    './images/yoga/yoga2.jpg',
    './images/yoga/yoga3.jpg',
    './images/yoga/yoga4.jpg',
    './images/yoga/yoga5.jpg',
    './images/yoga/yoga6.jpg',
    './images/yoga/yoga7.jpg',
    './images/yoga/yoga8.jpg',
];

yogaSlider.addEventListener('input', function() {
    const index = yogaSlider.value;
    document.getElementById('yoga-image').src = yogaImages[index];

    // if (index === 0) {
    //     document.getElementById('yoga-image').src = './images/yoga/yoga1.jpg';
    // } else if (index === 1) {
    //     // etc...
    // }
});