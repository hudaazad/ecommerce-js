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

//modal method for first grid

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const grids = document.querySelectorAll('.grid');
    const closeButtons = document.querySelectorAll('.close-modal');
    grids.forEach(grid => {
        grid.addEventListener('click', () => {
            const productId = grid.getAttribute('data-product-id');
            const modal = document.getElementById(`modal${productId}`);
            if (modal) {
                modal.style.display = 'flex';
            } else {
                console.error(`Modal with ID modal${productId} not found`);
            }
        });
    });
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            } else {
                console.error(`Modal with ID ${modalId} not found`);
            }
        });
    });
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

//modal method  for second grid

document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid-item');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    grids.forEach(grid => {
        grid.addEventListener('click', () => {
            const productId = grid.getAttribute('data-product-id');
            const modal = document.getElementById(`modal${productId}`);
            if (modal) {
                modal.style.display = 'flex';
            } else {
                console.error(`Modal with ID modal${productId} not found`);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            } else {
                console.error(`Modal with ID ${modalId} not found`);
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

//modal method for xbox

document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.xbox');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    grids.forEach(grid => {
        grid.addEventListener('click', () => {
            const productId = grid.getAttribute('data-product-id');
            const modal = document.getElementById(`modal${productId}`);
            if (modal) {
                modal.style.display = 'flex';
            } else {
                console.error(`Modal with ID modal${productId} not found`);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            } else {
                console.error(`Modal with ID ${modalId} not found`);
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.product-modal');
    const productsInCart = document.querySelector('.products-in-cart');
    
    let totalQuantity = 0;

    function updateTotalCount() {
        productsInCart.textContent = totalQuantity;
    }

    modals.forEach(modal => {
        const decrementBtn = modal.querySelector('.subtract-button button');
        const incrementBtn = modal.querySelector('.plus-button button');
        const quantitySpan = modal.querySelector('.counting');

        let quantity = parseInt(quantitySpan.textContent);

        // Function to update quantity and total count
        function updateQuantity(newQuantity) {
            totalQuantity += newQuantity - quantity;
            quantity = newQuantity;
            quantitySpan.textContent = quantity;
            updateTotalCount();
        }

        // Event listener for decrement button
        decrementBtn.addEventListener('click', function() {
            if (quantity > 0) {
                updateQuantity(quantity - 1);
            }
        });

        // Event listener for increment button
        incrementBtn.addEventListener('click', function() {
            updateQuantity(quantity + 1);
        });
    });

    // Initialize total count on page load
    updateTotalCount();
});
//add to cart
