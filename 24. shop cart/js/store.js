let products = [
  { id: 1, name: "Product1", img: "Images/Album 1.png", price: 10 },
  { id: 2, name: "Product2", img: "Images/Album 2.png", price: 25 },
  { id: 3, name: "Product3", img: "Images/Album 3.png", price: 15 },
  { id: 4, name: "Product4", img: "Images/Album 4.png", price: 30 },
];

let shopItem = document.querySelector(".shop-items");
let cartItem = document.querySelector(".cart-items");
let cartTotal = document.querySelector(".cart-total-price");
let cart = [];

// --- Create product cards ---
function addToShop() {
  products.forEach((item) => {
    shopItem.insertAdjacentHTML(
      "beforeend",
      `
      <div class="shop-item">
        <span class="shop-item-title">${item.name}</span>
        <img class="shop-item-image" src="${item.img}" />
        <div class="shop-item-details">
          <span class="shop-item-price">$${item.price}</span>
          <button class="btn btn-primary shop-item-button" type="button" onclick="addToCart(${item.id})">
            ADD TO CART
          </button>
        </div>
      </div>
      `
    );
  });
}
window.addEventListener("DOMContentLoaded", addToShop);

// --- Add to cart ---
function addToCart(id) {
  let goalProduct = products.find((item) => item.id === id);

  // Check if product already exists in cart
  let existing = cart.find((p) => p.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...goalProduct, quantity: 1 });
  }

  showCart();
  totalPrice();
}

// --- Show cart items ---
function showCart() {
  cartItem.innerHTML = "";
  cart.forEach((item) => {
    cartItem.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cart-row">
        <div class="cart-item cart-column">
          <img class="cart-item-image" src="${item.img}" width="100" height="100">
          <span class="cart-item-title">${item.name}</span>
        </div>
        <span class="cart-price cart-column">$${item.price}</span>
        <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
          <button class="btn btn-danger" type="button" onclick="removeCart(${item.id})">REMOVE</button>
        </div>
      </div>
      `
    );
  });
}

// --- Update quantity when input changes ---
function updateQuantity(id, newValue) {
  let item = cart.find((p) => p.id === id);
  if (item) {
    item.quantity = parseInt(newValue) || 1; // prevent NaN
    totalPrice();
  }
}

// --- Remove item from cart ---
function removeCart(id) {
  cart = cart.filter((item) => item.id !== id);
  showCart();
  totalPrice();
}

// --- Calculate total ---
function totalPrice() {
  let result = 0;
  cart.forEach((item) => {
    result += item.price * item.quantity;
  });
  cartTotal.innerHTML = "$" + result.toFixed(2);
}
