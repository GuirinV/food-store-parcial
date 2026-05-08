import type { CartItem } from "../../../types/product";

const cartItems = document.getElementById("cartItems") as HTMLDivElement;
const cartTotal = document.getElementById("cartTotal") as HTMLSpanElement;
const cartEmpty = document.getElementById("cartEmpty") as HTMLDivElement;

const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

const updateQuantity = (id: number, change: number) => {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (item) {
    item.cantidad += change;
    if (item.cantidad <= 0) {
      const newCart = cart.filter(i => i.id !== id);
      saveCart(newCart);
    } else {
      saveCart(cart);
    }
  }
};

const removeItem = (id: number) => {
  const cart = getCart();
  const newCart = cart.filter(i => i.id !== id);
  saveCart(newCart);
};

const calculateTotal = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
};

const renderCart = () => {
  const cart = getCart();

  if (cart.length === 0) {
    cartItems.innerHTML = "";
    cartTotal.textContent = "0";
    cartEmpty.style.display = "block";
    return;
  }

  cartEmpty.style.display = "none";
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="cart-item-info">
        <h3>${item.nombre}</h3>
        <strong>$${item.precio.toLocaleString()}</strong>
      </div>
      <div class="cart-item-quantity">
        <button class="qty-btn" data-id="${item.id}" data-change="-1">-</button>
        <span>${item.cantidad}</span>
        <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
      </div>
      <p class="item-subtotal">$${(item.precio * item.cantidad).toLocaleString()}</p>
      <button class="remove-btn" data-id="${item.id}">Eliminar</button>
    </div>
  `).join("");

  cartTotal.textContent = calculateTotal().toLocaleString();

  document.querySelectorAll(".qty-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute("data-id") || "0");
      const change = parseInt((e.target as HTMLElement).getAttribute("data-change") || "0");
      updateQuantity(id, change);
    });
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute("data-id") || "0");
      removeItem(id);
    });
  });
};

const initPage = () => {
  renderCart();
};

initPage();