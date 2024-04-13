const serverURL = `http://127.0.01:3000`;
const modal = document.getElementById('modal');
const result = document.getElementById('form-result');

const openModal = () => {
    this.modal.style.display = 'block';
};

const closeModal = () => {
    this.modal.style.display = 'none';
};

document.getElementById('modal-form-close').onclick = closeModal;
document.getElementById('modal-background').onclick = closeModal;
document.getElementById('modal-form').onclick = (e) => e.stopPropagation();


const addItemFormItems = `
    <form id="form-menu-item" class="flex">
        <div class="one">
            <img src="img/menu/default.webp" alt="Image Preview" id="img-preview">
        </div>
        <ul class="ten">
            <li>
                <label for="name">Item Name:</label>
                <input type="text" id="name" name="name" minlength="5" required>
            </li>
            <li>
                <label for="type">Item Type:</label>
                <input type="text" id="type" name="type" minlength="3" required>
            </li>
            <li>
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" step="0.01" min="0.99" required>
            </li>
            <li>
                <label for="shortDescription">Short Description:</label>
                <textarea id="shortDescription" name="shortDescription" minlength="15" cols="40" rows="4" required></textarea>
            </li>
            <li>
                <label for="longDescription">Long Description:</label>
                <textarea id="longDescription" name="longDescription" minlength="15" cols="40" rows="4" required></textarea>
            </li>
            <li>
                <label for="allergens">Allergens:</label>
                <button class="btn-add-allergen">Add Allergen</button>
                <ul id="ul-allergens">
                    <li><input type="text" name="allergens" minlength="3" required></li>
                    <li><input type="text" name="allergens" minlength="3" required></li>
                </ul>
            </li>
            <li>
                <label for="input-image">Image:</label>
                <input type="file" name="image" id="input-image" class="input-image" accept="image/*" required>
            </li>
            <li>
                <input type="submit" value="Submit">
            </li>
        </ul>
    </form>
`;

const editItemFormItems = `
    <form id="form-menu-item" class="flex">
    <div class="one">
        <img src="img/menu/default.webp" alt="Image Preview" id="img-preview">
    </div>
    <ul class="ten">
        <li>
            <label for="name">Item Name:</label>
            <input type="text" id="name" name="name" minlength="5" required>
        </li>
        <li>
            <label for="type">Item Type:</label>
            <input type="text" id="type" name="type" minlength="3" required>
        </li>
        <li>
            <label for="price">Price:</label>
            <input type="number" id="price" name="price" step="0.01" min="0.99" required>
        </li>
        <li>
            <label for="shortDescription">Short Description:</label>
            <textarea id="shortDescription" name="shortDescription" minlength="15" cols="40" rows="4" required></textarea>
        </li>
        <li>
            <label for="longDescription">Long Description:</label>
            <textarea id="longDescription" name="longDescription" minlength="15" cols="40" rows="4" required></textarea>
        </li>
        <li>
            <label for="allergens">Allergens:</label>
            <button class="btn-add-allergen">Add Allergen</button>
            <ul id="ul-allergens">
                <li><input type="text" name="allergens" minlength="3" required></li>
                <li><input type="text" name="allergens" minlength="3" required></li>
            </ul>
        </li>
        <li>
            <label for="input-image">Image:</label>
            <input type="file" name="image" id="input-image" class="input-image" accept="image/*">
        </li>
        <li>
            <input type="submit" value="Submit">
        </li>
    </ul>
    </form>
`;

const deleteItemFormItems = `
    <div>
        <p>Are you sure you want to delete this item?</p>
        <button id="btn-cancel-delete">Cancel</button>
        <button id="btn-delete-item">Delete</button>
    </div>
`;

