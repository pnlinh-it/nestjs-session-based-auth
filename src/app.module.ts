import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { AuthSerializer } from './serialization.provider';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, AuthSerializer],
})
export class AppModule {}
