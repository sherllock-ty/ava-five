import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';

@Global()
@Module({
    imports: [
        JwtModule.register({
          secret: 'secret_provisoir',
          signOptions:{
            expiresIn:86400,
          }
        }),
      ],
    providers: [RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [JwtModule],
})
export class GuardModule {}
