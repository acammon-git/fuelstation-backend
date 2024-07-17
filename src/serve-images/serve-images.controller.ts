import { Controller, Get, Param, Res } from '@nestjs/common';
import { ServeImagesService } from './serve-images.service';
import { Response } from 'express';
import path, { dirname } from 'path';

@Controller('serve-images')
export class ServeImagesController {
  constructor(private readonly serveImagesService: ServeImagesService) {}
  //metodo get para proporcionar imagenes
  @Get(':filename')
  serveImage(@Param('filename') filename: string, @Res() res: Response) {
    //construimos la ruta donde tenemos las imagenes
    const assetsPath = path.join(__dirname, '..', '..', 'uploads', filename);
    res.sendFile(assetsPath);
  }
}


 