const getModalForm = (item, type) => {
    const addItemFormElement = document.createElement('div');

    const title = document.createElement('h1');
    title.innerHTML = getTitle(type);
    addItemFormElement.appendChild(title);

    const form = document.createElement('form');
    form.id = 'form-menu-item';
    form.classList.add('flex');
    form.innerHTML = getFormItems(type);

    switch (type) {
        case 'edit':
            form.querySelector('#name').value = item.name;
            form.querySelector('#type').value = item.type;
            form.querySelector('#price').value = item.price;
            form.querySelector('#shortDescription').value = item.shortDescription;
            form.querySelector('#longDescription').value = item.longDescription;
            form.querySelector('#img-preview').src = item.image;
            form.querySelector('#ul-allergens').innerHTML = '';
            const ulAllergens = form.querySelector('#ul-allergens');
            for (let i = 0; i < item.allergens.length; i++) {
                const allergen = item.allergens[i];
                ulAllergens.appendChild(allergenListItem(allergen));
                if (i < 2) {
                    ulAllergens.lastChild.querySelector('span').style.display = 'none';
                }
            }
            break;
        case 'delete':
            form.querySelector('#btn-cancel-delete').onclick = (e) => {
                e.preventDefault();
                closeModal();
            };
            form.querySelector('#btn-delete-item').onclick = submitDeleteItem.bind(null, item);
            addItemFormElement.appendChild(form);
            return addItemFormElement;
        default:
            break;
    }

    form.querySelector('.btn-add-allergen').onclick = addAllergen;
    form.querySelector('.input-image').onchange = imageInput;
    form.onsubmit = (e) => {
        e.preventDefault();

        if (form['image'].size > 1000000) {
            result.style.display = "block";
            result.innerHTML = "Image must be less than 1MB";
            return;
        }
        
        result.style.display = "block";
        result.innerHTML = "Please wait...";

        switch (type) {
            case 'add':
                submitNewItem(form);
                break;
            case 'edit':
                submitEditItem(item, form);
                break;
            default:
                break;
        }
    };

    addItemFormElement.appendChild(form);
    return addItemFormElement;
};

const getTitle = (type) => {
    switch (type) {
        case 'add':
            return 'Add Menu Item';
        case 'edit':
            return 'Edit Menu Item';
        case 'delete':
            return 'Delete Menu Item';
        default:
            return '';
    }
};

const imageInput = (event) => {
    if (!event.target.files[0]) {
        return;
    }
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        document.getElementById('img-preview').src = reader.result;
    }
    reader.readAsDataURL(image);
}

const getFormItems = (type) => {
    switch (type) {
        case 'add':
            return addItemFormItems;
        case 'edit':
            return editItemFormItems;
        case 'delete':
            return deleteItemFormItems;
        default:
            return '';
    }
};

const addAllergen = () => {
    const allergens = document.getElementById('ul-allergens');
    allergens.appendChild(allergenListItem(''));
};

const removeAllergen = (allergen) => {
    const allergens = document.getElementById('ul-allergens');
    allergens.removeChild(allergen);
};

const changeModalForm = (item, type) => {
    const modalContent = document.getElementById('modal-form-content');
    modalContent.innerHTML = '';
    modalContent.appendChild(getModalForm(item, type));
    openModal();
};

const allergenListItem = (allergen) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="text" name="allergens" value="${allergen}" minlength="3" required>`;

    const span = document.createElement('span');
    span.classList.add('btn-remove-allergen');
    span.innerHTML = '&times;';
    span.addEventListener('click', () => {
        li.remove();
    });

    li.appendChild(span);
    return li;
}

const submitNewItem = async (form) => {
    const formData = new FormData(form);
    const request = fetch(`${serverURL}/api/menu`, {
        method: 'POST',
        body: formData
    });

    const response = await request;
    if (!response.ok) {
        result.innerHTML = "Failed to add item.";
        return;
    }
    refreshMenu();
    closeModal();

    result.innerHTML = "Menu Item Added!";
    setTimeout(() => {
        result.style.display = "none";
        form.reset();
    }, 2000);
};

const submitEditItem = async (item, form) => {
    const formData = new FormData(form);

    const request = fetch(`${serverURL}/api/menu/${item.id}`, {
        method: 'PUT',
        body: formData
    });

    const response = await request;
    if (!response.ok) {
        result.innerHTML = "Failed to update item.";
        return;
    }

    await refreshMenu();

    const updatedItem = menu.find(menuItem => menuItem.id === item.id);
    updatedItem.showDetails(true);

    result.innerHTML = "Menu Item Updated!";
    setTimeout(() => {
        result.style.display = "none";
    }, 2000);
};

const submitDeleteItem = async (item) => {
    const request = fetch(`${serverURL}/api/menu/${item.id}`, {
        method: 'DELETE',
    });

    const response = await request;
    if (!response.ok) {
        result.innerHTML = "Failed to delete item.";
        return;
    }
    refreshMenu();

    result.innerHTML = "Menu Item Deleted!";
    setTimeout(() => {
        result.style.display = "none";
        closeModal();
    }, 2000);
};

document.getElementById('btn-add-item').onclick = changeModalForm.bind(null, null, 'add');
