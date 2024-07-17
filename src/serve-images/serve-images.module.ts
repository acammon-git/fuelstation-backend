import { Module } from '@nestjs/common';
import { ServeImagesService } from './serve-images.service';
import { ServeImagesController } from './serve-images.controller';

@Module({
  controllers: [ServeImagesController],
  providers: [ServeImagesService]
})
export class ServeImagesModule {}
