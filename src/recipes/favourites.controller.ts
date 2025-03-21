import { Controller, Post, Get, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favourites')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post(':recipeId')
  create(@Request() req, @Param('recipeId') recipeId: string) {
    return this.favouritesService.create(req.user.id, +recipeId);
  }

  @Get()
  findAll(@Request() req) {
    return this.favouritesService.findAll(req.user.id);
  }

  @Delete(':recipeId')
  remove(@Request() req, @Param('recipeId') recipeId: string) {
    return this.favouritesService.remove(req.user.id, +recipeId);
  }
} 