import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AssetsService } from 'src/assets/assets.service';

import { JwtPayload } from '../auth/jwt.strategy';
import { ProfileDto } from './dto/profile.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly assetsService: AssetsService,
  ) {}

  public async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }

  public async findUsers(where: Prisma.UserWhereInput) {
    return this.prisma.user.findMany({
      where,
    });
  }

  public async checkIfUserExists({ email }: Pick<User, 'email'>) {
    const count = await this.prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  public async createUser(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: user,
    });
  }

  public async updateUser(
    criteria: Prisma.UserWhereUniqueInput,
    user: Prisma.UserUpdateInput,
  ) {
    return this.prisma.user.update({
      where: criteria,
      data: user,
    });
  }

  public async getProfile({ uuid }: JwtPayload) {
    return this.getSkinData(await this.findUser({ uuid }));
  }

  public getSkinData({ isAlex, skinHash, capeHash }: User) {
    return {
      isAlex,
      skinUrl: this.assetsService.formatUrl('skin', skinHash),
      capeUrl: this.assetsService.formatUrl('cape', capeHash),
    };
  }

  public async updateProfile(
    user: JwtPayload,
    profile: ProfileDto,
    skin?: MemoryStorageFile[],
    cape?: MemoryStorageFile[],
  ) {
    const skinHash = await this.assetsService.uploadImage('skin', skin);
    const capeHash = await this.assetsService.uploadImage('cape', cape);

    const userData: Partial<User> = {
      isAlex: profile.isAlex,
    };

    if (skinHash) userData.skinHash = skinHash;
    if (capeHash) userData.capeHash = capeHash;

    await this.updateUser({ login: user.login }, userData);

    return true;
  }
}
