export interface ProductEntity {
  id?: number; // Asegúrate de que `id` sea opcional
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string | null; // Asegúrate de que la propiedad sea un string
}
