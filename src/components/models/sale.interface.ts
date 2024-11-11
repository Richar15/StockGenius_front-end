
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string | null;
}


export interface Client {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  direction: string;
  gmail: string;
}


export interface Sale {
  id: number;
  date: string;
  totalAmount: number;
  products: Product[];
  client: Client;
  clientName: string;
  productName: string;
  priceTotal: number;
  total: string | number;
}


export interface SaleResponse {
  'Las ventas Generadas  hoy Han Sido de: '?: number;
  'Las ventas Generadas en esta Semana han Sido de: '?: number;
  'Las ventas Generadas de este mes han Sido de: '?: number;
  sales: Sale[];
  message?: string;
  totalAmount: number;
  

}