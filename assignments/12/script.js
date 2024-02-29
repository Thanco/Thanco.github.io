class House {
    constructor(name, size, bedrooms, bathrooms, features, main_image, floor_plans) {
        this.name = name;
        this.size = size;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.features = features;
        this.mainImageName = main_image;
        this.floorPlans = floor_plans;
    }

    get mainImage() {
        return `https://portiaportia.github.io/json/images/house-plans/${this.mainImageName}`;
    }

    get display() {
        return `
            <div class="house">
                <h2>${this.name}</h2>
                <div class="house-details">
                    <img src="${this.mainImage}" alt="Image of ${this.name}" class="main-image">
                    <div class="info">
                        <p><strong>Size:</strong> ${this.size}</p>
                        <p><strong>Bedrooms:</strong> ${this.bedrooms}</p>
                        <p><strong>Bathrooms:</strong> ${this.bathrooms}</p>
                        <p><strong>Features:</strong> *${this.features.join(' *')}</p>
                    </div>
                </div>
                <div class="house-floorplans">
                    ${this.floorPlans.map(floorplan => {
                        return floorplan.display;
                    }).join('')}
                </div>
            </div>
        `;
    }
}

class Floorplan {
    constructor(name, image) {
        this.name = name;
        this.imageName = image;
    }

    get image() {
        return `https://portiaportia.github.io/json/images/house-plans/${this.imageName}`;
    }

    get display() {
        return `
            <div class="floorplan">
                <h3>${this.name}</h3>
                <img src="${this.image}" alt="${this.name}">
            </div>
        `;
    }
}

const getHouses = async () => {
    const housesJson = await fetch('https://portiaportia.github.io/json/house-plans.json');
    const housesData = await housesJson.json();
    const houses = housesData.map(house => {
        const floorplans = house.floor_plans.map(floorplan => {
            return new Floorplan(floorplan.name, floorplan.image);
        });
        return new House(house.name, house.size, house.bedrooms, house.bathrooms, house.features, house.main_image, floorplans);
    });
    return houses;
}

getHouses().then(houses => {
    document.getElementById('main-content').innerHTML = houses.map(house => {
        return house.display;
    }).join('');
});
