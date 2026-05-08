export interface Product {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
}

export interface CartItem extends Product {
  cantidad: number;
}