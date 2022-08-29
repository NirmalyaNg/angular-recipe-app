export interface Ingredient {
  id?: string;
  name: string;
  quantity: string;
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
}
