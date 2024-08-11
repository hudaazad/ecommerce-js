document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p><strong>${item.name}</strong></p>
            <p>Price: ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        `;

        cartItemsContainer.appendChild(itemElement);
    });
});
