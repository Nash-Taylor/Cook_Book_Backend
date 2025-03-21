import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AllRecipe } from './all-recipe.model';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from '../users/user.model';
import { RecipeResponse } from './interfaces/recipe.interface';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(AllRecipe)
    private recipeModel: typeof AllRecipe,
  ) {}

  async create(createRecipeDto: CreateRecipeDto, userId: number, imageBuffer?: Buffer): Promise<RecipeResponse> {
    const recipe = await this.recipeModel.create({
      ...createRecipeDto,
      userId,
      image: imageBuffer,
    });
    return recipe.toJSON() as RecipeResponse;
  }

  async findAll(userId?: number): Promise<RecipeResponse[]> {
    const where = userId ? { userId } : {};
    const recipes = await this.recipeModel.findAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'username'],
      }],
      order: [['createdAt', 'DESC']],
    });
    return recipes.map(recipe => recipe.toJSON() as RecipeResponse);
  }

  async findOne(id: number): Promise<RecipeResponse> {
    const recipe = await this.recipeModel.findOne({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'username'],
      }],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe.toJSON() as RecipeResponse;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto, userId: number, imageBuffer?: Buffer): Promise<RecipeResponse> {
    const recipe = await this.recipeModel.findOne({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.userId !== userId) {
      throw new UnauthorizedException('Not authorized to update this recipe');
    }

    const updateData = {
      ...updateRecipeDto,
    };

    if (imageBuffer !== undefined) {
      recipe.image = imageBuffer;
    }

    if (updateRecipeDto.name !== undefined) {
      recipe.name = updateRecipeDto.name;
    }

    if (updateRecipeDto.instructions !== undefined) {
      recipe.instructions = updateRecipeDto.instructions;
    }

    await recipe.save();
    return recipe.toJSON() as RecipeResponse;
  }

  async remove(id: number, userId: number): Promise<void> {
    const recipe = await this.recipeModel.findOne({
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.userId !== userId) {
      throw new UnauthorizedException('Not authorized to delete this recipe');
    }

    await recipe.destroy();
  }
} 