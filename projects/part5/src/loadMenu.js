class MenuItem {
    constructor(name, type, price, shortDescription, longDescription, allergens, image) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.allergens = allergens;
    this.image = this.getImage(image);
    }

    getImage(image) {
        return `./img/menu/${image}`;
    }

    get allergenList() {
        const allergens = this.allergens.map(allergen => {
            return allergen;
        }).join(', ');
        allergens = allergens.slice(0, allergens.length - 2);
        return allergens;
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
    const menu = await menuJson.json();
    return menu.map(item => {
        return new MenuItem(item.name, item.type, item.price, item.short_description, item.long_description, item.allergens, item.image);
    });
};

getMenu().then(menu => {
    document.getElementById('menu-main-content').innerHTML = menu.map(item => item.display).join('');
});