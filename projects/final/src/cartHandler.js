const isMenu = window.location.pathname.includes('menu.html');
const isCart = window.location.pathname.includes('cart.html');
if (isMenu) {
    const btnCart = document.getElementById('btn-cart');
    btnCart.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });
}

const cart = [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addItemToCart = (item, customization, count) => {
    if (!count) {
        count = 1;
    }
    const cartItem = cart.find(cartItem => cartItem.item.id === item.id && cartItem.customization === customization);
    const index = cart.indexOf(cartItem);
    if (cartItem) {
        cartItem.count += count;
        if (cartItem.count <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        if (isMenu) {
            updateFooterCart();
        } else if (isCart) {
            updateCart();
        }
        return;
    }
    cart.push({
        item: item,
        customization: customization,
        count: count
    });
    if (isMenu) {
        updateFooterCart();
    } else if (isCart) {
        updateCart();
    }
}

const loadCart = () => {
    const cartJson = localStorage.getItem('cart');
    if (cartJson) {
        cart.length = 0;
        const cartArray = JSON.parse(cartJson);
        cartArray.forEach(item => {
            const newItem = MenuItem.fromJson(item.item);
            cart.push({
                item: newItem,
                customization: item.customization,
                count: item.count
            });
        });
    }
}

const displayFooterCart = () => {
    const cartDisplay = document.getElementById('footer-cart-items');
    cartDisplay.innerHTML = '';
    cart.forEach(cartItem => {
        const divItem = document.createElement('div');
        const newItem = MenuItem.fromJson(cartItem.item);
        divItem.innerHTML = `<img src="${newItem.image}" alt="${newItem.name}" width="100" height="100">`;
        divItem.classList.add('footer-cart-item');

        const span = document.createElement('span');
        span.className = 'footer-cart-number-badge';
        span.innerHTML = cartItem.count;
        divItem.appendChild(span);

        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Remove';
        btnDelete.onclick = () => {
            const index = cart.indexOf(cartItem);
            cart.splice(index, 1);
            saveCart();
            displayFooterCart();
        };
        divItem.appendChild(btnDelete);


        cartDisplay.appendChild(divItem);
    });
}

const clearCart = () => {
    cart.length = 0;
    saveCart();
    if (isMenu) {
        updateFooterCart();
    } else if (isCart) {
        updateCart();
    }
}

const updateFooterCart = () => {
    saveCart();
    displayFooterCart();
}

const updateCart = () => {
    saveCart();
    displayCart();
}

const displayCart = () => {
    loadCart();

    const cartDisplay = document.getElementById('cart-items');
    cartDisplay.innerHTML = '';
    if (cart.length === 0) {
        const divEmpty = document.createElement('h2');
        divEmpty.classList.add('empty-cart');
        divEmpty.innerHTML = 'Your cart is empty, please go to the menu to items to your cart.';
        cartDisplay.appendChild(divEmpty);
        return;
    }
    cart.forEach(cartItem => {
        console.log(cartItem);
        const item = MenuItem.copy(cartItem.item);
        const divItem = item.getCartItemDisplay(cartItem);
        cartDisplay.appendChild(divItem);
    });

    const subtotal = cart.reduce((acc, cartItem) => {
        return acc + cartItem.item.price * cartItem.count;
    }, 0);
    const divTotal = document.getElementById('subtotal');
    divTotal.innerHTML = subtotal.toFixed(2);

    const tax = subtotal * 0.08;
    const divTax = document.getElementById('tax');
    divTax.innerHTML = tax.toFixed(2);

    const total = subtotal + tax;
    const divTotalCost = document.getElementById('total');
    divTotalCost.innerHTML = total.toFixed(2);

    document.getElementById('btn-checkout').addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            document.getElementById('order-status').innerHTML = 'Your cart is empty, please add items to your cart before checking out.';
            return;
        }
        clearCart();
        document.getElementById('cart-items').innerHTML = 'Your order has been placed!';
        document.getElementById('subtotal').innerHTML = '0.00';
        document.getElementById('tax').innerHTML = '0.00';
        document.getElementById('total').innerHTML = '0.00';
        document.getElementById('btn-checkout').style.display = 'none';
        document.getElementById('order-status').innerHTML = 'Thank you for ordering!';
    });
}

loadCart();
if (isMenu) {
    displayFooterCart();
} else if (isCart) {
    displayCart();
}