import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { AllRecipe } from './all-recipe.model';
import { Favourite } from './favourite.model';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([AllRecipe, Favourite]),
  ],
  controllers: [RecipesController, FavouritesController],
  providers: [RecipesService, FavouritesService],
  exports: [RecipesService],
})
export class RecipesModule {} 