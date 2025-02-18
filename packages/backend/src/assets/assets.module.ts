import { Module } from '@nestjs/common';
import { FilesModule } from 'src/files/files.module';

import { AssetsService } from './assets.service';

@Module({
  imports: [FilesModule],
  providers: [AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}
