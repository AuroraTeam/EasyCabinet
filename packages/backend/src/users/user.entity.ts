import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { unique: true, generated: 'uuid' })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  login: string;

  @Column({ length: 60 })
  password: string;

  @Column({ nullable: true, length: 32 })
  resetToken: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  serverId: string;

  @Column({ nullable: true })
  skinHash: string;

  @Column({ nullable: true })
  capeHash: string;

  @Column({ nullable: true })
  isAlex: boolean;
}
