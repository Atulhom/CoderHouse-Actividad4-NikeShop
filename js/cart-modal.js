function showCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "block";

  const carritoContenido = document.getElementById("cartContent");
  const cartTotalLabel = document.getElementById("cartTotal");
  const paypalButton = document.getElementById("btnstylepay");
  const cleanButton = document.getElementById("btnstyleclean");

  if (cart.length === 0) {
    carritoContenido.innerHTML = "<p>There is none product on cart.</p>";
    paypalButton.style.visibility = "hidden";
    cleanButton.style.visibility = "hidden";
    cartTotalLabel.textContent = "";
  } else {
    const content = cart
      .map(
        (product, index) => `
        ${product.name} - ${product.price}$
        <button class="remove-button" data-index="${index}">X</button>
        `
      )
      .join("<br>");

    carritoContenido.innerHTML = content;
    const removeButtons = document.querySelectorAll(".remove-button");
    for (const button of removeButtons) {
      button.addEventListener("click", handleRemoveButtonClick);
    }

    paypalButton.style.visibility = "visible";
    cleanButton.style.visibility = "visible";

    cartTotalLabel.textContent = `To pay: ${calculateTotalPrice()} dollars.`;
  }
}

function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== productId);
  saveCartProducts(cart);
  showCartModal();
}

function closeModalCart() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = "none";
}

function clearCart() {
  cart = [];
  clearSavedCartProducts();

  const modal = document.getElementById("cart-modal");
  if (modal.style.display === "block") {
    modal.style.display = "none";
  }
}
