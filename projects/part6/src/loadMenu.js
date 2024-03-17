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

    static fromJson(json) {
        return new MenuItem(json.name, json.type, json.price, json.shortDescription, json.longDescription, json.allergens, json.imageName);
    }

    toJson() {
        return {
            name: this.name,
            type: this.type,
            price: this.price,
            shortDescription: this.shortDescription,
            longDescription: this.longDescription,
            allergens: this.allergens,
            imageName: this.imageName
        };
    }

}

const menu = [];

// const checkExists = (item) => {
//     for (let i = 0; i < menu.length; i++) {
//         if (menu[i].equals(item)) {
//             return true;
//         }
//     }
//     return false;
// }

const loadMenuDatabase = async () => {
    const menuResponse = await fetch('https://thanco.github.io/projects/part5/json/menu.json');
    if (!menuResponse.ok) {
        throw new Error('Failed to fetch menu.');
    }
    const menuJson = await menuResponse.json();
    menuJson.map(item => {
        const newItem = MenuItem.fromJson(item);
        // if (!checkExists(newItem)) {
            menu.push(newItem);
        // }
    });
};

const loadMenu = () => document.getElementById('menu-items').innerHTML = menu.map(item => item.display).join('');

loadMenuDatabase().then(_ => loadMenu());

const addItemToMenu = (json) => {
    const newItem = MenuItem.fromJson(JSON.parse(json));
    console.log(newItem);
    // if (!checkExists(newItem)) {
        menu.push(newItem);
        loadMenu();
    // }
};

const formSubmit = async (form) => {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    object.allergens = object.allergens.split(',');
    object.imageName = "default.webp";
    const json = JSON.stringify(object);
    console.log(json);

    addItemToMenu(json);

    const result = document.getElementById('form-result');
    result.innerHTML = "Menu Item Added!";
    setTimeout(() => {
        result.style.display = "none";
    }, 2000);
};

const modal = document.getElementById('modal');
const openForm = () => {
    modal.style.display = 'block';
};

const closeForm = () => {
    modal.style.display = 'none';
};

document.getElementById('btn-add-item').onclick = openForm;
document.getElementById('modal-form-close').onclick = closeForm;
document.getElementById('modal-background').onclick = closeForm;
document.getElementById('modal-form').onclick = (e) => e.stopPropagation();

const form = document.getElementById('form-add-menu-item');
form.onsubmit = (e) => {
    e.preventDefault();
    const result = document.getElementById('form-result');
    result.style.display = "block";
    result.innerHTML = "Please wait...";

    formSubmit(form);
};

