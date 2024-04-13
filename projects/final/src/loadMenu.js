const menu = [];

const loadMenuDatabase = async () => {
    const menuResponse = await fetch('http://127.0.01:3000/api/menu');
    if (!menuResponse.ok) {
        throw new Error('Failed to fetch menu.');
    }
    const menuJson = await menuResponse.json();
    menu.length = 0;
    menuJson.map(item => {
        const newItem = MenuItem.fromJson(item);
        menu.push(newItem);
    });
};

const populateMenu = () => {
    const divMenuItems = document.getElementById('menu-items');
    divMenuItems.innerHTML = '';
    menu.forEach(item => {
        divMenuItems.appendChild(item.display);
    });
}

const refreshMenu = async () => {
    await loadMenuDatabase();
    populateMenu();
};

refreshMenu();
