// Hamburger menu
const toggleHamburger = (hamburgerButton) => {
    const navLinks = document.getElementById('main-nav-links');
    navLinks.classList.toggle('hidden');
    if (navLinks.classList.contains('hidden')) {
        hamburgerButton.innerHTML = '▲';
        return;
    }
    hamburgerButton.innerHTML = '▼';
}

// Select Excercise
const selectOne = () => {
    const yogaClasses = document.getElementById('sec-2').classList;
    if (yogaClasses.contains('hidden')) {
        return;
    }
    document.getElementById('sec-1').classList.remove('hidden');
    document.getElementById('sec-2').classList.add('hidden');
};
const selectTwo = () => {
    const commandClasses = document.getElementById('sec-1').classList;
    if (commandClasses.contains('hidden')) {
        return;
    }
    document.getElementById('sec-1').classList.add('hidden');
    document.getElementById('sec-2').classList.remove('hidden');
};

// Bounce Ball
let started = false;
const startButton = document.getElementById('btn-start');
const toggleStart = () => {
    started = !started;
    if (started) {
        startButton.innerHTML = 'Stop';
        return;
    }
    startButton.innerHTML = 'Start';
}

const root = document.querySelector(':root')
let ballDist = 0;
let direction = 'down';
const maxDist = document.getElementById('bounce-area').offsetHeight - document.getElementById('ball').offsetHeight;
const changeBall = () => {
    if (!started) {
        return;
    }
    if (ballDist < maxDist) {
        switch (direction) {
            case 'down':
                root.style.setProperty('--current-bounce-dist', `${ballDist++}px`);
                break;
            case 'up':
                root.style.setProperty('--current-bounce-dist', `${maxDist - ballDist++}px`);
                break;
            default:
                break;
        }
        return;
    }
    ballDist = 0;
    direction = direction === 'down' ? 'up' : 'down';
}

// Yoga Fun
const yogaDescriptions = [
    'Extended Side Angle',
    'Downard Dog',
    'Warrior II',
    'Seated Side Bend',
    'Crossed Tree',
    'Forward Lunge',
    'Half Lunge Reverse Lean',
    'Wall Push',
];
const yogaDesc = document.getElementById('yoga-desc');
const setDesc = (index) => {
    yogaDesc.innerHTML = yogaDescriptions[index];
}

window.onload = () => {
    const hamburgerButton = document.getElementById('main-nav-hamburger');
    hamburgerButton.onclick = toggleHamburger.bind(null, hamburgerButton);

    document.getElementById('label-1').onclick = selectOne;
    document.getElementById('label-2').onclick = selectTwo;

    startButton.onclick = toggleStart;
    setInterval(changeBall, 1);

    document.querySelectorAll('#yoga-list li').forEach((li, index) => {
        li.onclick = setDesc.bind(null, index);
    });
}