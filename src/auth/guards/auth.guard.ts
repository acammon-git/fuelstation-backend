import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService:AuthService,
  ) {}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      
      if (!token) {
        console.log('Token ausente'); // Agrega un registro para identificar cuando no hay token
        throw new UnauthorizedException('There is no bearer token');
      }
  
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token, { secret: process.env.JWT_SEED }
      );
  
      console.log('Token verificado'); // Agrega un registro para verificar que el token se verificó correctamente
  
      const user = await this.authService.findOne(payload.id);
      console.log('Usuario encontrado'); // Agrega un registro cuando el usuario se encuentra
  
      if (!user) {
        console.log('Usuario no encontrado'); // Agrega un registro cuando el usuario no se encuentra
        throw new UnauthorizedException('User does not exist');
      }
  
      return request['user'] = user;
    } catch (error) {
      console.error(error); // Registra el error para la depuración
      throw new UnauthorizedException('No está autorizado para esta acción');
    }
  
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
