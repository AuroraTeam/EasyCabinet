import { createHash } from 'crypto';

import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectS3, S3 } from 'nestjs-s3';
import sharp from 'sharp';
import { FindOptionsWhere, Repository } from 'typeorm';

import { JwtPayload } from '../auth/jwt.strategy';
import { ProfileDto } from './dto/profile.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectS3()
    private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

  public findUser(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.usersRepository.findOneBy(where);
  }

  public findUsers(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.usersRepository.findBy(where);
  }

  public async checkIfUserExists({ login }: Pick<User, 'login'>) {
    return !!(await this.usersRepository.countBy([{ login }]));
  }

  public createUser(user: Partial<User>) {
    return this.usersRepository.insert(user);
  }

  public updateUser(criteria: Partial<User>, user: Partial<User>) {
    return this.usersRepository.update(criteria, user);
  }

  public async getProfile({ uuid }: JwtPayload) {
    return this.getSkinData(await this.findUser({ uuid }));
  }

  public getSkinData({ isAlex, skinHash, capeHash }: User) {
    return {
      isAlex,
      skinUrl: this.formatS3Url(skinHash),
      capeUrl: this.formatS3Url(capeHash),
    };
  }

  public async updateProfile(
    user: JwtPayload,
    profile: ProfileDto,
    skin?: MemoryStorageFile[],
    cape?: MemoryStorageFile[],
  ) {
    const skinHash = await this.uploadImage(skin, 'skin');
    const capeHash = await this.uploadImage(cape, 'cape');

    const userData: Partial<User> = {
      isAlex: profile.isAlex,
    };

    if (skinHash) userData.skinHash = skinHash;
    if (capeHash) userData.capeHash = capeHash;

    await this.updateUser({ login: user.login }, userData);

    return true;
  }

  private formatS3Url(hash: string) {
    if (!hash) return;

    return this.configService
      .get<string>('S3_PUBLIC_URL')
      .replace('[hash]', hash);
  }

  private async uploadImage(
    images: MemoryStorageFile[],
    type: 'skin' | 'cape',
  ) {
    if (!images || images[0].size === 0) return;

    if (type === 'skin') {
      await this.verifySkin(images[0]);
    } else {
      await this.verifyCape(images[0]);
    }

    const imageHash = this.generateHash(images[0].buffer);

    await this.s3.putObject({
      Bucket: this.configService.get('S3_BUCKET'),
      Key: imageHash,
      Body: images[0].buffer,
      ContentType: 'image/png',
    });

    return imageHash;
  }

  private verifySkin(skin: MemoryStorageFile) {
    return this.verifyImage(skin, 'skin', [
      { width: 64, height: 32 },
      { width: 64, height: 64 },
    ]);
  }

  private verifyCape(cape: MemoryStorageFile) {
    return this.verifyImage(cape, 'cape', [{ width: 64, height: 32 }]);
  }

  private async verifyImage(
    image: MemoryStorageFile,
    type: 'skin' | 'cape',
    availableSizes: { width: number; height: number }[],
  ) {
    if (image.mimetype !== 'image/png') {
      throw new BadRequestException(`Invalid ${type} format`);
    }

    const file = sharp(image.buffer);
    const metadata = await file.metadata();

    // Возможно не обязательно, но оставлю на всякий случай
    if (metadata.format !== 'png') {
      throw new BadRequestException(`Invalid ${type} format`);
    }

    if (
      !availableSizes.some(
        (size) =>
          metadata.width === size.width && metadata.height === size.height,
      )
    ) {
      throw new BadRequestException(`Invalid ${type} size`);
    }
  }

  private generateHash(buffer: Buffer) {
    return createHash('sha256').update(buffer).digest('hex');
  }
}
