function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const subTotalElement = document.querySelector('.cart-summary p:nth-of-type(1)');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        totalAmountElement.innerText = 'Total: $0.00';
        subTotalElement.innerText = 'Sub-total: $0.00';
    } else {
        let cartHTML = '';
        let subTotal = 0;

        cart.forEach((item, index) => {
            const itemPrice = typeof item.price === 'number' ? item.price : 0;
            const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;

            if (itemPrice <= 0 || itemQuantity <= 0) {
                console.error('Invalid item data:', item);
                return;
            }

            const itemTotal = itemPrice * itemQuantity;
            subTotal += itemTotal;

            cartHTML += `
                <div class="cart-item" data-index="${index}">
                    <div class="item-details">
                        <img src="${item.image}" alt="${item.name}" class="item-image" />
                        <p class="item-name">${item.name}</p>
                    </div>
                    <div class="item-info">
                    <p class="item-price">$${itemPrice}</p>
                        <div class="quantity-container">
                            <button class="decrement-button" data-index="${index}">-</button>
                            <p class="item-quantity">${itemQuantity}</p>
                            <button class="increment-button" data-index="${index}">+</button>
                        </div>
                        <p class="item-total">$${itemTotal.toFixed(2)}</p>
                    </div>
                    <span class="remove-item" data-index="${index}" title="Remove item">&times;</span>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        subTotalElement.innerText = `Sub-total: $${subTotal.toFixed(2)}`;
        subTotalElement.innerHTML = `Sub-total: <span style="margin-left: 5px;">$${subTotal.toFixed(2)}</span>`;


        const discount = 24.00;
        const shipping = 0.00;
        const tax = 61.99;
        const total = subTotal - discount + shipping + tax;

        totalAmountElement.innerText = `Total: $${total.toFixed(2)} USD`;
        totalAmountElement.innerHTML = `Total: <span style="margin-left: 5px;">$${total.toFixed(2)}</span>`;
        
        attachEventListeners();
    }
}

function attachEventListeners() {
    const incrementButtons = document.querySelectorAll('.increment-button');
    const decrementButtons = document.querySelectorAll('.decrement-button');
    const removeButtons = document.querySelectorAll('.remove-item');

    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'), 10);
            updateCartItemQuantity(index, 1);
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'), 10);
            updateCartItemQuantity(index, -1);
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'), 10);
            removeItemFromCart(index);
        });
    });
}

function updateCartItemQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1; 
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(); 
}

document.addEventListener('DOMContentLoaded', updateCartDisplay);
//
function updateTotalQuantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    const productsInCartElements = document.querySelectorAll('.products-in-cart');
    productsInCartElements.forEach(element => {
        element.textContent = totalQuantity;
    });
}
function updateCartItemQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1; 
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateTotalQuantity(); 
}

function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(); 
    updateTotalQuantity(); 
}
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    updateTotalQuantity(); 
});
 