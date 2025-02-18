import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const validStorageFormats = <const>['local', 's3'];

type StorageFormat = (typeof validStorageFormats)[number];

@Injectable()
export class FilesService {
  private readonly storageFormat: StorageFormat;
  private readonly s3Client: S3Client;

  private readonly uploadsDir = join(__dirname, '../../uploads');

  private isValidStorageFormat(value: string): value is StorageFormat {
    return validStorageFormats.includes(<never>value);
  }

  constructor(private readonly configService: ConfigService) {
    const storageFormat = this.configService.get<string>(
      'STORAGE_FORMAT',
      'local',
    );

    if (!this.isValidStorageFormat(storageFormat)) {
      throw new Error(
        `STORAGE_FORMAT must be one of 'local' or 's3', got ${storageFormat}`,
      );
    }
    this.storageFormat = storageFormat;

    if (this.storageFormat === 's3') {
      this.s3Client = new S3Client({
        region: this.configService.get('S3_REGION'),
        endpoint: this.configService.get('S3_ENDPOINT'),
        credentials: {
          accessKeyId: this.configService.get('S3_ACCESS_KEY_ID'),
          secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
        },
      });
    }
  }

  formatUrl(scope: string, hash: string) {
    switch (this.storageFormat) {
      case 'local':
        return new URL(
          `/uploads/${this.formatPath(scope, hash)}`,
          this.configService.get<string>('BACKEND_URL'),
        );
      case 's3':
        return new URL(
          [
            this.configService.get<string>('S3_BUCKET'),
            this.formatPath(scope, hash),
          ].join('/'),
          this.configService.get<string>('S3_PUBLIC_URL'),
        );
    }
  }

  private formatPath(scope: string, hash: string) {
    return `${scope}/${hash.slice(0, 2)}/${hash}`;
  }

  async saveFile(file: Buffer, scope: string) {
    const hash = this.generateHash(file);
    const path = this.formatPath(scope, hash);

    switch (this.storageFormat) {
      case 'local':
        await this.saveImageToDisk(file, path);
        break;
      case 's3':
        await this.saveImageToS3(file, path);
        break;
    }

    return hash;
  }

  private async saveImageToDisk(file: Buffer, path: string) {
    const filePath = join(this.uploadsDir, path);
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, file);
  }

  private async saveImageToS3(file: Buffer, path: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: path,
        Body: file,
      }),
    );
  }

  private generateHash(buffer: Buffer) {
    return createHash('sha256').update(buffer).digest('hex');
  }
}
