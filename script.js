//carousel method 

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prevbtn');
    const nextBtn = document.getElementById('nextbtn');
    let currentIndex = 2;

    function updateCarousel() {
        if (!slides.length) return; 
        const slideWidth = slides[0].getBoundingClientRect().width;
        carousel.scrollLeft = slideWidth * currentIndex;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active-slide', index === currentIndex);
        });
    }

    function nextSlide(event) {
        event.preventDefault();
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide(event) {
        event.preventDefault();
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    updateCarousel();
});

//modal for first grid

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const grids = document.querySelectorAll('.grid, .grid-item, .xbox');
    // open a modal
    const openModal = (productId) => {
        const modal = document.getElementById(`modal${productId}`);
        if (modal) {
            modal.style.display = 'flex';
        } else {
            console.error(`Modal with ID modal${productId} not found`);
        }
    };
    // close a modal
    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
        }
    };

    grids.forEach(grid => {
        grid.addEventListener('click', () => {
            const productId = grid.getAttribute('data-product-id');
            openModal(productId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.product-modal');
    const productsInCart = document.querySelector('.products-in-cart');
    
    let totalQuantity = 0;

    modals.forEach(modal => {
        const decrementBtn = modal.querySelector('.subtract-button button');
        const incrementBtn = modal.querySelector('.plus-button button');
        const quantitySpan = modal.querySelector('.counting');

        let quantity = parseInt(quantitySpan.textContent);

        //update count
        function updateQuantity(newQuantity) {
            totalQuantity += newQuantity - quantity;
            quantity = newQuantity;
            quantitySpan.textContent = quantity;
            updateTotalCount();
        }

        // decrement
        decrementBtn.addEventListener('click', function() {
            if (quantity > 0) {
                updateQuantity(quantity - 1);
            }
        });

        // increment
        incrementBtn.addEventListener('click', function() {
            updateQuantity(quantity + 1);
        });
    });
    updateTotalCount();
});

// Add to cart 
function addToCart(button) {
    const modal = button.closest('.product-modal');
    const productName = modal.dataset.productName;
    const productPrice = parseFloat(modal.dataset.productPrice);
    const productImage = modal.dataset.productImage;
    const countingElement = modal.querySelector('.counting');
    const count = parseInt(countingElement.textContent);
    
    if (count > 0) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += count;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: count,
                image: productImage
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart after adding item:', JSON.parse(localStorage.getItem('cart')));
        updateTotalQuantity(); // Update the total quantity
    } else {
        alert('Please select a quantity greater than 0.');
    }
    // Inside addToCart function
console.log('Adding to cart:', {
    name: productName,
    price: productPrice,
    quantity: count,
    image: productImage
});
}
//

document.addEventListener('DOMContentLoaded', () => {
    updateTotalQuantity();
});

function updateTotalQuantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('Total Quantity:', totalQuantity); // Debug log
    const productsInCartElements = document.querySelectorAll('.products-in-cart');
    productsInCartElements.forEach(element => {
        element.textContent = totalQuantity;
    });
}
