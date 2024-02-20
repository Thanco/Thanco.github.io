// Read the attributions file
const promiseAttributions = fetch('./images/attributions.html').then((response) => {
    // console.log(response);
    return response.text();
});

let images = [
    ['garden.jpg', ''],
    ['single-tree.jpg', ''],
    ['mountain-lake.jpg', ''],
    ['small-house.jpg', ''],
    ['snow.jpg', '']
];

const setImages = () => {
    const imageArea = document.getElementById('image-area');
    images.forEach((imageSet) => {
        const image = new Image();
        image.src = `./images/${imageSet[0]}`;
        imageArea.appendChild(image);
        const attribution = document.createElement('p');
        attribution.innerHTML = imageSet[1];
        imageArea.appendChild(attribution);   
    });
};

promiseAttributions.then((attributions) => {
    attributions = attributions.split('<p>');
    attributions.forEach((attribution, index) => {
        attribution = attribution.split('</p>')[0];
        images.forEach((image) => {
            if (attribution.toString().includes(image[0].split('.')[0])) {
                image[1] = attribution;
            }
        });
    });

    setImages();
});

const bannerAds = [
    'Wonderful Winter Sale! 50% off all winter images!',
    'The variety within these images is outstanding',
    'Each image is edited by our team of professionals',
    'We have a wide selection of images to choose from',
    'Our images are perfect for any project'
];

let currentBannerAd = 0;
const setBannerAd = () => {
    const banner = document.getElementById('banner');
    if (currentBannerAd >= bannerAds.length) {
        currentBannerAd = 0;
    }
    banner.innerText = bannerAds[currentBannerAd++];
};

setBannerAd();
setInterval(setBannerAd, 2000);
