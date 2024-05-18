import { Inject, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { AuthSerializer } from './serialization.provider';
import { LocalStrategy } from './local.strategy';
import { RedisModule } from './redis.module';
// import { REDIS } from './redis.constants';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, AuthSerializer],
})
export class AppModule {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: any) {}
  configure(consumer: MiddlewareConsumer) {
    // Initialize store.

    consumer
      .apply(
        // This will return an expressjs middleware
        // It will obtain session id from request, decrypt and encrypt it
        session({
          store: new RedisStore({
            client: this.redis,
            prefix: 'nestjs-session-auth-',
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),

        // A middleware that register passport session manager
        passport.initialize(),

        // A middleware that get user from session id
        // If user is existed assign that user to request
        // Later we can check user is login or not by check request.user
        // See LoggedInGuard
        passport.session(),
      )
      .forRoutes('*');
  }
}
