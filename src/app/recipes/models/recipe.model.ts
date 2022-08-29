export interface Ingredient {
  id?: string;
  name: string;
  amount: string;
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
}
