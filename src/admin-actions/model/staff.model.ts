import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
@Table({
  tableName: 'staffs',
  timestamps: true,
  // created_at and updated_at will be created automatically
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['email', 'phone'],
    },
  ],
})
export class StaffModel extends Model {
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

  @Column
  phone: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  isActive: boolean;

  // @Column({
  //   allowNull: false,
  //   type: DataType.DATE,
  //   defaultValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set to 7 days from now
  // })
  // inviteExpiresIn: Date;

  @Column
  managerId: number | null;

  @BeforeCreate
  static validateAndHashPassword(instance: StaffModel) {
    if (instance.password) {
      // Validate password complexity here
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(instance.password)) {
        throw new Error(
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        );
      }

      // Hash the password before saving
      instance.password = bcrypt.hashSync(instance.password, 10);
    }
  }

  @BeforeUpdate
  static validateAndUpdatePassword(instance: StaffModel) {
    if (instance.password) {
      // Validate password complexity here
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(instance.password)) {
        throw new Error(
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        );
      }

      // Hash the password before saving
      instance.password = bcrypt.hashSync(instance.password, 10);
    }
  }
}
