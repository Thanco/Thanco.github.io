const menu = [];

const loadMenuDatabase = async () => {
    const menuResponse = await fetch('http://127.0.01:3000/api/menu');
    if (!menuResponse.ok) {
        throw new Error('Failed to fetch menu.');
    }
    const menuJson = await menuResponse.json();
    menuJson.map(item => {
        const newItem = MenuItem.fromJson(item);
        menu.push(newItem);
    });
};

const populateMenu = () => {
    const divMenuItems = document.getElementById('menu-items');
    menu.forEach(item => {
        divMenuItems.appendChild(item.display);
    });
}

const refreshMenu = () => {
    loadMenuDatabase().then(_ => populateMenu());
};

const addItemToMenu = async (formInfo) => {
    const request = fetch('http://127.0.01:3000/api/menu', {
        method: 'POST',
        body: formInfo
    });
    const object = Object.fromEntries(formData);
    // object.allergens = object.allergens.split(',');
    // object.image64 = "default.webp";
    const json = JSON.stringify(object);
    const newItem = MenuItem.fromJson(JSON.parse(json));
    menu.push(newItem);

    await request;
    verifyMenu()
};

const verifyMenu = async () => {
    const menuResponse = await fetch('http://127.0.01:3000/api/menu/count');
    if (!menuResponse.ok) {
        throw new Error('Failed to fetch menu.');
    }
    const remoteMenu = await menuResponse.json();
    if (remoteMenu.length != menu.length) {
        refreshMenu();
    }
};

const formSubmit = async (form) => {
    const formData = new FormData(form);

    addItemToMenu(formData);

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

verifyMenu();