import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put, Headers, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterUserDto, UpdateAuthDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './interfaces/jwt-payload';
import { FileInterceptor } from '@nestjs/platform-express';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  public getHello(@Headers('x-token') token: string): Promise<string> {
    const decode = jwt.decode(token) as JwtPayload;
    const { id } = decode;
    return this.authService.findOne(id);
  }
 

  @Post('/login')
  login( @Body() loginDto: LoginDto  ) {
    return this.authService.login( loginDto );
  }

  @Post('/register')
  register( @Body() registerDto: RegisterUserDto  ) {
    return this.authService.register( registerDto );
  }
  @Post('/file/:id')
  @UseInterceptors(FileInterceptor('foto')) // 'foto' debe coincidir con el campo de formulario donde se envía la foto
  async uploadPhoto(@Param('id') id: number, @UploadedFile() file) {
    return this.authService.file(id, file);
  }

  // LoginResponse
 
  @Get('check-token')
  @UseGuards(AuthGuard)
  checkToken( @Request() req): any {
    try {
      const authorizationHeader = req.headers['authorization']; 

      if (authorizationHeader) {
        return authorizationHeader;
        // const token = authorizationHeader.split(' ')[1];

        //  return {
        //   user,
        //   token: this.authService.getJwtToken({ id: user.id_usuario })
        // }
      } else {
        return 'No se encontró el encabezado de autorización';
      }
    } catch (error) {
      console.log(error);
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  
  @Put()
  update(@Headers('Authorization') token: string, @Body() updateAuthDto: UpdateAuthDto) {
    if (!token) {
      return { error: 'Token is missing' };
    }
    console.log('datosUsuario: ',updateAuthDto);
    const decode = jwt.decode(token) as JwtPayload;
    
    if (!decode || !decode.id) {
      return { error: 'Invalid token or missing ID' };
    }
  
    const { id } = decode;
    console.log(id)
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
