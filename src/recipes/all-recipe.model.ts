import { Column, DataType, ForeignKey, BelongsTo, Table } from 'sequelize-typescript';
import { Transform } from 'class-transformer';
import { BaseModel } from '../common/base.model';
import { User } from '../users/user.model';

@Table({
  tableName: 'all_recipes'
})
export class AllRecipe extends BaseModel {
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

  // Recipe name
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  // Recipe image URL
  @Column({
    type: DataType.BLOB,  // Changed to BLOB for binary data
    allowNull: true,
  })
  declare image?: Buffer;

  // Recipe instructions
  @Column({
    type: DataType.TEXT, // Using TEXT for longer content
    allowNull: false,
  })
  declare instructions: string;

  // Automatically managed timestamp
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  // Define relationship with User
  @BelongsTo(() => User)
  declare user: User;

  // Add method to convert image to base64 for API responses
  toJSON() {
    const values = super.toJSON();
    if (values.image) {
      values.image = `data:image/jpeg;base64,${values.image.toString('base64')}`;
    }
    return values;
  }
} 