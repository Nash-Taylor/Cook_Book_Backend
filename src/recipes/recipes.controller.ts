import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createRecipeDto: CreateRecipeDto, 
    @Request() req,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.recipesService.create(createRecipeDto, req.user.id, image?.buffer);
  }

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.recipesService.findAll(userId ? +userId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string, 
    @Body() updateRecipeDto: UpdateRecipeDto, 
    @Request() req,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.recipesService.update(+id, updateRecipeDto, req.user.id, image?.buffer);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.recipesService.remove(+id, req.user.id);
  }
} 