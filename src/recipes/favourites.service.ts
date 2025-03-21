import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favourite } from './favourite.model';
import { AllRecipe } from './all-recipe.model';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(Favourite)
    private favouriteModel: typeof Favourite,
    @InjectModel(AllRecipe)
    private recipeModel: typeof AllRecipe,
  ) {}

  async create(userId: number, recipeId: number): Promise<Favourite> {
    // Check if recipe exists
    const recipe = await this.recipeModel.findByPk(recipeId);
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    // Check if already favorited
    const existing = await this.favouriteModel.findOne({
      where: { userId, recipeId },
    });
    if (existing) {
      return existing;
    }

    return this.favouriteModel.create({
      userId,
      recipeId,
    });
  }

  async findAll(userId: number): Promise<Favourite[]> {
    return this.favouriteModel.findAll({
      where: { userId },
      include: [{
        model: AllRecipe,
        attributes: ['id', 'name', 'image', 'instructions'],
      }],
    });
  }

  async remove(userId: number, recipeId: number): Promise<void> {
    const favourite = await this.favouriteModel.findOne({
      where: { userId, recipeId },
    });
    if (!favourite) {
      throw new NotFoundException('Favourite not found');
    }
    await favourite.destroy();
  }
} 