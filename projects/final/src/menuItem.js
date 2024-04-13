class MenuItem {
    constructor(_id, name, type, price, shortDescription, longDescription, allergens, image64) {
        this.id = _id;
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

    get lowerName() {
        return this.name.toLowerCase().replace(' ', '-');
    }

    get display() {
        const display = document.createElement('div');
        display.classList.add('flex', 'menu-item');
        display.innerHTML = this.displayContent();
        display.onclick = this.showDetails.bind(this, false);

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

    showDetails = (force) => {
        const page = document.getElementById('menu-main-content');
        if (page.childElementCount > 1) {
            const secondChild = page.lastChild;
            page.removeChild(secondChild);
            if (!force && secondChild.classList.contains(this.lowerName)) {
                return;
            }
        }
        page.appendChild(this.detailsDisplay);
    }

    get detailsDisplay() {
        const display = document.createElement('div');
        display.id = 'menu-item-details';
        display.classList.add( 'one', 'flex', this.lowerName);
        this.detailsDisplayContent().then(content => 
            display.append(...content)
            // display.replaceChild(content, display.firstChild)
        );

        return display;
    }

    detailsDisplayContent = async () => {
        const children = [];

        const divOne = document.createElement('div');
        divOne.classList.add('one');
        divOne.innerHTML = `
            <div class="one">
                <h2>Customization</h2>
            </div>
        `;
        divOne.appendChild(await this.customizationOptionsDisplay());
        children.push(divOne);

        const divTwo = document.createElement('div');
        divTwo.classList.add('two', 'right');
        divTwo.innerHTML = `
            <img src="${this.image}" alt="${this.name} Picture" class="alt-item-img">
            <p>${this.longDescription}</p>
            <p>Allergy Information: Contains ${this.allergenList}. May contain traces of nuts and other allergens.</p>
        `;

        const buttonEdit = document.createElement('button');
        buttonEdit.innerHTML = 'Edit';
        buttonEdit.id = 'edit';
        buttonEdit.onclick = () => {
            changeModalForm(this, 'edit');
        };
        divTwo.appendChild(buttonEdit);

        const buttonDelete = document.createElement('button');
        buttonDelete.innerHTML = 'Delete';
        buttonDelete.id = 'delete';
        buttonDelete.onclick = () => {
            changeModalForm(this, 'delete');
        };
        divTwo.appendChild(buttonDelete);
        children.push(divTwo);

        return children;
    }

    getCustomizationDisplay = (cartItem) => {
        const p = document.createElement('p');
        p.classList.add('customization-display');

        const customization = JSON.parse(cartItem.customization);
        Object.keys(customization).forEach(key => {
            let title = this.toTitleCase(key);
            p.innerHTML += `${title}: ${customization[key]}<br>`;
        });

        return p;
    }

    toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    getCartItemDisplay(cartItem) {
        const display = document.createElement('div');
        display.classList.add('cart-item', 'flex');
        display.innerHTML = this.getCartItem(cartItem);

        display.querySelector(`.${this.lowerName}.btn-down`).onclick = () => {
            addItemToCart(this, cartItem.customization, -1);
            updateCart();
        };
        display.querySelector(`.${this.lowerName}.btn-up`).onclick = () => {
            addItemToCart(this, cartItem.customization, 1);
            updateCart();
        };
        display.querySelector(`.${this.lowerName}.btn-remove`).onclick = () => {
            addItemToCart(this, cartItem.customization, -cartItem.count);
            updateCart();
        };
        
        return display;
    }

    getCartItem(cartItem) {
        console.log(this);
        console.log(this.price);
        return `
            <div class="one flex">
                <div>
                    <img src="${this.image}" alt="${this.name}">
                </div>
                <div>
                    <h2>${this.name}</h2>
                    <p>$${this.price.toFixed(2)}</p>
                    <div>
                        ${this.getCustomizationDisplay(cartItem).outerHTML}
                    </div>
                    <div class="quantity-controls flex">
                        <p>Quantity: </p>
                        <button class="${this.lowerName} btn-down">
                            <p>-</p>
                        </button>
                        <p>${cartItem.count}</p>
                        <button class="${this.lowerName} btn-up">
                            <p>+</p>
                        </button>
                    </div>
                    <button class="${this.lowerName} btn-remove">
                        <p>Remove</p>
                    </button>
                </div>
            </div>
            <div class="one prices right">
                <h3>${this.price * cartItem.count}</h3>
            </div>
        `;
    }

    customizationOptionsDisplay = async () => {
        const request = fetch(`./src/menuCustomizations/${this.type}.html`)
            .catch(error => {
                console.error(error);
                return null;
            });
        
        const form = document.createElement('form');

        const response = await request;
        if (response == null || !response.ok) {
            form.innerHTML = '<p>Sorry, we are unable to customize this item at this time.</p>';

            const div = document.createElement('div');
            div.classList.add('flex', 'quantity-controls');

            const quantity = document.createElement('p');
            quantity.innerHTML = 'Quantity: ';
            div.appendChild(quantity);

            const p = document.createElement('p');
            p.innerHTML = '1';

            const btnDown = document.createElement('button');
            btnDown.innerHTML = '-';
            btnDown.onclick = (e) => {
                e.preventDefault();
                const quantity = parseInt(p.innerHTML);
                if (quantity <= 1) {
                    return;
                }
                p.innerHTML = quantity - 1;
            };

            const btnUp = document.createElement('button');
            btnUp.innerHTML = '+';
            btnUp.onclick = (e) => {
                e.preventDefault();
                p.innerHTML = parseInt(p.innerHTML) + 1;
            };

            div.appendChild(btnDown);
            div.appendChild(p);
            div.appendChild(btnUp);

            form.appendChild(div);

            const button = document.createElement('button');
            button.innerHTML = 'Add to Cart';
            button.type = 'submit';

            form.onsubmit = (e) => {
                e.preventDefault();
                this.addToCart(parseInt(p.innerHTML));
            };

            form.appendChild(button);
            return form;
        }
        form.innerHTML = await response.text();

        const pQuantity = form.querySelector('p.quantity');
        form.querySelector('button.btn-down').onclick = (e) => {
            e.preventDefault();
            const quantity = parseInt(pQuantity.innerHTML);
            if (quantity <= 1) {
                return;
            }
            pQuantity.innerHTML = quantity - 1;
        };

        form.querySelector('button.btn-up').onclick = (e) => {
            e.preventDefault();
            pQuantity.innerHTML = parseInt(pQuantity.innerHTML) + 1;
        };

        form.onsubmit = (e) => {
            e.preventDefault();

            const quantity = parseInt(pQuantity.innerHTML);

            const radios = form.querySelectorAll('input[type="radio"]');
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');

            if (radios.length === 0 && checkboxes.length === 0) {
                this.addToCart(quantity);
                return;
            }

            const customization = {};
            radios.forEach(radio => {
                if (radio.checked) {
                    const text = form.querySelector(`label[for="${radio.id}"]`).innerHTML;
                    customization[radio.name] = text;
                }
            });
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const text = form.querySelector(`label[for="${checkbox.id}"]`).innerHTML;
                    if (Object.keys(customization).includes(checkbox.name)) {
                        customization[checkbox.name] += (`, ${text}`);
                        return;
                    }
                    customization[checkbox.name] = text;
                }
            });
            
            console.log(customization);
            this.addToCartCustom(JSON.stringify(customization), quantity);
        };

        return form;
    }

    addToCart = (count) => {
        this.addToCartCustom('{}', count);
    }

    addToCartCustom = (customization, count) => {
        const page = document.getElementById('menu-main-content');
        page.removeChild(page.lastChild);
        
        addItemToCart(this, customization, count);
    }

    static fromJson(json) {
        if (!json._id) {
            return this.copy(json);
        }
        return new MenuItem(json._id, json.name, json.type, json.price, json.shortDescription, json.longDescription, json.allergens, json.image64);
    }

    static copy(item) {
        return new MenuItem(item.id, item.name, item.type, item.price, item.shortDescription, item.longDescription, item.allergens, item.image64);
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
