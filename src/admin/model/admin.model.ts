import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'admins',
  timestamps: true,
  // created_at and updated_at will be created automatically
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
})
export class AdminModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  image_url: string;

  @Column({
    type: DataType.DATE,
  })
  email_verified_at: Date;

  @Column
  password: string;

  @Column
  phone: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    // has to be a 6 digit code
    // defaultValue: (Math.floor(Math.random() * 900000) + 100000).toString(),
  })
  verification_code?: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  verification_code_expires?: Date;
}
