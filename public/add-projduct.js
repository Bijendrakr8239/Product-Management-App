const { response } = require("express");

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((products) => {
        products.forEach((product) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Featured:</strong> ${product.featured ? 'Yes' : 'No'}</p>
            <p><strong>Rating:</strong> ${product.rating || 'N/A'}</p>
            <p><strong>Company:</strong> ${product.company}</p>
          `;
          productList.appendChild(li);
        });
      })
      .catch((error) => console.error('Error fetching products:', error));
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
            console.log(response);
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = `Name: ${data.name}, Price: $${data.price}`;
            productList.appendChild(li);
            productForm.reset();
        })
        .catch(error => console.error('Error adding product:', error));
    });
