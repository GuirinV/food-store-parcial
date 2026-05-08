import type { Product } from "../types/product";
import type { Icategoria } from "../types/categoria";

export const PRODUCTS: Product[] = [
  { id: 1, nombre: "Hamburguesa Clásica", precio: 2500, categoria: "hamburguesas", imagen: "https://placehold.co/150?text=Hamburguesa" },
  { id: 2, nombre: "Hamburguesa con Queso", precio: 2900, categoria: "hamburguesas", imagen: "https://placehold.co/150?text=Cheeseburger" },
  { id: 3, nombre: "Papas Fritas Medianas", precio: 1200, categoria: "acompanamientos", imagen: "https://placehold.co/150?text=Papas" },
  { id: 4, nombre: "Papas Fritas Grandes", precio: 1800, categoria: "acompanamientos", imagen: "https://placehold.co/150?text=Papas+Grandes" },
  { id: 5, nombre: "Hot Dog", precio: 1500, categoria: "hotdogs", imagen: "https://placehold.co/150?text=HotDog" },
  { id: 6, nombre: "Hot Dog con Queso", precio: 1900, categoria: "hotdogs", imagen: "https://placehold.co/150?text=HotDog+Cheese" },
  { id: 7, nombre: "Pizza Personal", precio: 2200, categoria: "pizzas", imagen: "https://placehold.co/150?text=Pizza" },
  { id: 8, nombre: "Pizza Familiar", precio: 5500, categoria: "pizzas", imagen: "https://placehold.co/150?text=Pizza+Familiar" },
  { id: 9, nombre: "Alitas de Pollo (10u)", precio: 2800, categoria: "alitas", imagen: "https://placehold.co/150?text=Alitas" },
  { id: 10, nombre: "Nuggets de Pollo (8u)", precio: 1500, categoria: "alitas", imagen: "https://placehold.co/150?text=Nuggets" },
  { id: 11, nombre: "Refresco Mediano", precio: 800, categoria: "bebidas", imagen: "https://placehold.co/150?text=Refresco" },
  { id: 12, nombre: "Refresco Grande", precio: 1100, categoria: "bebidas", imagen: "https://placehold.co/150?text=Refresco+Grande" },
  { id: 13, nombre: "Milkshake", precio: 1600, categoria: "bebidas", imagen: "https://placehold.co/150?text=Milkshake" },
  { id: 14, nombre: "Salchichas", precio: 1200, categoria: "hotdogs", imagen: "https://placehold.co/150?text=Salchichas" }
];

export const getCategories = (): Icategoria[] => {
  const categories = PRODUCTS.map(p => p.categoria);
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories.map((cat, index) => ({ id: cat, nombre: cat.charAt(0).toUpperCase() + cat.slice(1) }));
};