export interface Recipe {
  id: number;
  author: string;
  name: string;
  type: string;
  recipe: string;
}

export const getEmptyRecipe = (): Recipe => ({
  id: -1,
  author: '',
  name: '',
  type: '',
  recipe: '',
});
