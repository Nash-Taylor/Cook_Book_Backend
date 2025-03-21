import { IsString, IsOptional } from 'class-validator';

export class UpdateRecipeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  instructions?: string;
} 