document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');

    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newProduct = {
            productID: document.getElementById('productID').value,
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            featured: document.getElementById('productFeatured').checked,
            rating: parseFloat(document.getElementById('productRating').value),
            company: document.getElementById('productCompany').value,
        };

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.status === 201) {
                alert('Product added successfully');
                window.location.href = 'products.html';
            } else {
                alert('Error adding the product');
            }
        } catch (error) {
            console.error('Error adding the product:', error);
        }
    });
});
