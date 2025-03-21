import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Exclude, Transform } from 'class-transformer';
import { BaseModel } from '../common/base.model';
import { AllRecipe } from '../recipes/all-recipe.model';
import { Favourite } from '../recipes/favourite.model';

@Table({
  tableName: 'users'
})
export class User extends BaseModel {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Exclude()  // Never send password in response
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare updatedAt: Date;

  // Define relationships
  @HasMany(() => AllRecipe)
  declare recipes: AllRecipe[];

  @HasMany(() => Favourite)
  declare favourites: Favourite[];

  // Override toJSON to exclude password
  toJSON() {
    const values = super.toJSON();
    delete values.password;
    return values;
  }
} 
