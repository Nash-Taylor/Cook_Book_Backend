import { Column, DataType, ForeignKey, BelongsTo, Table } from 'sequelize-typescript';
import { BaseModel } from '../common/base.model';
import { User } from '../users/user.model';
import { AllRecipe } from './all-recipe.model';

@Table({
  tableName: 'favourites'
})
export class Favourite extends BaseModel {
  // Primary key - automatically incrementing ID
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  // Foreign key to User table
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  // Foreign key to AllRecipe table
  @ForeignKey(() => AllRecipe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare recipeId: number;

  // Automatically managed timestamp
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  // Define relationships
  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => AllRecipe)
  declare recipe: AllRecipe;
} 