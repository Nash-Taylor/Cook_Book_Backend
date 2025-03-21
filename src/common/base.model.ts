import { Column, Model, DataType } from 'sequelize-typescript';
import { Transform } from 'class-transformer';

export class BaseModel extends Model {
  @Transform(({ value }) => value ? new Date(value).toISOString() : null)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    get() {
      const value = this.getDataValue('createdAt');
      return value ? value.toISOString() : null;
    },
  })
  declare createdAt: Date;

  @Transform(({ value }) => value ? new Date(value).toISOString() : null)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    get() {
      const value = this.getDataValue('updatedAt');
      return value ? value.toISOString() : null;
    },
  })
  declare updatedAt: Date;
} 