console.log('Hello, world!');

// Change image on click
const imageChange = document.getElementById("img-change");
imageChange.addEventListener('click', function() {
    imageChange.src = "./images/two.png";
    console.log("image clicked");
});

// rotate image with slider
const rotateImage = (degrees) => {
    // const image = document.getElementById("img-rotate");
    // image.style.transform = "rotate(" + degrees + "deg)";
    const root = document.querySelector(":root");
    root.style.setProperty('--rotate', degrees * 3.6 + "deg")
    console.log("rotate");
}

const slider = document.getElementById("range-slider");
slider.addEventListener('input', function() {
    console.log('slider value:' + this.value);
    const degrees = this.value;
    rotateImage(degrees);
});

// Add stars to the star section
const starSection = document.getElementById("star-space");
const root = document.querySelector(":root");
root.addEventListener('click', function() {
    if (starSection.childElementCount >= 8) {
        console.log("star limit reached");
        return;
    }
    const star = document.createElement("img");
    star.src = "./images/star.png";
    const div = document.createElement("div");
    div.appendChild(star);
    starSection.appendChild(div);
    console.log("star added");
});