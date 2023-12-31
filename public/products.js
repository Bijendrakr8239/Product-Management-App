document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const featuredCheckbox = document.getElementById('featuredCheckbox');
    const priceInput = document.getElementById('priceInput');
    const ratingInput = document.getElementById('ratingInput');
  
    fetch('https://product-management-app-production.up.railway.app/products')
      .then((response) => response.json())
      .then((products) => {
        function filterProducts() {
          const showFeatured = featuredCheckbox.checked;
          const maxPrice = parseFloat(priceInput.value) || Infinity;
          const minRating = parseFloat(ratingInput.value) || -1;

          while (productList.firstChild) {
            productList.removeChild(productList.firstChild);
          }
  
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
  
        filterProducts();
  
        featuredCheckbox.addEventListener('change', filterProducts);
        priceInput.addEventListener('input', filterProducts);
        ratingInput.addEventListener('input', filterProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  });
  document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    
    
    const actions = document.getElementById('actions');
    actions.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const link = event.target.getAttribute('href');
            window.location.href = link;
        }
    });
});

  