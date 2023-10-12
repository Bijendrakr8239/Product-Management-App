document.addEventListener('DOMContentLoaded', () => {
    const updateProductForm = document.getElementById('updateProductForm');

    updateProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productID = document.getElementById('productID').value;

        const updatedProduct = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            featured: document.getElementById('productFeatured').checked,
            rating: parseFloat(document.getElementById('productRating').value),
            company: document.getElementById('productCompany').value
        };

        // Send a PUT request to update the product details
        fetch(`http://localhost:3000/products/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then((response) => {
            if (response.status === 200) {
                alert('Product details updated successfully');
            } else if (response.status === 404) {
                alert('Product not found');
            } else {
                alert('Error updating product details');
            }
            window.location.href = 'products.html';
        })
        .catch((error) => console.error('Error updating product details:', error));
    });
});
