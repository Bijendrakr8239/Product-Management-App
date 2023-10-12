document.addEventListener('DOMContentLoaded', () => {
    const deleteProductForm = document.getElementById('deleteProductForm');

    deleteProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productID = document.getElementById('productID').value;

        fetch(`https://product-management-app-production.up.railway.app/products/${productID}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                alert('Product deleted successfully');
            } else if (response.status === 404) {
                alert('Product not found');
            } else {
                alert('Error deleting product');
            }
            window.location.href = 'products.html';
        })
        .catch((error) => console.error('Error deleting product:', error));
    });
});
