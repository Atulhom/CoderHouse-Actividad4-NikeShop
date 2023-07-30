document.addEventListener("DOMContentLoaded", async function () {
  const carritoLink = document.getElementById("cart-btn");
  carritoLink.addEventListener("click", showCartModal);
  init();
});

async function loadProducts() {
  try {
    const response = await fetch("./json/offers.json");
    const products = response.json();
    return products;
  } catch (error) {
    console.log(error);
    // todo show error
    return null;
  }
}

async function payProducts(){
  try {
    const productsId = [];
    cart.forEach((product)=>{
      productsId.push(product.id)
    })

    closeModalCart();

    const response = await fetch("http://fake-api.com/pay", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(productsId)
    });
    const result = response.json();
    return result;
  } catch (error) {
    let errorText = `Payment cannot be made`;
    alert(errorText);
    // todo show error
    return null;
  }
}

function renderProducts(products) {
  const offerContainer = document.querySelector(".offer-container");
  products.forEach(function (offer) {
    const offerBox = document.createElement("div");
    offerBox.classList.add("offer-box");

    const offerImage = document.createElement("img");
    offerImage.classList.add("offer-img");
    offerImage.src = offer.img;

    const offerTitle = document.createElement("div");
    offerTitle.classList.add("offer-title");
    offerTitle.textContent = offer.name;

    const offerDescription = document.createElement("div");
    offerDescription.classList.add("offer-description");
    offerDescription.textContent = offer.description;

    const offerPrice = document.createElement("div");
    offerPrice.classList.add("offer-price");
    offerPrice.textContent = "$" + offer.price.toFixed(2);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("button");

    addToCartBtn.addEventListener("click", function () {
      addToCart(offer.id);

      addToCartBtn.textContent = "Added";
      addToCartBtn.style.backgroundColor = "#000000";

      setTimeout(function () {
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.style.backgroundColor = "#13161a";
      }, 500);
    });

    offerBox.appendChild(offerImage);
    offerBox.appendChild(offerTitle);
    offerBox.appendChild(offerDescription);
    offerBox.appendChild(offerPrice);
    offerBox.appendChild(addToCartBtn);

    offerContainer.appendChild(offerBox);
  });
}

let cart = [];
let products = [];

async function init() {
  products = await loadProducts();
  if (!products) return;
  renderProducts(products);
  cart = getSavedCartProducts() || [];
}

function getSavedCartProducts() {
  let productsString = localStorage.getItem("cart-products");
  if (!productsString) return null;
  return JSON.parse(productsString);
}

function handleRemoveButtonClick(event) {
  const button = event.target;
  const index = parseInt(button.getAttribute("data-index"));
  if (!isNaN(index) && index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCartProducts(cart);
    showCartModal();
  }
}

function calculateTotalPrice() {
  let total = 0;
  cart.forEach((product) => {
    total += product.price;
  });
  return total;
}

function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  cart.push(product);
  saveCartProducts(cart);
}

function saveCartProducts(products) {
  let json = JSON.stringify(products);
  localStorage.setItem("cart-products", json);
}

function clearSavedCartProducts() {
  return localStorage.removeItem("cart-products");
}
