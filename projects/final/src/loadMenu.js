const menu = [];

const loadMenuDatabase = async () => {
    const menuResponse = await fetch('https://victorious-pizza-node-server.onrender.com/api/menu');
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

const showMenuLoading = () => {
    const divMenuItems = document.getElementById('menu-items');
    divMenuItems.innerHTML = '<div class="center"><svg class="loading-circle" viewBox="250 250 500 500"></circle></svg></div>';
}

const refreshMenu = async () => {
    const databaseRequest = loadMenuDatabase();
    showMenuLoading();
    await databaseRequest;
    populateMenu();
};

refreshMenu();
