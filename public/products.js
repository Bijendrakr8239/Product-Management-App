document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const featuredCheckbox = document.getElementById('featuredCheckbox');
    const priceInput = document.getElementById('priceInput');
    const ratingInput = document.getElementById('ratingInput');
  
    // Fetch all products
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((products) => {
        // Function to filter products based on user input
        function filterProducts() {
          const showFeatured = featuredCheckbox.checked;
          const maxPrice = parseFloat(priceInput.value) || Infinity;
          const minRating = parseFloat(ratingInput.value) || -1;
  
          // Clear the existing product list
          while (productList.firstChild) {
            productList.removeChild(productList.firstChild);
          }
  
          // Display products based on user input
          products.forEach((product) => {
            if ((!showFeatured || (showFeatured && product.featured)) &&
                product.price <= maxPrice &&
                (product.rating >= minRating || minRating === -1)) {
              const li = document.createElement('li');
              li.textContent = `Product ID: ${product.productID}, Name: ${product.name}, Price: $${product.price}, Featured: ${product.featured ? 'Yes' : 'No'}, Rating: ${product.rating}, Created At: ${new Date(product.createdAt).toLocaleDateString()}, Company: ${product.company}`;
              productList.appendChild(li);
            }
          });
        }
  
        // Initial display of products
        filterProducts();
  
        // Event listeners for user input changes
        featuredCheckbox.addEventListener('change', filterProducts);
        priceInput.addEventListener('input', filterProducts);
        ratingInput.addEventListener('input', filterProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  });
  document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    
    // Fetch and display product details as shown in previous examples
    
    // Handle navigation to add, update, and delete product pages
    const actions = document.getElementById('actions');
    actions.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const link = event.target.getAttribute('href');
            window.location.href = link;
        }
    });
});

  