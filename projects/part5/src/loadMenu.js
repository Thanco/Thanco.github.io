class MenuItem {
    constructor(name, type, price, shortDescription, longDescription, allergens, imageName) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.allergens = allergens;
        this.imageName = imageName;
    }

    get image() {
        return `./img/menu/${this.imageName}`;
    }

    get allergenList() {
        return this.allergens.map(allergen => {
            return allergen;
        }).join(', ');
    }

    get display() {
        return `
        <div class="flex menu-item">
            <img src="${this.image}" alt="Item Image">
            <div class="two menu-item-text">
                <h2>${this.name}</h2>
                <p>${this.shortDescription}</p>
                <p>$${this.price}</p>
                <p>Contains: ${this.allergenList}</p>
            </div>
            <img src="./img/menu/angle-small-right.webp" alt="Arrow">
        </div>
        `;
    }
}

const getMenu = async () => {
    const menuJson = await fetch('./json/menu.json');
    if (!menuJson.ok) {
        throw new Error('Failed to fetch menu.');
    }
    const menu = await menuJson.json();
    return menu.map(item => {
        return new MenuItem(item.name, item.type, item.price, item.shortDescription, item.longDescription, item.allergens, item.imageName);
    });
};

getMenu().then(menu => {
    document.getElementById('menu-items').innerHTML = menu.map(item => item.display).join('');
});