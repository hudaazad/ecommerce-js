function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Cart contents:', cart); // Log cart contents for debugging

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        totalAmountElement.innerText = 'Total: $0.00'; // Display $0.00 if cart is empty
    } else {
        let cartHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            // Validate item price and quantity
            const itemPrice = typeof item.price === 'number' ? item.price : 0;
            const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;

            if (itemPrice <= 0 || itemQuantity <= 0) {
                console.error('Invalid item data:', item);
                return; // Skip this item if data is invalid
            }

            const itemTotal = itemPrice * itemQuantity;
            total += itemTotal;

            cartHTML += `
                <div class="cart-item" data-name="${item.name}">
                    <img src="${item.image}" alt="${item.name}" class="item-image" />
                    <div class="item-product">${item.name}</div>
                    <div class="item-price">$${itemPrice.toFixed(2)}</div>
                    <div class="item-quantity">${itemQuantity}</div>
                    <div class="item-total">$${itemTotal.toFixed(2)}</div>
                    <span class="remove-item" data-index="${index}" title="Remove item">&times;</span>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        totalAmountElement.innerText = `Total: $${total.toFixed(2)}`; // Update total amount

        // Add event listener for remove icons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'), 10);
                removeItemFromCart(index);
            });
        });
    }
}

// Update cart display on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);
function removeItemFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay(); // Refresh cart display
}

// count in cart
