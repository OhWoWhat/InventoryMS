let products = JSON.parse(localStorage.getItem('products')) || [];

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  products.forEach((product, index) => {
    list.innerHTML += `
      <tr>
        <td>${product.name}</td>
        <td>${product.sku}</td>
        <td>${product.quantity}</td>
        <td>
          <button class="edit" onclick="editProduct(${index})">Edit</button>
          <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const sku = document.getElementById('sku').value.trim();
  const quantity = parseInt(document.getElementById('quantity').value);

  if (name && sku && quantity >= 0) {
    products.push({ name, sku, quantity });
    saveProducts();
    renderProducts();
    e.target.reset();
  }
});

function editProduct(index) {
  const product = products[index];
  document.getElementById('name').value = product.name;
  document.getElementById('sku').value = product.sku;
  document.getElementById('quantity').value = product.quantity;

  products.splice(index, 1); // Remove old entry
  saveProducts();
  renderProducts();
}

function deleteProduct(index) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
  }
}

// Initial render
renderProducts();
