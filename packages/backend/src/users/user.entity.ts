import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid', { unique: true, generated: 'uuid' })
  uuid: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

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
