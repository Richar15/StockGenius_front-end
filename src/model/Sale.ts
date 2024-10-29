import { Client } from "./Client";
import { Product } from "./Product";

export interface Sale {
  id?: number | null;
  date: Date | string;
  priceTotal: number;
  totalAmount: number;
  products: any[];
  client: Client | null;
  clientName: string;
  productName: string;
}
