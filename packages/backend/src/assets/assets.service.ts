import { MemoryStorageFile } from '@blazity/nest-file-fastify';
import { BadRequestException, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { FilesService } from 'src/files/files.service';

export type AssetType = 'skin' | 'cape';

@Injectable()
export class AssetsService {
  private readonly skinSizes = [
    { width: 64, height: 32 },
    { width: 64, height: 64 },
  ];

  private readonly capeSizes = [{ width: 64, height: 32 }];

  constructor(private readonly filesService: FilesService) {}

  formatUrl(type: AssetType, hash: string) {
    if (!hash) return;
    return this.filesService.formatUrl(type, hash);
  }

  async uploadImage(type: AssetType, images: MemoryStorageFile[]) {
    if (!images || images[0].size === 0) return;

    await this.verifyAsset(images[0], type);
    return await this.filesService.saveFile(images[0].buffer, type);
  }

  async verifyAsset(image: MemoryStorageFile, type: AssetType) {
    if (image.mimetype !== 'image/png') {
      throw new BadRequestException(`Invalid ${type} format`);
    }

    const file = sharp(image.buffer);
    const metadata = await file.metadata().catch(() => {
      throw new BadRequestException(`Invalid ${type} format`);
    });

    // Возможно не обязательно, но оставлю на всякий случай
    if (metadata.format !== 'png') {
      throw new BadRequestException(`Invalid ${type} format`);
    }

    const availableSizes = type === 'skin' ? this.skinSizes : this.capeSizes;

    if (
      !availableSizes.some(
        (size) =>
          metadata.width === size.width && metadata.height === size.height,
      )
    ) {
      throw new BadRequestException(`Invalid ${type} size`);
    }
  }
}
