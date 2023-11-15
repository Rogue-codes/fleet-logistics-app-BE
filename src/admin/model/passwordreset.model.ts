import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'password_resets',
  timestamps: true,
  // created_at and updated_at will be created automatically
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class PasswordReset extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    references: {
      model: 'admins',
      key: 'id',
    },
  })
  admin_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  token: string;

  @Column({
    type: DataType.DATE,
  })
  expires: Date;
}
