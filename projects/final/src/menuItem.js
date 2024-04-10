class MenuItem {
    constructor(name, type, price, shortDescription, longDescription, allergens, image64) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.allergens = allergens;
        this.image64 = image64;
    }

    get image() {
        return `data:image/jpg;base64,${this.image64}`;
    }

    get allergenList() {
        const list = Array.from(this.allergens);
        list.push(`and ${list.pop()}`);
        return list.map(allergen => {
            return allergen;
        }).join(', ');
    }

    get display() {
        const display = document.createElement('div');
        display.classList.add('flex', 'menu-item');
        display.innerHTML = this.displayContent();
        display.onclick = (e) => {
            document.getElementById('menu-item-details').replaceWith(this.detailsDisplay);
        };

        return display;
    }

    displayContent = () => {
        return `
            <img src="${this.image}" alt="${this.name} Thumbnail">
            <div class="two menu-item-text">
                <h2>${this.name}</h2>
                <p>${this.shortDescription}</p>
                <p>$${this.price}</p>
                <p>Contains: ${this.allergenList}</p>
            </div>
            <img src="./img/menu/angle-small-right.webp" alt="Arrow">
        `;
    }

    get detailsDisplay() {
        const display = document.createElement('div');
        display.id = 'menu-item-details';
        display.classList.add( 'one', 'flex');
        this.detailsDisplayContent().then(content => 
            display.innerHTML = content
        );

        return display;
    }

    detailsDisplayContent = async () => {
        return `
            <div class="one">
                <h2>Customization</h2>
                ${await this.customizationOptionsDisplay()}
            </div>
        </div>
        <div class="two right">
            <img src="${this.image}" alt="${this.name} Picture" class="alt-item-img">
            <p>${this.longDescription}</p>
            <p>Allergy Information: Contains ${this.allergenList}. May contain traces of nuts and other allergens.</p>
            <button>
                <p>Add to Cart</p>
            </button>
        </div>
        `;
    }

    customizationOptionsDisplay = async () => {
        const request = fetch(`./menuCustomizations/${this.type}.html`).catch(error => console.log(error));
        console.log(request);

        const customizations = await request;
        console.log(customizations);
        return customizations;
    }

    static fromJson(json) {
        return new MenuItem(json.name, json.type, json.price, json.shortDescription, json.longDescription, json.allergens, json.image64);
    }

    toJson() {
        return {
            name: this.name,
            type: this.type,
            price: this.price,
            shortDescription: this.shortDescription,
            longDescription: this.longDescription,
            allergens: this.allergens,
            image64: this.image64
        };
    }
}
