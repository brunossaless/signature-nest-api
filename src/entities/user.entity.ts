import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true })
  src: string;
}
