import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product, CartItem } from "../../../types/product";

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const contenedorProductos = document.getElementById("contenedor-productos") as HTMLDivElement;
const categoryList = document.getElementById("categoryList") as HTMLUListElement;
const cartCount = document.getElementById("cartCount") as HTMLSpanElement;

let currentCategory = "all";
let searchTerm = "";

const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

const updateCartCount = () => {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalItems.toString();
};

const addToCart = (product: Product) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    cart.push({ ...product, cantidad: 1 });
  }

  saveCart(cart);
};

const renderProducts = (products: Product[]) => {
  contenedorProductos.innerHTML = products.map(product => `
    <div class="producto">
      <img src="${product.imagen}" alt="${product.nombre}">
      <h3>${product.nombre}</h3>
      <p>${product.categoria}</p>
      <strong>$${product.precio.toLocaleString()}</strong>
      <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
    </div>
  `).join("");

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = parseInt((e.target as HTMLElement).getAttribute("data-id") || "0");
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        addToCart(product);
        alert(`${product.nombre} agregado al carrito`);
      }
    });
  });
};

const renderCategories = () => {
  const categories = getCategories();
  const categoryHtml = `
    <li><a href="#" data-category="all" class="${currentCategory === "all" ? "active" : ""}">Todos</a></li>
    ${categories.map(cat => `
      <li><a href="#" data-category="${cat.id}" class="${currentCategory === cat.id ? "active" : ""}">${cat.nombre}</a></li>
    `).join("")}
  `;
  categoryList.innerHTML = categoryHtml;

  categoryList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentCategory = (e.target as HTMLElement).getAttribute("data-category") || "all";
      renderCategories();
      filterProducts();
    });
  });
};

const filterProducts = () => {
  let filtered = PRODUCTS;

  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.categoria === currentCategory);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(p => p.nombre.toLowerCase().includes(term));
  }

  renderProducts(filtered);
};

searchInput.addEventListener("input", (e) => {
  searchTerm = (e.target as HTMLInputElement).value;
  filterProducts();
});

const initPage = () => {
  renderCategories();
  filterProducts();
  updateCartCount();
};

initPage();