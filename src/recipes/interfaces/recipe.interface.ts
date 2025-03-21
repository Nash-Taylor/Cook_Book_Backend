import { UserResponse } from '../../auth/interfaces/auth.interface';

export interface RecipeResponse {
  id: number;
  name: string;
  image?: string;
  instructions: string;
  userId: number;
  user?: UserResponse;
  createdAt: string;
  updatedAt: string;
}

export interface FavouriteResponse {
  id: number;
  userId: number;
  recipeId: number;
  recipe?: RecipeResponse;
  user?: UserResponse;
  createdAt: string;
  updatedAt: string;
} 